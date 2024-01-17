// app.js
const express = require('express');
const bodyParser = require('body-parser'); // Add this line
const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Serve static assets from the public folder
app.use(express.static('public'));

// Add body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('welcome');
});

app.get('/information-form', (req, res) => {
    res.render('information-form');
});

const client = require('./db');
app.post('/submit-information', async (req, res) => {
    try {
        const db = await client.connectToMongoDB('Cluster0'); // Replace with your MongoDB database name
        const collection = db.collection('form'); // Replace with your MongoDB collection name

        // Extract form data from req.body and insert it into MongoDB
        const formData = req.body; // Update with your actual form field names
        await collection.insertOne(formData);

        client.closeMongoDBConnection();

        res.redirect('/database-report'); // Redirect to the database report page after submission
    } catch (error) {
        console.error('Error handling form submission:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/database-report', async (req, res) => {
    try {
        const db = await client.connectToMongoDB();
        const collection = db.collection('form'); 

        // Fetch data from MongoDB collection
        const form = await collection.find().toArray();

        res.render('database-report', { form });
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});