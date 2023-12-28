
const mongoose=require("mongoose")


 mongoose.connect(process.env.MONGO_URI)
 .then(()=>console.log("database connectred sucessfully"))
 .catch((error)=>console.log(error))

