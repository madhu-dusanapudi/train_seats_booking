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
app.use((req,res,next)=>{
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
   next();
  })
// app.options("*", cors());
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

