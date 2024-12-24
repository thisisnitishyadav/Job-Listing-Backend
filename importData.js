require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const connectDB = require("./config/database");
const Job = require("./models/Job");
const rawData = require("./data/Task_Data.json");

// Utility function to preprocess and clean JSON data
const preprocessData = (data) => {
  return data.map((item) => ({
    jobID: item["Job ID (Numeric)"]["$numberLong"] || item["Job ID (Numeric)"], // Handle "$numberLong"
    title: item.title || "N/A",
    company: item.company || "N/A",
    location: item.location || "N/A",
    jobLink: typeof item.job_link === "string" ? item.job_link : null, // Ensure valid string
    seniorityLevel: item.seniority_level || "N/A",
    employmentType: item.employment_type || "N/A",
    source: item.source || "N/A",
    experience: item.experience || "N/A",
    companyUrl: typeof item.company_url === "string" ? item.company_url : null, // Ensure valid string
    companyImageUrl: typeof item.companyImageUrl === "string" ? item.companyImageUrl : "", // Ensure valid string
    postedDateTime: new Date(item.postedDateTime["$date"] || item.postedDateTime), // Handle "$date"
    minExp: item.min_exp || 0,
    maxExp: item.max_exp || 0,
    country: item.country || "N/A",
    companyType: item.companytype || "unknown",
  }));
};

const importData = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Clear existing data (optional)
    await Job.deleteMany();

    // Preprocess JSON data
    const transformedData = preprocessData(rawData);

    // Insert transformed data into the database
    await Job.insertMany(transformedData);
    console.log("Data imported successfully!");

    process.exit(); // Exit the script
  } catch (error) {
    console.error("Error importing data:", error.message);
    process.exit(1); // Exit with failure
  }
};

// Execute the import function
importData();
