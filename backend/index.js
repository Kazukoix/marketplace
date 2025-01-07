import express from "express";
import mysql from "mysql";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "marketplace",
  });

  const shoeAccounts = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "shoe_store", // Ensure this matches your schema
  });



  // Test connection
  db.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      process.exit(1);
    } else {
      console.log("Connected to the database. SHOES");
    }
  });

  shoeAccounts.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      process.exit(1);
    } else {
      console.log("Connected to the database. ACCOUNTS");
    }
  });

  // Serve images
  app.use("/images", express.static(path.join(__dirname, "public/product_images")));

  // Routes

  // Root endpoint
  app.get("/", (req, res) => {
    res.json("This is the backend");
  });


  app.get("/accounts", (req, res) => {
    const q = "SELECT * FROM accounts";
    shoeAccounts.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  });

  app.get("/shoes", (req, res) => {
    const { sex, brand, category, size, search } = req.query;
    let query = "SELECT * FROM shoes";
    const params = [];
    
    // Build WHERE clause dynamically based on provided filters
    const conditions = [];
    
    if (search) {
      conditions.push("prod_name LIKE ?");
      params.push(`%${search}%`);
    }
    
    if (sex) {
      conditions.push("sex = ?");
      params.push(sex);
    }
    
    if (brand) {
      conditions.push("brand = ?");
      params.push(brand);
    }
    
    if (category) {
      conditions.push("category = ?");
      params.push(category);
    }
  
    if (size) {
      conditions.push("JSON_CONTAINS(size, ?)");
      params.push(`"${size}"`);
    }
    
    // Add WHERE clause if we have any conditions
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }
  
    db.query(query, params, (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json(err);
      }
      return res.json(data);
    });
  });
  
  // Keep these other shoe-related endpoints
  app.get("/shoes/:id", (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM shoes WHERE id = ?";
    db.query(q, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json({ message: "Shoe not found" });
      return res.json(data[0]);
    });
  });
  
  app.get("/male-picks", (req, res) => {
    const q = "SELECT * FROM shoes WHERE sex = 'Male' LIMIT 5";
    db.query(q, (err, data) => {
      if (err) {
        console.error("Error fetching male picks:", err);
        return res.status(500).json(err);
      }
      return res.json(data);
    });
  });

// Admin Middleware
const verifyAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken.is_admin) {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    req.user = decodedToken; // Attach decoded token to the request
    next();
  } catch (err) {
    console.error('Authorization error:', err);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Modified add endpoint
  app.post("/add", verifyAdmin, (req, res) => {
    const q = `
      INSERT INTO shoes 
      (prod_name, brand, size, sex, prod_description, image, price) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      req.body.prod_name,
      req.body.brand,
      req.body.size, // This should now be a JSON string
      req.body.sex,
      req.body.prod_description,
      req.body.image, // This should now be a JSON string
      req.body.price
    ];

    db.query(q, values, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Failed to add product', error: err.message });
      }
      return res.status(201).json({ message: "Shoe added successfully!" });
    });
  });
    
    app.delete("/shoes/:id", (req, res) => {
      const { id } = req.params;
      const q = "DELETE FROM shoes WHERE id = ?";
      db.query(q, [id], (err) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ message: "Shoe deleted successfully!" });
      });
    });

  app.get("/top-picks", (req, res) => {
    const q = "SELECT * FROM shoes ORDER BY RAND() LIMIT 5";
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });
  });

  app.get("/shoes", (req, res) => {
    const { search } = req.query;
    let query = "SELECT * FROM shoes";
    const params = [];
  
    if (search) {
      query += " WHERE prod_name LIKE ?";
      params.push(`%${search}%`);
    }
  
    db.query(query, params, (err, data) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json(err);
      }
      return res.json(data);
    });
  });
  
  // Cart endpoints
  app.post("/cart", (req, res) => {
    const { userId, shoeId, quantity } = req.body;
    const q = `
      INSERT INTO cart (user_id, shoe_id, quantity)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
    `;
    db.query(q, [userId, shoeId, quantity], (err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ message: "Item added to cart!" });
    });
  });

  app.get("/cart/:userId", (req, res) => {
    const { userId } = req.params;
    const q = `
      SELECT c.id as cart_id, c.quantity, s.*
      FROM cart c
      JOIN shoes s ON c.shoe_id = s.id
      WHERE c.user_id = ?
    `;
    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });

  app.put("/cart/:cartId", (req, res) => {
    const { cartId } = req.params;
    const { quantity } = req.body;
    const q = "UPDATE cart SET quantity = ? WHERE id = ?";
    db.query(q, [quantity, cartId], (err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ message: "Quantity updated successfully!" });
    });
  });

  app.delete("/cart/:cartId", (req, res) => {
    const { cartId } = req.params;
    const q = "DELETE FROM cart WHERE id = ?";
    db.query(q, [cartId], (err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ message: "Item removed from cart!" });
    });
  });

// Authentication endpoints
  app.post("/register", async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    // Validate input fields
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert into the database
      const query = "INSERT INTO shoe_store.accounts (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
      const values = [first_name, last_name, email, hashedPassword];

      shoeAccounts.query(query, values, (err, result) => {
        if (err) {
          console.error("Database error:", err);
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "Email already exists" });
          }
          return res.status(500).json({ message: "Database error" });
        }
        return res.status(201).json({ message: "User registered successfully!" });
      });
    } catch (error) {
      console.error("Error during registration:", error);
      return res.status(500).json({ message: "Server error" });
    }
  });

  // Add this endpoint to your backend code
app.post("/create-admin", verifyAdmin, async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert admin user
    const query = "INSERT INTO shoe_store.accounts (first_name, last_name, email, password, is_admin) VALUES (?, ?, ?, ?, TRUE)";
    const values = [first_name, last_name, email, hashedPassword];

    shoeAccounts.query(query, values, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "Email already exists" });
        }
        return res.status(500).json({ message: "Database error" });
      }
      return res.status(201).json({ message: "Admin user created successfully!" });
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Modified login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const q = "SELECT * FROM accounts WHERE email = ?";
  shoeAccounts.query(q, [email], async (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json({ message: "User not found" });

    const user = data[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        is_admin: user.is_admin 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: "Login successful",
      user: { 
        id: user.id, 
        first_name: user.first_name, 
        last_name: user.last_name, 
        email: user.email,
        is_admin: user.is_admin 
      },
      token
    });
  });
});


// Start server
app.listen(8888, () => {
  console.log("Connected to backend on port 8888");
});


app.post("/orders", async (req, res) => {
  const { user_id, cart_items, total_amount } = req.body;

  db.beginTransaction(async (err) => {
    if (err) {
      return res.status(500).json({ message: "Transaction error" });
    }

    try {
      // Create the order
      const orderQuery = "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)";
      db.query(orderQuery, [user_id, total_amount], (err, orderResult) => {
        if (err) throw err;

        const order_id = orderResult.insertId;

        // Insert order items
        const itemPromises = cart_items.map((item) => {
          return new Promise((resolve, reject) => {
            const itemQuery = "INSERT INTO order_items (order_id, shoe_id, quantity, price_at_time) VALUES (?, ?, ?, ?)";
            db.query(itemQuery, [order_id, item.id, item.quantity, item.price], (err) => {
              if (err) reject(err);
              resolve();
            });
          });
        });

        Promise.all(itemPromises)
          .then(() => {
            // Clear the user's cart
            const clearCartQuery = "DELETE FROM cart WHERE user_id = ?";
            db.query(clearCartQuery, [user_id], (err) => {
              if (err) throw err;

              db.commit((err) => {
                if (err) throw err;
                res.status(201).json({ 
                  message: "Order created successfully",
                  order_id: order_id
                });
              });
            });
          })
          .catch((err) => {
            throw err;
          });
      });
    } catch (error) {
      db.rollback(() => {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Failed to create order" });
      });
    }
  });
});


app.get("/orders/:id", (req, res) => {
  const { id } = req.params;
  const orderQuery = `
    SELECT o.*, oi.*, s.prod_name, s.brand
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    JOIN shoes s ON oi.shoe_id = s.id
    WHERE o.id = ?
  `;
  
  db.query(orderQuery, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json({ message: "Order not found" });
    return res.json(data);
  });
});