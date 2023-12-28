const BookingModel=require("../../../models/BookingModels/UserBookingModel.js")


class AdminUserController{
    static getBookings=async(req,res)=>{
        try{
            let allBookings=await BookingModel.find();
            res.json({bookings:allBookings,somethingwentwrong:false})
        }
        catch(error){
            console.log(error);
            res.json({bookings:null,somethingwentwrong:true})
        }
        
    }
}


module.exports=AdminUserController