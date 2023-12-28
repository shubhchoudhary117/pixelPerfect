const express=require("express");
const RegisterStudioController  = require("../../controllers/RegisterStudioControllers/RegisterStudioController");
const Protect=require("../../middleware/protect.js")
const router=express.Router();


router.post("/otp",RegisterStudioController.SendOtp);
router.post("/verify-otp",RegisterStudioController.verifyOTP);
router.post("/bookmy-shoot",RegisterStudioController.BookmyShoot)
router.get("/getbookings",Protect,RegisterStudioController.getBookings)

module.exports=router;