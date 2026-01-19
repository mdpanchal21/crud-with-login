// const User = require("../model/User")


// exports.getUsers = async (req,res) => {
//     try{
//         const users = await User.find();
//         res.json(users)
//     }
//     catch(err){
//         res.status(500).json({message : "Server error"});
//     }
// };

// exports.createUser = async (req,res) => {
//     try{
//         const {name, email} = req.body;
    
//         if(!name || !email){
//             return res.status(400).json({message : "All fileds are requireed"})
//         }
    
//         const user = await User.create({name,email , photo: req.file.filename ,});  this is iamge 
//         res.status(201).json(user);
//     }
//     catch(err){
//         res.status(500).json({message : "Server error"})
//     }
// }

// exports.updateUser = async (req,res) => {
//     try{
//         const {id} = req.params;
    
//         const updatedUser = await User.findByIdAndUpdate(
//             id,
//             req.body,
//             {new : true}
//         );
    
//         if(!updatedUser){
//             return res.status(404).json({message : "User not found"})
//         }
    
//         res.json(updatedUser);
//     }
//     catch(err){
//         res.status(500).json({message : "Server error"})
//     }
// }


// exports.deleteUser = async (req,res) => {
//     try{
//         const {id} = req.params;
        
//         const deleteuser = await User.findByIdAndDelete(id);
//         if(!deleteuser){
//             return res.status(404).json({message : "User not found"}); 

//         }
//         res.json({message : "User deleted!"});
//     }
//     catch(err){
//         res.status(500).json({message : "Server error"})
//     }
// }

//mysql

// const db = require("../config/db");

// /* ================= GET USERS ================= */
// exports.getUsers = async (req, res) => {
//   try {
//     const [users] = await db
//       .promise()
//       .query("SELECT * FROM users_crud");

//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /* ================= CREATE USER ================= */
// exports.createUser = async (req, res) => {
//   try {
//     const { name, email } = req.body;

//     if (!name || !email) {
//       return res.status(400).json({ message: "All fileds are requireed" });
//     }

//     const [result] = await db
//       .promise()
//       .query(
//         "INSERT INTO users_crud (name, email) VALUES (?, ?)",
//         [name, email]
//       );

//     res.status(201).json({
//       id: result.insertId,
//       name,
//       email,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /* ================= UPDATE USER ================= */
// exports.updateUser = async (req, res) => {
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
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /* ================= DELETE USER ================= */
// exports.deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const [result] = await db
//       .promise()
//       .query("DELETE FROM users_crud WHERE id = ?", [id]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({ message: "User deleted!" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };


//postgrase 

const db = require("../config/db");

/* ================= GET USERS ================= */
exports.getUsers = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM users_crud"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= CREATE USER ================= */
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "All fileds are requireed" });
    }

    const result = await db.query(
      "INSERT INTO users_crud (name, email) VALUES ($1, $2) RETURNING id, name, email",
      [name, email]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= UPDATE USER ================= */
exports.updateUser = async (req, res) => {
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
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DELETE USER ================= */
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "DELETE FROM users_crud WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
