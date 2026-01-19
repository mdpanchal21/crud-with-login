const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");

const {
    getAuthUser,
    updateAuthUser,
    deleteAuthUser,
    getUsers,
    updateUsers,
    deleteUsers
}
= require("../controller/adminController");
const isAdmin = require("../middleware/roleMiddleware");

router.get("/auth-users" ,authMiddleware , isAdmin, getAuthUser);
router.put("/auth-user/:id" , authMiddleware , isAdmin , updateAuthUser);
router.delete("/auth-user/:id" , authMiddleware , isAdmin , deleteAuthUser);

router.get("/users" , authMiddleware , isAdmin , getUsers);
router.put("/users/:id" , authMiddleware , isAdmin , updateUsers);
router.delete("/users/:id" , authMiddleware , isAdmin , deleteUsers);

module.exports = router;
