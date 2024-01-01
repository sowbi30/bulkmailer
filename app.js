const express = require('express');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/employeeRoutes');
require('dotenv').config();
const app = express();

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

// Call dbConnect to establish the database connection
dbConnect()
  .then(() => {
    // Middleware
    app.use(express.json());

    // Routes
    app.use('/employees', employeeRoutes);

    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
