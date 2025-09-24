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


// ✅ Create country
app.post("/country", async (req, res) => {
  try {
    console.log("country");

    const { countryname, countrycode } = req.body;
    const result = await pool.query(
      "INSERT INTO country (countryname,countrycode) VALUES ($1, $2) RETURNING *",
      [countryname, countrycode]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get All country
app.get("/country", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM country");
    res.json(result.rows);
  } catch (err) {console.log("country get",err);
    res.status(500).json({ error: err.message });
  }
});






const PORT = process.env.PORT || 8087;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 User Service running on port ${PORT}`);
});
