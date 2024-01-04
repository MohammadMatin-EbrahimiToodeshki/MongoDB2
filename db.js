// db.js
const { MongoClient } = require('mongodb');

// Replace '<your-connection-string>' with your actual MongoDB Atlas connection string
const uri = 'mongodb+srv://ebrahimitoodeshki:Matin1381@cluster0.geqaesh.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
}

connectToDatabase();

module.exports = client;