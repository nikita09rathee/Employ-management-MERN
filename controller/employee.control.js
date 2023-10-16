const express=require("express");
const employeeController=express.Router();
const {EmployeeModel}=require("../model/employee.model")
employeeController.get("/",async(req,res)=>{
      
      const {department,FirstName,page,sort}=req.query;
      const limit=5;
      const skiped=(page-1)*limit;
      const filter={};
      if(department){
            filter.department=department;
      }
      if(FirstName){
            filter.FirstName=FirstName;
      }
     


      
        const employees=await EmployeeModel.find(filter).skip(skiped).limit(5).sort({salary:sort});
        res.send({"employees":employees});
     
});
//post request
employeeController.post("/create",async(req,res)=>{
      const {FirstName,LastName,email,department,salary}=req.body;
      console.log(req.body);
      
      await EmployeeModel.create(req.body);
        res.send({message:"your employee is created"});
     
});

//update
employeeController.patch("/:empId",async(req,res)=>{
      const {empId}=req.params;
     
      const payload=req.body;
      console.log(payload+" "+empId );
   
     
      const emp=EmployeeModel.find({_id:empId});
      console.log(emp);
      try{
await EmployeeModel.findByIdAndUpdate(empId,payload);
res.send({message:"employee updated"});
      }
      catch(error){
      res.send({message:"employee not updated"});
      }
}

);

employeeController.delete("/:empId",async(req,res)=>{
      const {empId}=req.params;
     
      const emp=EmployeeModel.find({_id:empId});
     try{
await EmployeeModel.findByIdAndDelete(empId);
res.send({message:"employee deleted"});
}
catch(error){
      res.send({message:"employee not deleted"});

}
});


module.exports={employeeController};