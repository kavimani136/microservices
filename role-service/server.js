const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Create Role
app.post("/roles", async (req, res) => {
  try {
    const { rolename, status } = req.body;
    const result = await pool.query(
      "INSERT INTO roles (rolename, status) VALUES ($1, $2) RETURNING *",
      [rolename, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get All Roles
app.get("/roles", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM roles");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get Role by ID
app.get("/roles/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM roles WHERE id = $1", [
      req.params.id,
    ]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update Role
app.put("/roles/:id", async (req, res) => {
  try {
    const { rolename, status } = req.body;
    const result = await pool.query(
      "UPDATE roles SET rolename=$1, status=$2 WHERE id=$3 RETURNING *",
      [rolename, status, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete Role
app.delete("/roles/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM roles WHERE id=$1", [req.params.id]);
    res.json({ message: "Role deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 8082;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Role Service running on port ${PORT}`);
});
