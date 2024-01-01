  const express = require('express');
  const mongoose = require('mongoose');
  const employeeRoutes = require('./routes/employeeRoutes');
  require('dotenv').config();
  const app = express();

  console.log("DB URI:", process.env.DB);
  // MongoDB connection
  mongoose.connect(process.env.DB, {
  
  });

  // Middleware
  app.use(express.json());

  // Routes
  app.use('/employees', employeeRoutes);

  // Start server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
