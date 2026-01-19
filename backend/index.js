// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv"); 

// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const app = express();


// app.use(express.json());
// app.use(cors())

// const userRoutes = require("./routes/userRoute");
// const authRoutes = require("./routes/authRuote");
// const adminRoutes = require("./routes/adminRoutes");

// app.use("/users" , userRoutes);
// app.use("/auth" , authRoutes);
// app.use("/admin" , adminRoutes)

// app.listen(process.env.PORT , () => {
//     console.log(`server is running on ${process.env.PORT}`)
// });



// mysql

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

require("./config/db"); // MySQL connection

const app = express();

app.use(express.json());
app.use(cors());

// 👇 serve images
// app.use("/uploads", express.static("uploads"));


const userRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/authRuote");
const adminRoutes = require("./routes/adminRoutes");

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
