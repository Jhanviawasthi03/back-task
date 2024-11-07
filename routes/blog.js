const express = require("express");
const router = express.Router();
const { createpost, getallpost, updatePost, deletePost } = require("../controllers/postcontrol");


const { auth } = require("../middleware/auth");

router.post("/posts/create",auth,createpost);
router.get("/posts", getallpost);
router.put("/posts/:id",auth,  updatePost);
router.delete("/posts/:id",  auth,deletePost);

module.exports = router;