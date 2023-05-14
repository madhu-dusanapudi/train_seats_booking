import express from 'express'
// import dotenv from 'dotenv'
import MongooseConnector from './src/mongooseConnector.js'
import router from './src/api\'s/router.js';
// dotenv.config()
const app = express();

// Set up middleware to parse incoming JSON data
app.use(express.json());
await MongooseConnector()
// Define the routes

// GET /seats
// Get the availability status of all seats
app.use('',router)

try {
  const port =  8080;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
    // const dbPort = process.env.PORT || 8080
    // app.listen(dbPort, '0.0.0.0');
    // var server = app.listen(dbPort, () => {
    //   console.info(`Listening on port ${dbPort}`);
    // });
  } catch(error) {
    console.log(error)
    process.exit(1)
  }

