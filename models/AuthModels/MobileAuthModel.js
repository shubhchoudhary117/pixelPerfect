const mongoose=require("mongoose");


const MobileAuthSchema=new mongoose.Schema({
    Mobile:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    OTP:{
        type:String,
        require:true
    }
})

const MobileAuthModel=mongoose.model("MobileAuthModel",MobileAuthSchema);

module.exports=MobileAuthModel;