const express=require("express");
const router=express.Router();

const{login,signup,logout,getProfile, updateProfile}=require("../controllers/auth");
const { auth, roleCheck } = require("../middleware/auth");


router.get("/profile", auth, roleCheck("user"), getProfile);
router.put("/profile", auth, roleCheck("user"), updateProfile);
router.post("/login",login);
router.post("/signup",signup);
router.post("/logout",auth,logout);


module.exports=router;
