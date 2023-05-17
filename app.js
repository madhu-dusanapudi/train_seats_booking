import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import MongooseConnector from './src/mongooseConnector.js'
import router from './src/api\'s/router.js';
dotenv.config()
const app = express();

// Set up middleware to parse incoming JSON data
app.use(express.json());
app.set('trust proxy', true);

// Define the routes
app.use('',router)
app.use(cors());
app.options("*", cors());
await MongooseConnector()

try {
  const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
  } catch(error) {
    console.log(error)
    process.exit(1)
  }

