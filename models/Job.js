const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobID: { type: String, required: true }, // Matches "Job ID (Numeric)" as String
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  jobLink: { type: String, required: true }, // Matches "job_link"
  seniorityLevel: { type: String }, // Matches "seniority_level"
  employmentType: { type: String, required: true }, // Matches "employment_type"
  source: { type: String },
  experience: { type: String },
  companyUrl: { type: String }, // Matches "company_url"
  companyImageUrl: { type: String },
  postedDateTime: { type: Date }, // Handles flattened $date string
  minExp: { type: Number },
  maxExp: { type: Number },
  country: { type: String },
  companyType: { type: String }, // Matches "companytype"
});


const Job = mongoose.model('Job', jobSchema);
module.exports = Job;

