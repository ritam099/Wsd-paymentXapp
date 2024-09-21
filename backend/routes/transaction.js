import express from "express";
import authMiddlewar from "../middleware.js";
import { User, Account, Transaction } from "../db.js";
import mongoose from "mongoose";

const transactionRoute = express.Router();

transactionRoute.post("/send", authMiddlewar, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const reciversUserId = req.body.to;
  const amount = req.body.amount;

  const user = await User.findOne({
    username: req.username,
  }).session(session);

  const userId = user._id;

  const senderAccount = await Account.findOne({
    userId: userId,
  }).session(session);
  const senderBalance = senderAccount.balance;

  if (senderBalance < amount) {
    await session.abortTransaction();
    res.status(400).json({
      msg: "Insufficient balance",
    });
    return;
  }

  const toAccount = await Account.findOne({
    userId: reciversUserId,
  }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      msg: "Invalid account",
    });
  }

  // Get sender and receiver names
  const sender = await User.findById(userId).session(session);
  const receiver = await User.findById(reciversUserId).session(session);

  const cur = Date()
  const transaction = await Transaction.create({
    senderId: userId,
    receiverId: reciversUserId,
    sender: `${sender.firstname} ${sender.lastname}`,
    receiver: `${receiver.firstname} ${receiver.lastname}`,
    amount: amount,
    date: cur,
  });

  await Account.findOneAndUpdate(
    {
      userId: userId,
    },
    { $inc: { balance: -amount } }
  ).session(session);

  await Account.findOneAndUpdate(
    {
      userId: reciversUserId,
    },
    { $inc: { balance: +amount } }
  ).session(session);

  await session.commitTransaction();
  res.json({
    msg: "Transfer successful",
    transaction: transaction
  });
});

transactionRoute.get("/view", authMiddlewar, async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.username,
    });
  
    const userId = user._id;


    const transactions = await Transaction.find({
      $or: [{ senderId: userId }, { receiverId: userId }]
    }).sort({ date: -1 });

    res.json({
      transactions: transactions
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error fetching transactions",
      error: error.message
    });
  }
});


export default transactionRoute;
