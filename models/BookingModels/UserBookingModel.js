const mongoose=require("mongoose");


const UserBookingModelSchema=new mongoose.Schema({
    Name:{
        type:String
    },
    Email:{
        type:String
    },
    Mobile:{
        type:String,
        trim:true,
    },
    Date:{
        type:Date
    },
    ShootingType:{
        type:String
    },
    Location:{
        type:String
    },
    BookingPrice:{
        type:String
    },
    ShootingContact:{
        type:String
    }
})

const UserBookingModel=mongoose.model("UserBookingModel",UserBookingModelSchema);

module.exports=UserBookingModel;