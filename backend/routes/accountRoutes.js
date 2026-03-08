const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { protect } = require('../middleware/authMiddleware');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const Notification = require('../models/Notification');

// GET /api/account/balance
router.get('/balance', protect, async (req, res) => {
  try {
    const account = await Account.findOne({ userId: req.user._id });
    if (!account) return res.status(404).json({ message: 'Account not found' });
    res.json({ balance: account.balance, accountNumber: account.accountNumber });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/account/deposit
router.post('/deposit', protect, async (req, res) => {
  const { amount } = req.body;
  if (amount <= 0) return res.status(400).json({ message: 'Invalid amount' });

  try {
    const account = await Account.findOne({ userId: req.user._id });
    if (!account) return res.status(404).json({ message: 'Account context not loaded. Please login again.' });
    
    account.balance += Number(amount);
    await account.save();

    const transaction = await Transaction.create({
      userId: req.user._id,
      type: 'deposit',
      amount,
      status: 'success',
      reference: `DEP-${Date.now()}`
    });

    await Notification.create({
      userId: req.user._id,
      message: `Successfully deposited $${amount}`,
      type: 'deposit'
    });

    res.json({ balance: account.balance, transaction, accountNumber: account.accountNumber });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/account/withdraw
router.post('/withdraw', protect, async (req, res) => {
  const { amount } = req.body;
  if (amount <= 0) return res.status(400).json({ message: 'Invalid amount' });

  try {
    const account = await Account.findOne({ userId: req.user._id });
    if (!account) return res.status(404).json({ message: 'Account context not loaded. Please login again.' });

    if (account.balance < amount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    account.balance -= Number(amount);
    await account.save();

    const transaction = await Transaction.create({
      userId: req.user._id,
      type: 'withdraw',
      amount,
      status: 'success',
      reference: `WDL-${Date.now()}`
    });

    await Notification.create({
      userId: req.user._id,
      message: `Successfully withdrew $${amount}`,
      type: 'withdraw'
    });

    res.json({ balance: account.balance, transaction, accountNumber: account.accountNumber });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/account/transfer
router.post('/transfer', protect, async (req, res) => {
  const { amount, accountNumber, pin, otp } = req.body;
  const ipAddress = req.ip || req.connection.remoteAddress;
  const SecurityLog = require('../models/SecurityLog');

  if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });
  if (!accountNumber) return res.status(400).json({ message: 'Recipient Account Number is required' });
  if (!pin) return res.status(400).json({ message: 'Security PIN is required' });

  try {
    // Verify Security PIN
    const fullUser = await User.findById(req.user._id);
    const isPinMatch = await bcrypt.compare(pin, fullUser.pin);
    if (!isPinMatch) {
      await SecurityLog.create({ userId: fullUser._id, eventType: 'Transfer attempt', ipAddress, status: 'failed: invalid pin' });
      return res.status(400).json({ message: 'Invalid Security PIN' });
    }

    if (amount > 500) {
      if (!otp) {
        // Send OTP
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        fullUser.otp = generatedOtp;
        fullUser.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 min
        await fullUser.save();
        console.log(`Sending Transfer OTP to ${fullUser.email} : ${generatedOtp}`);
        return res.status(202).json({ requiresOTP: true, message: 'OTP required for transfers over $500. OTP sent to email.' });
      } else {
        // Verify OTP
        if (fullUser.otp !== otp || fullUser.otpExpires < Date.now()) {
          await SecurityLog.create({ userId: fullUser._id, eventType: 'Transfer attempt', ipAddress, status: 'failed: invalid otp' });
          return res.status(400).json({ message: 'Invalid or expired OTP' });
        }
        fullUser.otp = undefined;
        fullUser.otpExpires = undefined;
        await fullUser.save();
      }
    }

    const senderAccount = await Account.findOne({ userId: req.user._id });
    if (!senderAccount || senderAccount.balance < amount) {
      await SecurityLog.create({ userId: fullUser._id, eventType: 'Transfer attempt', ipAddress, status: 'failed: insufficient funds' });
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    const receiverAccount = await Account.findOne({ accountNumber });
    if (!receiverAccount) {
      return res.status(404).json({ message: 'Recipient Account Number not found' });
    }

    if (receiverAccount._id.toString() === senderAccount._id.toString()) {
      return res.status(400).json({ message: 'Cannot transfer to yourself' });
    }

    const receiver = await User.findById(receiverAccount.userId);

    senderAccount.balance -= Number(amount);
    receiverAccount.balance += Number(amount);

    await senderAccount.save();
    await receiverAccount.save();

    const transaction = await Transaction.create({
      userId: req.user._id,
      senderAccount: senderAccount.accountNumber,
      receiverAccount: receiverAccount.accountNumber,
      type: 'transfer',
      amount,
      receiverId: receiver._id,
      status: 'success',
      reference: `TRF-${Date.now()}`
    });

    // Informative transaction log for receiver
    await Transaction.create({
      userId: receiver._id,
      senderAccount: senderAccount.accountNumber,
      receiverAccount: receiverAccount.accountNumber,
      type: 'deposit',
      amount,
      receiverId: req.user._id, // the sender
      status: 'success',
      reference: `RCV-${Date.now()}`
    });

    await Notification.create({
      userId: req.user._id,
      message: `Successfully transferred $${amount} to Account ${accountNumber}`,
      type: 'transfer'
    });

    let isSuspicious = amount > 10000;
    if (isSuspicious) {
      await Notification.create({
        userId: req.user._id,
        message: `Suspicious transaction of $${amount} detected.`,
        type: 'alert'
      });
    }

    await Notification.create({
      userId: receiver._id,
      message: `You received $${amount} from Account ${senderAccount.accountNumber}`,
      type: 'deposit'
    });

    await SecurityLog.create({ userId: fullUser._id, eventType: 'Transfer attempt', ipAddress, status: 'success' });

    res.json({ balance: senderAccount.balance, transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/transactions
router.get('/transactions', protect, async (req, res) => {
  const { range } = req.query;
  let dateFilter = {};
  
  if (range) {
    const now = new Date();
    let startDate = new Date();
    
    if (range === '1week') {
      startDate.setDate(now.getDate() - 7);
    } else if (range === '1month') {
      startDate.setMonth(now.getMonth() - 1);
    } else if (range === '6months') {
      startDate.setMonth(now.getMonth() - 6);
    } else if (range === '1year') {
      startDate.setFullYear(now.getFullYear() - 1);
    }
    
    dateFilter = { createdAt: { $gte: startDate } };
  }

  try {
    const transactions = await Transaction.find({ userId: req.user._id, ...dateFilter })
      .populate('receiverId', 'name email')
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
