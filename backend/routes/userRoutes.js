const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

// PUT /api/users/update-profile
router.put('/update-profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/users/reset-password
router.post('/reset-password', protect, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (user && (await bcrypt.compare(currentPassword, user.password))) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();

      const SecurityLog = require('../models/SecurityLog');
      await SecurityLog.create({ userId: user._id, eventType: 'Password change', ipAddress: req.ip || req.connection.remoteAddress, status: 'success' });

      res.json({ message: 'Password updated successfully' });
    } else {
      res.status(401).json({ message: 'Invalid current password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// POST /api/users/update-pin
router.post('/update-pin', protect, async (req, res) => {
  const { currentPin, newPin } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (user && (await bcrypt.compare(currentPin, user.pin))) {
      const salt = await bcrypt.genSalt(10);
      user.pin = await bcrypt.hash(newPin, salt);
      await user.save();

      const SecurityLog = require('../models/SecurityLog');
      await SecurityLog.create({ userId: user._id, eventType: 'Update PIN', ipAddress: req.ip || req.connection.remoteAddress, status: 'success' });

      res.json({ message: 'Security PIN updated successfully' });
    } else {
      res.status(401).json({ message: 'Invalid current PIN' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/security-logs', protect, async (req, res) => {
  try {
    const SecurityLog = require('../models/SecurityLog');
    const logs = await SecurityLog.find({ userId: req.user._id }).sort({ timestamp: -1 }).limit(20);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/login-activity', protect, async (req, res) => {
  try {
    const LoginActivity = require('../models/LoginActivity');
    const activity = await LoginActivity.find({ userId: req.user._id }).sort({ loginTime: -1 }).limit(10);
    res.json(activity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
