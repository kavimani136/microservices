const { Pool } = require("pg");

// const pool = new Pool({
//   user: process.env.DB_USER || "postgres",
//   host: process.env.DB_HOST || "localhost",
//   database: process.env.DB_NAME || "postgres",
//   password: process.env.DB_PASS || "admin",
//   port: process.env.DB_PORT || 5432,
// });

const connectionString = 'postgresql://postgres:admin@postgres-db:5432/postgres';
const pool = new Pool({
  connectionString: connectionString,
});

module.exports = pool;
