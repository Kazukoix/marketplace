import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors()); // Enable CORS for all routes


app.get("/test", (req, res) => {
  console.log("GET request received");
  res.json({ message: "GET request working" });
});

//connecting mysql
const db = mysql.createConnection({
  host:"localhost",
  user: "root",
  password: "root",
  database: "marketplace"



});
//Requesting and responding from mysql
app.get("/", (req, res) =>{
  //response will send a json file to see if we received a request
  res.json("this is the backend")
})

//Getting the data from mysql shoes table
app.get("/shoes", (req, res) =>{
  //Executing sql statements
  const q = "SELECT * FROM shoes";

  //Fetching the error and data
  //We use db here to establish connection with the database
  db.query(q,(err, data) => {
    
    //If there is an error, it would be returned (example if connection isnt sucesfull)
    if(err) return res.json(err)
    
    //If connection is established, the data will be fetched
    return res.json(data)
  })
})



//POST FUNCTION = ADDING DATA
app.post("/shoes", (req, res) =>{
  console.log("Received POST request:", req.body); // Debugging line
  const q = "INSERT INTO shoes (`id`, `prod_name`, `prod_description`, `image`) VALUES(?)";
  const values = [
    "9",
    "prod8",
    "prod8_desc",
    "item8.png"
  ];
    //We use db here to establish connection with the database and post the newly added items
  db.query(q,[values], (err,data) =>{
    //If there is an error, it would be returned (example if connection isnt sucesfull)
    if(err) return res.json(err);

    //If connection is established, the data will be fetched
    return res.json("Data added!");
  })
})



// app.listen(8888, () => {
//   console.log("connected to backend")
// })

// fetch("http://localhost:8888/shoes", {
//   method: "POST",
//   headers: {
//       "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//       id: "007",
//       prod_name: "prod8",
//       prod_description: "prod3_desc",
//       image: "prod3.png"
//   }),
// })
// .then(response => response.json())
// .then(data => console.log("Response:", data))
// .catch(error => console.error("Error:", error));


