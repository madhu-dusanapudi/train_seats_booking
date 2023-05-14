import express from 'express'
import cors from "cors";
import dotenv from 'dotenv'
import MongooseConnector from './src/mongooseConnector.js'
import router from './src/api\'s/router.js';
dotenv.config()
const app = express();

// Set up middleware to parse incoming JSON data
app.use(express.json());
await MongooseConnector()
// Define the routes

// GET /seats
// Get the availability status of all seats
app.use('',router)

try {
    const dbPort = 3000
    var server = app.listen(dbPort, () => {
      console.info(`Listening on port ${dbPort}`);
    });
  } catch(error) {
    console.log(error)
    process.exit(1)
  }
  app.use(cors());

