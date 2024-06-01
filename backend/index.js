const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors'); 
const app = express();
const port = 3001;
app.use(cors());
const uri = "mongodb+srv://arshsak1801:6NK8me2tBxWiu7P9@cluster0.payqye9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(uri);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}




// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function connectToMongoDB() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();
//     console.log("Connected to MongoDB!");

//     // Return the connected client
//     return client;
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     throw error;
//   }
// }

// // Middleware to connect to MongoDB before handling requests
// app.use(async (req, res, next) => {
//   try {
//     req.mongoClient = await connectToMongoDB();
//     next();
//   } catch (error) {
//     res.status(500).send("Internal Server Error");
//   }
// });

// Define your routes here

const MyModel = mongoose.model('Test', new mongoose.Schema({ name: String, balance: Number, email: String }));

app.get('/', async (req, res) => {
  try {
    console.log("requested");
    // Example query
   // const databasesList = await req.mongoClient.db().admin().listDatabases();
   const data = await MyModel.find();
    res.json(data);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post('/updatebalance', async (req, res) => {
  try {
    console.log(req);
    const { balance } = req.body; // Extract updated balance from request body
    if (!balance) {
      return res.status(400).json({ error: 'Balance is required' });
    }

    const updatedData = await MyModel.findOneAndUpdate({name:"Arsh"}, { balance: balance });
    if (!updatedData) {
      return res.status(404).json({ error: 'Data not found' });
    }

    return res.json(updatedData); // Send updated data back to client
  } catch (error) {
    console.error('Error updating balance:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// app.get('/user', async (req, res) => {
//     try {
//       // Example query
//       const databasesList = await req.mongoClient.db().admin().listDatabases();
//       res.json(databasesList);
//     } catch (error) {
//       console.error("Error handling request:", error);
//       res.status(500).send("Internal Server Error");
//     }
//   });
  
// Start the Express server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
