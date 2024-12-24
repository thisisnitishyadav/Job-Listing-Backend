const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Fetch all job data
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error: error.message });
  }
});

// Filter jobs by location
// router.get('/filter', async (req, res) => {
//   const { location } = req.query;

//   try {
//     const jobs = await Job.find({ location: { $regex: location, $options: 'i' } });
//     res.status(200).json(jobs);
//   } catch (error) {
//     res.status(500).json({ message: "Error filtering jobs", error: error.message });
//   }
// });

router.get('/search', async (req, res) => {
  const location = req.query.location;
  try {
    const jobs = await Job.find({ location: new RegExp(location, 'i') });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
