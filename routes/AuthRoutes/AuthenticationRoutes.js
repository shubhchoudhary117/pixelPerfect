const express=require("express");
const AuthController =require("../../controllers/AuthControllers/AuthController.js")
const Protect=require("../../middleware/protect.js")

// crate an router object
const router=express.Router();
router.get("/get-user",Protect,AuthController.getUser)



module.exports=router;