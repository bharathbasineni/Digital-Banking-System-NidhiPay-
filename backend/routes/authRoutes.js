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
// POST /api/auth/forgot-password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '15m' });

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    const resetUrl = `https://digital-banking-system-nidhi-pay.vercel.app/reset-password/${resetToken}`;

    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset - NidhiPay",
      text: `Click the link to reset your password: ${resetUrl}`,
      html: `
        <h1>Password Reset Request</h1>
        <p>You have requested to reset your password.</p>
        <p>Please click the link below to reset it:</p>
        <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
        <p>This link is valid for 15 minutes.</p>
      `
    });

    return res.status(200).json({
      success: true,
      message: "Password reset link sent successfully to your email."
    });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Server error while sending email" });
  }
});

// POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');

    const user = await User.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
