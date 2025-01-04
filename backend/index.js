import express from "express";
import mysql from "mysql";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
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

const shoeStoreDb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "shoe_store"
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

app.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const q = "INSERT INTO accounts (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
    const values = [first_name, last_name, email, hashedPassword];

    shoeStoreDb.query(q, values, (err, data) => { // Use shoeStoreDb connection here
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "Email already exists" });
        }
        return res.status(500).json({ message: "Database error", error: err });
      }
      return res.status(201).json({ message: "User registered successfully!" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Error hashing password", error });
  }
});


app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const q = "SELECT * FROM accounts WHERE email = ?";

  shoeStoreDb.query(q, [email], async (err, data) => {
    if (err) {
      console.error("Database query error:", err); // Log the error
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    try {
      const user = data[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      return res.status(200).json({
        message: "Login successful",
        user: { id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email },
      });
    } catch (error) {
      console.error("Password comparison error:", error); // Log bcrypt error
      return res.status(500).json({ message: "Internal server error", error });
    }
  });
});