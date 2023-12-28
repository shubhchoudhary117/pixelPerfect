const mongoose=require("mongoose");

const AdminAuthModelSchema=new mongoose.Schema({
    Username:{
        type:String
    },
    Password:{
        type:String
    }
})

const AdminAuthModel=mongoose.model("AdminAuthModel",AdminAuthModelSchema);

module.exports=AdminAuthModel;