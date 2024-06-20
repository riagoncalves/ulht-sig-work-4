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

const lyricSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Lyric = mongoose.model('lyrics', lyricSchema);

module.exports = Lyric;
