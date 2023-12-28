const express=require("express");
const AdminUserController = require("../../controllers/Admin/AdminUserController/AdminUserController.js");

const router=express.Router();

router.get("/get-bookings",AdminUserController.getBookings);

module.exports=router