const MobileAuthModel=require("../../models/AuthModels/MobileAuthModel.js")

class AuthController{

    static getUser=async(req,res)=>{
       let Mobile=req.mobile;
       try{
        let UserAuth=await MobileAuthModel.findOne({Mobile:Mobile});
        if(UserAuth){
            console.log(UserAuth)
            res.json({Authorization:true,UserAuth:UserAuth,someThingWentWrong:false})
        }else{
            res.json({Authorization:false,UserAuth:null,someThingWentWrong:false})
        }
       }catch(error){
        console.log(error);
        res.json({Authorization:false,UserAuth:null,someThingWentWrong:true})
       }
    }
}

module.exports=AuthController