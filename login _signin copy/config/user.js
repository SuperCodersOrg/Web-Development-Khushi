const mongoose=require("mongoose");
 function connectDb(){mongoose.connect("mongodb+srv://e-commerce:khushi@cluster0.bwsg0g0.mongodb.net/?appName=Cluster0")
.then(()=>{
    console.log("connected");
})
.catch((err)=>{
    console.log(err);
})}
module.exports=connectDb;