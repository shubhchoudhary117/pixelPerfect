const AdminAuthModel=require("../../../models/AdminModels/AdminAuthModels/AdminAuthModel.js")
const jwt=require("jsonwebtoken")
class AdminAuthController{

    static AdminLogin=async(req,res)=>{
        console.log(req.body)
       try{
        console.log(await AdminAuthModel.find());
        let user=await AdminAuthModel.findOne({Username:req.body.username});
        if(user){
            if(user.Password===req.body.password){
                // generate the token and send the user
               let GenerateToken= jwt.sign(req.body,process.env.ADMIN_SECRETE_KEY,{expiresIn:'1d'})
                res.json({userexist:true,login:true,token:GenerateToken,passwordInvalid:false})
            }else{
                res.json({userexist:true,login:false,token:null,passwordInvalid:true,internalError:false})
            }
        }else{
            res.json({userexist:false,login:false,token:null,passwordInvalid:false,internalError:false})
        }
       }catch(error){
        console.log(error);
        res.json({userexist:false,login:false,token:null,passwordInvalid:false,internalError:true})
       }
       
    }


    static getAdmin=async(req,res)=>{
      
            let Username=req.username;
            try{
             let AdminAuth=await AdminAuthModel.findOne({Username:Username});
             if(AdminAuth){
                 console.log(AdminAuth)
                 res.json({Authorization:true,AdminAuth:AdminAuth,someThingWentWrong:false})
             }else{
                 res.json({Authorization:false,AdminAuth:null,someThingWentWrong:false})
             }
            }catch(error){
             console.log(error);
             res.json({Authorization:false,AdminAuth:null,someThingWentWrong:true})
            }
         

    }
}


module.exports=AdminAuthController