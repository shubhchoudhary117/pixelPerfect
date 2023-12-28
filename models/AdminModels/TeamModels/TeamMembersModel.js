
const mongoose=require("mongoose");


const TeamMembersModelSchema=new mongoose.Schema({
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
    ShootingType:{
        type:String
    },
    Location:{
        type:String
    },
    BookingPrice:{
        type:String
    }
})

const TeamMembersModel=mongoose.model("TeamMembersModel",TeamMembersModelSchema);

module.exports=TeamMembersModel;