
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

PORT = process.env.PORT || 3000;


async function checkDatabaseConnection() {
    try {
      // Test if the database connection works
      await prisma.$connect();
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Error connecting to the database:', error);
      process.exit(1); // Exit the process with failure
    }
  }
  
  async function startServer() {

    await checkDatabaseConnection();
  
    app.listen(PORT, "0.0.0.0", () => {
      console.log("listening on port " + PORT);
    });
  
    app.use("/", (req, res) => {
      res.json("welcome to Plan It All");
    });
  
  }

  startServer(); 