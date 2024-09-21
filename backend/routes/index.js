import express from 'express';
import UserRoute from './user.js';
import accountRoute from './account.js';
import transactionRoute from './transaction.js';

const router = express.Router();

// Tesing Routes ==>
router.get("/", (req, res)=>{
    res.json("On /api/v1")
})

router.use('/user', UserRoute)
router.use('/account', accountRoute)
router.use('/transaction',transactionRoute)

export default router