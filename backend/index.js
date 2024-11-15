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



//POST FUNCTION = ADDING DATA (USING POSTMAN APP)
app.post("/shoes", (req, res) =>{
  console.log("Received POST request:", req.body); // Debugging line
  const q = "INSERT INTO shoes (`id`, `prod_name`, `prod_description`, `image`) VALUES(?)";

  //This request the body and the inside of the body from postman app and gets it to add to the query
  const values = [
    req.body.id,
    req.body.prod_name,
    req.body.prod_description,
    req.body.image
  ];
    //We use db here to establish connection with the database and post the newly added items
  db.query(q,[values], (err,data) =>{
    //If there is an error, it would be returned (example if connection isnt sucesfull)
    if(err) return res.json(err);

    //If connection is established, the data will be fetched
    return res.json("Data added!");
  })
})

//FETCH FUNCTION ADDING IN TABLE SHOES
fetch("http://localhost:8888/shoes", {
  method: "POST",
  headers: {
      "Content-Type": "application/json",
  },
  body: JSON.stringify({
  }),
})
.then(response => response.json())
.then(data => console.log("Response:", data))
.catch(error => console.error("Error:", error));





app.listen(8888, () => {
  console.log("connected to backend")
})

