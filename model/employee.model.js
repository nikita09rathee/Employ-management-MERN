const mongoose=require("mongoose");
const empSchema=mongoose.Schema({
      
      FirstName:{type:String,required:true},
      LastName:{type:String,required:true},
      email:{type:String,required:true},
      department:{type:String,required:true},
      salary:{type:Number,required:true},

      

});
const EmployeeModel=mongoose.model("employee",empSchema);
module.exports={EmployeeModel};