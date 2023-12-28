const express=require("express");
const AdminAuthController = require("../../controllers/Admin/AuthController/AdminAuthController");
const  AdminProtect =require("../../middleware/AdminProtect.js");
const router=express.Router();

router.post("/login",AdminAuthController.AdminLogin);
router.get("/getadmin",AdminProtect,AdminAuthController.getAdmin)
module.exports=router