import express from "express";
import authMiddlewar from "../middleware.js";
import { User, Account } from "../db.js";

const accountRoute = express.Router();

accountRoute.get("/balance", authMiddlewar, async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.username,
    });
    const userId = user._id;

    const account = await Account.findOne({
      userId: userId,
    });
    const balance = account.balance;

    res.json({
      balance: balance,
      firstname: user.firstname,
    });
  } catch (err) {
    res.status(411).json({
      msg: "Some error occured while getting balance",
      err: err,
    });
  }
});



export default accountRoute;
