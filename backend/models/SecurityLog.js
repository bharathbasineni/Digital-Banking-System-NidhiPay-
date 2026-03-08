const mongoose = require('mongoose');

const securityLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventType: { type: String, required: true }, // Login success, Login failure, Transfer attempt, Password change
  ipAddress: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, required: true }
});

module.exports = mongoose.model('SecurityLog', securityLogSchema);
