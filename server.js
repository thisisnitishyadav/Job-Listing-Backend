//imports
const express = require('express');
const app = express();
const connectDB = require ("./config/database");
const dotenv =require("dotenv");
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');


//loading env variable
dotenv.config();

//connect to database
connectDB();
  
//setting port number
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/jobs', jobRoutes);

//listening to server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
