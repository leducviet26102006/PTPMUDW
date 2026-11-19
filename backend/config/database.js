const sql = require("mssql");
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,

  options: {
    instanceName: process.env.DB_INSTANCE,
    encrypt: false,
    trustServerCertificate: true,
  },

  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

const connectDB = async () => {
  try {
    const pool = await sql.connect(config);

    console.log("Ket noi SQL Server thanh cong!");

    return pool;
  } catch (error) {
    console.error("Loi ket noi SQL Server:", error.message);
    throw error;
  }
};

module.exports = { sql, connectDB };
