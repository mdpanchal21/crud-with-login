// const AuthUser = require("../model/auth");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// exports.Register = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ message: "All field are required" });
//         }

//         const UserExists = await AuthUser.findOne({ email });

//         if (UserExists) {
//             return res.status(409).json({ message: "User already exists" })
//         }

//         const hashedpassword = await bcrypt.hash(password, 10);

//         const user = await AuthUser.create({ email, password: hashedpassword });
//         res.status(201).json({ message: "User register succesfully" });
//     }
//     catch (err) {
//         res.status(500).json({ message: "Server Error" })
//     }

// };


// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ message: "All fields are require" });
//         };

//         const user = await AuthUser.findOne({ email });

//         if (!user) {
//             return res.status(400).json({ message: "User not found" });
//         };

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: "Invalid email or password" });
//         }

//         const token = jwt.sign(
//             { 
//                 userId: user._id, 
//                 role: user.role 
//             },
//             process.env.JWT_SECRET,
//             { expiresIn: "1d" }
//         );

//         res.json({
//             message: "Login Successfully"
//             , token: token,
//         });
//     }
//     catch (error) {
//         res.status(500).json({ message: "Server error" })
//     }
// }


//mysql 

// const db = require("../config/db");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// /* ================= REGISTER ================= */
// exports.Register = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "All field are required" });
//     }

//     // Check if user exists
//     const [existingUser] = await db
//       .promise()
//       .query("SELECT * FROM users WHERE email = ?", [email]);

//     if (existingUser.length > 0) {
//       return res.status(409).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert user
//     await db
//       .promise()
//       .query(
//         "INSERT INTO users (email, password) VALUES (?, ?)",
//         [email, hashedPassword]
//       );

//     res.status(201).json({ message: "User register succesfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// /* ================= LOGIN ================= */
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "All fields are require" });
//     }

//     const [users] = await db
//       .promise()
//       .query("SELECT * FROM users WHERE email = ?", [email]);

//     if (users.length === 0) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const user = users[0];

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const token = jwt.sign(
//       {
//         userId: user.id, // MySQL id
//         role: user.role,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       message: "Login Successfully",
//       token: token,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };


//postgrase
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* ================= REGISTER ================= */
exports.Register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All field are required" });
    }

    // Check if user exists
    const existingUser = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await db.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [email, hashedPassword]
    );

    res.status(201).json({ message: "User register succesfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= LOGIN ================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are require" });
    }

    const result = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        userId: user.id,   // PostgreSQL id
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login Successfully",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
