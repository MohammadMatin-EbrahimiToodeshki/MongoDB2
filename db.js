const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://ebrahimitoodeshki:Matin1381@cluster0.geqaesh.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('Cluster0'); // Replace 'your-database-name' with your actual database name
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

function closeMongoDBConnection() {
  client.close();
  console.log('MongoDB connection closed');
}

module.exports = { connectToMongoDB, closeMongoDBConnection };