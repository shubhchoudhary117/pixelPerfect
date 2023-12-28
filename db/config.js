
const mongoose=require("mongoose")


 mongoose.connect('mongodb://127.0.0.1:27017/studiobookingdb')
 .then(()=>console.log("connectred sucessfully"))
 .catch((error)=>console.log(error))

