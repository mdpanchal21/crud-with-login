// const Authuser = require("../model/auth");
// const user = require("../model/User");


// exports.getAuthUser = async (req,res) => {
//     try{
//         const user = await Authuser.find().select("-password");
//         res.json(user);
//     }
//     catch(err){
//         res.status(500).json({message : "server error"});
//     }
// };

// exports.updateAuthUser = async (req,res) => {
//     try{
//         const {id} = req.params;

//         const updatedUser = await Authuser.findByIdAndUpdate(
//             id,
//             req.body,
//             {new : true},
//         )

//         if(!updatedUser){
//             res.status(404).json({message : "user not found"});
//         }

//         res.json(updatedUser)
//     }
//     catch(err){
//         res.status(500).json({message : "server error"})
//     }
// };

// exports.deleteAuthUser = async (req,res) => {
//     try{
//         const {id} = req.params;

//         if(req.user.userId === id){
//             return res.status(400).json({message : "Admin cannot delete self"});
//         }

//         const deletedUser = await Authuser.findByIdAndDelete(id);

//         if(!deletedUser){
//             res.status(404).json({message : "User not found"})
//         }

//         res.json({message : "Auth user delete succesfully"});
//     }
//     catch(err){
//         res.status(500).json({message : "server error"})
//     }
// };

// exports.getUsers = async (req,res) => {
//     try{
//         const users = await user.find();
//         res.json(users)
//     }
//     catch(err){
//         res.status(500).json({message : "server error"})
//     }
// }

// exports.updateUsers = async (req,res) => {
//     try{
//         const {id} = req.params;

//         const updateduser = await user.findByIdAndUpdate(
//             id,
//             req.body,
//             {new : true}
//         );

//         if(!updateduser){
//             res.status(404).json({message : "User not found"})
//         }

//         res.json(updateduser);
//     }
//     catch(err){
//         res.status(500).json({message : "server error"})
//     }
// };

// exports.deleteUsers = async (req,res) => {
//     try{
//         const {id} = req.params;

//         const deleteduser = await user.findByIdAndDelete(id);

//         if(!deleteduser){
//             return res.status(404).json({message : "User not found"})
//         }

//         res.json({message : "User deleted succesfully"})
//     }
//     catch(err){
//         res.status(500).json({message : "server error"})
//     }
// }


//mysql

// const db = require("../config/db");

// /* ================= AUTH USERS ================= */

// // GET all auth users (without password)
// exports.getAuthUser = async (req, res) => {
//   try {
//     const [users] = await db
//       .promise()
//       .query("SELECT id, email, role, created_at FROM users");

//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: "server error" });
//   }
// };

// // UPDATE auth user
// exports.updateAuthUser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const [result] = await db
//       .promise()
//       .query(
//         "UPDATE users SET email = ?, role = ? WHERE id = ?",
//         [req.body.email, req.body.role, id]
//       );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "user not found" });
//     }

//     const [updatedUser] = await db
//       .promise()
//       .query(
//         "SELECT id, email, role, created_at FROM users WHERE id = ?",
//         [id]
//       );

//     res.json(updatedUser[0]);
//   } catch (err) {
//     res.status(500).json({ message: "server error" });
//   }
// };

// // DELETE auth user
// exports.deleteAuthUser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // admin cannot delete self
//     if (req.user.userId == id) {
//       return res.status(400).json({ message: "Admin cannot delete self" });
//     }

//     const [result] = await db
//       .promise()
//       .query("DELETE FROM users WHERE id = ?", [id]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({ message: "Auth user delete succesfully" });
//   } catch (err) {
//     res.status(500).json({ message: "server error" });
//   }
// };

// /* ================= NORMAL USERS (CRUD USERS) ================= */

// // GET all users
// exports.getUsers = async (req, res) => {
//   try {
//     const [users] = await db
//       .promise()
//       .query("SELECT * FROM users_crud");

//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: "server error" });
//   }
// };

// // UPDATE user
// exports.updateUsers = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const [result] = await db
//       .promise()
//       .query(
//         "UPDATE users_crud SET name = ?, email = ? WHERE id = ?",
//         [req.body.name, req.body.email, id]
//       );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const [updatedUser] = await db
//       .promise()
//       .query("SELECT * FROM users_crud WHERE id = ?", [id]);

//     res.json(updatedUser[0]);
//   } catch (err) {
//     res.status(500).json({ message: "server error" });
//   }
// };

// // DELETE user
// exports.deleteUsers = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const [result] = await db
//       .promise()
//       .query("DELETE FROM users_crud WHERE id = ?", [id]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({ message: "User deleted succesfully" });
//   } catch (err) {
//     res.status(500).json({ message: "server error" });
//   }
// };


//postgrase 

const db = require("../config/db");

/* ================= AUTH USERS ================= */

// GET all auth users (without password)
exports.getAuthUser = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, email, role, created_at FROM users"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

// UPDATE auth user
exports.updateAuthUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role } = req.body;

    const result = await db.query(
      "UPDATE users SET email = $1, role = $2 WHERE id = $3",
      [email, role, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "user not found" });
    }

    const updatedUser = await db.query(
      "SELECT id, email, role, created_at FROM users WHERE id = $1",
      [id]
    );

    res.json(updatedUser.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

// DELETE auth user
exports.deleteAuthUser = async (req, res) => {
  try {
    const { id } = req.params;

    // admin cannot delete self
    if (req.user.userId == id) {
      return res.status(400).json({ message: "Admin cannot delete self" });
    }

    const result = await db.query(
      "DELETE FROM users WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Auth user delete succesfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

/* ================= NORMAL USERS (CRUD USERS) ================= */

// GET all users
exports.getUsers = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM users_crud"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

// UPDATE user
exports.updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const result = await db.query(
      "UPDATE users_crud SET name = $1, email = $2 WHERE id = $3",
      [name, email, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await db.query(
      "SELECT * FROM users_crud WHERE id = $1",
      [id]
    );

    res.json(updatedUser.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

// DELETE user
exports.deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "DELETE FROM users_crud WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted succesfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};
