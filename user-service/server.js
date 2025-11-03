const express = require("express");
const cors = require("cors");
const pool = require("./db");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // ✅ required for JSON
app.use(bodyParser.urlencoded({ extended: true })); // ✅ optional

app.use((req, res, next) => {
  console.log("📡 Incoming:", req.method, req.url);
  next();
});

//mani test

// ✅ Create User
app.post("/users", async (req, res) => {
  try {
    console.log("hi");
    console.log("hi");
     console.log("hi");
    let date = new Date();
    const { username, password, status } = req.body;
    const result = await pool.query(
      "INSERT INTO users (username, password, status, createdat) VALUES ($1, $2, $3,$4) RETURNING *",
      [username, password, status,date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get All Users
app.get("/users", async (req, res) => {
  try {
      console.log("Get All Users");
      console.log("users get");
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {console.log("users get",err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get User by ID
app.get("/users/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.params.id,
    ]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update User
app.put("/users/:id", async (req, res) => {
  try {
    const { username, password, status } = req.body;
    const result = await pool.query(
      "UPDATE users SET username=$1, password=$2, status=$3 WHERE id=$4 RETURNING *",
      [username, password, status, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete User
app.delete("/users/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM users WHERE id=$1", [req.params.id]);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
// const PORT = process.env.PORT || 8085;
// app.listen(PORT, () => {
//   console.log(`🚀 User Service running on port ${PORT}`);
// });


const PORT = process.env.PORT || 8085;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 User Service running on port ${PORT}`);
});
