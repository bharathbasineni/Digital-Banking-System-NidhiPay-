const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const Account = require('../models/Account');
const LoginActivity = require('../models/LoginActivity');
const SecurityLog = require('../models/SecurityLog');
const sendEmail = require('../utils/sendEmail');

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per windowMs
  message: { message: 'Too many login requests from this IP, please try again after a minute' }
});

const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3, // Limit each IP to 3 OTP requests per window
  message: { message: 'Too many OTP requests from this IP, please try again after 5 minutes' }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '1h' });
};

function generateAccountNumber() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

async function createUniqueAccountNumber() {
  let accountNumber;
  let exists = true;

  while (exists) {
    accountNumber = generateAccountNumber();
    const account = await Account.findOne({ accountNumber });
    if (!account) {
      exists = false;
    }
  }

  return accountNumber;
}



// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password, pin } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedPin = await bcrypt.hash(pin, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      pin: hashedPin
    });

    if (user) {
      // Check if account already exists
      const existingAccount = await Account.findOne({ userId: user._id });
      if (existingAccount) {
        return res.status(200).json({ message: 'User registered successfully', account: existingAccount });
      }

      // Generate unique account number
      const accountNumber = await createUniqueAccountNumber();

      await Account.create({
        userId: user._id,
        accountNumber: accountNumber,
        balance: 0 // Initial balance for new users
      });

      res.status(201).json({ message: 'User registered successfully' });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/auth/login
router.post('/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body;
  const ipAddress = req.ip || req.connection.remoteAddress;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: 'Your account has been blocked by the admin' });
    }

    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res.status(403).json({ message: 'Account locked due to too many failed attempts. Try again later.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      user.loginAttempts = 0;
      user.lockUntil = undefined;
      await user.save();

      await LoginActivity.create({ userId: user._id, ipAddress, status: 'success' });
      await SecurityLog.create({ userId: user._id, eventType: 'Login success', ipAddress, status: 'success' });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      user.loginAttempts += 1;
      if (user.loginAttempts >= 5) {
        user.lockUntil = new Date(Date.now() + 10 * 60 * 1000); // Lock for 10 minutes
      }
      await user.save();

      await LoginActivity.create({ userId: user._id, ipAddress, status: 'failed' });
      await SecurityLog.create({ userId: user._id, eventType: 'Login failure', ipAddress, status: 'failed' });

      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
