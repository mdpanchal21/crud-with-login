const express = require("express");
const router = express.Router();
// const upload  = require("../middleware/upload");

const authMiddleware = require("../middleware/authmiddleware");

const {createUser, updateUser, deleteUser , getUsers} = require("../controller/userController");


router.get("/" ,authMiddleware,  getUsers);
router.post("/",authMiddleware,createUser);
router.put("/:id",authMiddleware,updateUser);
router.delete("/:id", authMiddleware,deleteUser);

// for iamge upload
// router.post(
//   "/",
//   authMiddleware,
//   upload.single("photo"), // <-- image field name
//   createUser
// );

// router.put(
//   "/:id",
//   authMiddleware,
//   upload.single("photo"), // 👈 IMAGE HERE
//   updateUser
// );

module.exports = router;


