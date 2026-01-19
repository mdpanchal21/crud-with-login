// mongo db

// const mongoose = require("mongoose");

// const connectDB = async () => {
//     try{
//         const connection = await mongoose.connect(process.env.MONGO_URI);

//         console.log(`MongoDB connected : ${connection.connection.host}`);
//     }
//     catch(error){
//         console.error("MongoDB connection failed:", error.message);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;


//mysql
// const mysql = require("mysql2");

// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
// });

// db.getConnection((err, connection) => {
//   if (err) {
//     console.error("MySQL connection failed:", err.message);
//   } else {
//     console.log("MySQL connected successfully");
//     connection.release();
//   }
// });

// module.exports = db;


const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

pool
  .connect()
  .then(() => console.log("PostgreSQL connected successfully"))
  .catch((err) =>
    console.error("PostgreSQL connection failed:", err.message)
  );

module.exports = pool;

