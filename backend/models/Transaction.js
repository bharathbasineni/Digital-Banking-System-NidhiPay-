const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  senderAccount: { type: String },
  type: { type: String, enum: ['deposit', 'withdraw', 'transfer'], required: true },
  amount: { type: Number, required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiverAccount: { type: String },
  status: { type: String, enum: ['success', 'failed', 'pending'], default: 'success' },
  reference: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
