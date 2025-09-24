const { Pool } = require("pg");

const connectionString = 'postgresql://postgres:admin@postgres-db:5432/postgres';
const pool = new Pool({
  connectionString: connectionString,
});


module.exports = pool;
