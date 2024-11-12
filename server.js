const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const Painting = require('./models/paintings'); // Ensure this is correct

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/artGallery', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Serve images with fallback for missing files
app.get('/images/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, 'public', 'images', imageName);
    const dummyImagePath = path.join(__dirname, 'public', 'images', 'dummy.jpeg'); // Ensure this matches your dummy file

    try {
        if (fs.existsSync(imagePath)) {
            res.sendFile(imagePath); // Send the actual image if it exists
        } else {
            throw new Error('Image not found'); // Trigger fallback
        }
    } catch (err) {
        res.sendFile(dummyImagePath); // Send the dummy image
    }
});

// API to get all paintings
app.get('/api/paintings', async (req, res) => {
    try {
        const paintings = await Painting.find(); // Mongoose will use the correct collection
        res.json(paintings);
    } catch (err) {
        console.error('Error retrieving paintings:', err);
        res.status(500).send('Error retrieving paintings');
    }
});


// Define a port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
