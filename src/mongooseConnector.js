import mongoose from 'mongoose'
async function MongooseConnector(){
    try{
        const dbUri=process.env.MONGO_URI
var mongooseDb=mongoose.connect(dbUri,
 { useNewUrlParser: true, useUnifiedTopology: true })
    }catch(error){
        console.log(error)
    }
console.log("database connected successfully")
return mongooseDb
//   .then(() => console.log('Connected to the database'))
//   .catch((error) => console.error(error));
}
export default MongooseConnector