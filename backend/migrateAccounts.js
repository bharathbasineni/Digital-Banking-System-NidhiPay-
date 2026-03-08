// migrateAccounts.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Account = require('./models/Account');

dotenv.config();

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

const migrateAccounts = async () => {
  try {
    await connectDB();
    console.log('Starting account migration...');

    const accounts = await Account.find({});
    console.log(`Found ${accounts.length} total accounts`);
    
    let updatedCount = 0;

    for (const account of accounts) {
      // Find out if there are other accounts sharing this exact same number
      const duplicates = await Account.find({ accountNumber: account.accountNumber });

      if (duplicates.length > 1 || !account.accountNumber || account.accountNumber.length < 10) {
          console.log(`Processing duplicate or invalid account: ${account._id}`);
          const newNumber = await createUniqueAccountNumber();
          account.accountNumber = newNumber;
          await account.save();
          updatedCount++;
          console.log(`Migrated account ${account._id} to new number ${newNumber}`);
      }
    }

    console.log(`Migration completed successfully! Updated ${updatedCount} accounts.`);
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrateAccounts();
