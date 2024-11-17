// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('', contactRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// const app = express();
// const port = 8000;

// app.use(express.json()); // Important: Parse JSON request bodies

// app.post('/contacts', (req, res) => {
//   console.log('Received POST request to /contacts:', req.body); // Log the request body

//   // Process the contact data (e.g., save to a database)
//   // ... your code to handle the contact data ...

//   res.status(201).json({ message: 'Contact created successfully' }); // Send a success response
// });

// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });