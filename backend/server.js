const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/holidayDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Define Holiday Schema and Model
const holidaySchema = new mongoose.Schema({
  date: String,
  localName: String,
  name: String,
  countryCode: String
});


const Holiday = mongoose.model('Holiday', holidaySchema);

// Endpoint to add a holiday
app.post('/addHoliday', async (req, res) => {
  const { date, localName, name, countryCode } = req.body;
  console.log('Request Body:', req.body);  // Log incoming request
  try {
    const newHoliday = new Holiday({ date, localName, name, countryCode });
    await newHoliday.save();
    res.status(201).send('Holiday added successfully');
  } catch (error) {
    console.error('Error adding holiday:', error);  // Log detailed error
    res.status(500).send('Error adding holiday');
  }
});


// Endpoint to get all holidays
app.get('/holidays', async (req, res) => {
  try {
    const holidays = await Holiday.find();
    res.json(holidays);
  } catch (error) {
    res.status(500).send('Error fetching holidays');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});