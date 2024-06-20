require('dotenv').config();
const mongoose = require('mongoose');

const dbString = process.env.DB_STRING;

async function dbConnect() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(dbString);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
}

dbConnect().catch(err => console.error(err));

const publicKeyCredentialSchema = new mongoose.Schema({
  userId: { type: Buffer, required: true },
  externalId: { type: String, required: true },
  publicKey: { type: String, required: true }
});

const PublicKeyCredential = mongoose.model('public_key_credentials', publicKeyCredentialSchema);

module.exports = PublicKeyCredential;
