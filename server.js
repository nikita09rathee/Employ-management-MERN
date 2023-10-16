const express=require("express");
const app=express();
const bcrypt=require("bcrypt");
const {connection}=require("./config/db")
const  {employeeController}=require("./controller/employee.control");
const jwt = require('jsonwebtoken');
//const {E}
const {UserModel}=require("./model/user.model")
const cors=require("cors");
app.use(express.json());
app.use(cors({
      origin:["http://localhost:3000","https://kijaa.netlify.app"]
}))
//login signup
app.get("/",(req,res)=>{
      res.send("welcome");
}) 
app.post("/signup",async(req,res)=>{
const {email,password}=req.body;
try{
      bcrypt.hash(password, 4,async function(err, hash) {
            // Store hash in your password DB.
            await UserModel.create({email,password:hash});
            res.send({message:"signup successfull"});

        });
    
}
catch(error){
      console.log(error);
}

});
//login
app.post("/login",async(req,res)=>{
      const {email,password}=req.body;
      const user=await UserModel.findOne({email});
      if(!user){
            res.send({message:"signup first"});
      }
      const hashed_pass=user?.password;
      console.log(hashed_pass);
      bcrypt.compare(password, hashed_pass, function(err, result) {
            // result == true
            if(err){
                  res.send({message:"Invalid credentials"})
            }
            else if(result){
                  const token = jwt.sign({ userId: user._id }, 'employee');
                  res.send({message:"Login successfull",token:token}).status(200);
            }
        });
        

});


app.use("/employees",employeeController);
app.listen(8080,async()=>{
      try{
            await connection;
            console.log("db connected");
      }
      catch(error){
            console.log(error);
      }
})