import express from "express";
import mysql from "mysql";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON request bodies
app.use(express.json()); //Enables parsing incoming requests with JSON payload.
app.use(cors()); // Enable CORS for all routes (our frontend use uses a different route vs to our backend)

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

//getting the images
app.use("/images", express.static(path.join(__dirname, "public/product_images")));

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

app.get("/shoes/size/:size", (req, res) => {
  const size = req.params.size;
  const q = "SELECT * FROM shoes WHERE JSON_CONTAINS(size, ?)";
  db.query(q, [`"${size}"`], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/shoes/filter/brand", (req, res) => {
  const { brand } = req.query; // Get the brand filter from query parameters
  const q = "SELECT * FROM shoes WHERE brand = ?"; // SQL query for filtering by brand

  db.query(q, [brand], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});



app.delete("/shoes/:id", (req, res) =>{
  const shoeId = req.params.id;
  const q= "DELETE FROM shoes WHERE id= ?"
  db.query(q,[shoeId], (err,data) =>{
    if(err) return res.json(err);
    return res.json("Data Deleted!");
  })
})

app.put("/shoes/:id", (req, res) => {
  const shoeId = req.params.id;
  const q =
    "UPDATE shoes SET `prod_name`=?, `brand`=?, `size`=?, `sex`=?, `prod_description`=?, `image`=?, `price`=? WHERE id=?";
  const values = [
    req.body.prod_name,
    req.body.brand,
    req.body.size,
    req.body.sex,
    req.body.prod_description,
    req.body.image,
    req.body.price,
  ];

  db.query(q, [...values, shoeId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Data Updated!");
  });
});


//POST FUNCTION = ADDING DATA (USING POSTMAN APP)
app.post("/shoes", (req, res) =>{
  console.log("Received POST request:", req.body); // Debugging line
  const q = "INSERT INTO shoes (`id`, `prod_name`, `brand`, `sex`, `prod_description`, `image`, `price`) VALUES(?)";

  //This request the body and the inside of the body from postman app and gets it to add to the query
  const values = [
    req.body.id,
    req.body.prod_name,
    req.body.brand,
    req.body.size,
    req.body.sex,
    req.body.prod_description,
    req.body.image,
    req.body.price,
  ];
    //We use db here to establish connection with the database and post the newly added items
  db.query(q,[values], (err,data) =>{
    //If there is an error, it would be returned (example if connection isnt sucesfull)
    if(err) return res.json(err);

    //If connection is established, the data will be fetched
    return res.json("Data added!");
  })
})




app.listen(8888, () => {
  console.log("connected to backend")
})



