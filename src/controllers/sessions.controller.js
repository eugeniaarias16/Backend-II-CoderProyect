import { User } from "../dao/models/user.model.js";


export class SessionController{
  
  static async register(req,res){
    try{
      const existingUser= await User.findOne({email:req.body.email});
      if(existingUser){
        return res.status(400).json({status:"error",message:"User already exists"});
      }
      const { first_name, last_name, email, password, age } = req.body;
      if(!first_name || !last_name || !email || !password || !age ){
        return res.status(400).json({status:"error",message:"All fields are required"});
      }
      const newUser= new User({ first_name, last_name, email, password, age });
      await newUser.save();

      const userWithoutPassword = newUser.toObject();
      delete userWithoutPassword.password; //Eliminamos el password del objeto que se va a enviar al cliente
      
      res.status(201).json({status:"success",message:"User created successfully", user:userWithoutPassword});
  
    }catch(error){
      res.status(500).json({status:"error",message:"Internal server error"});
    }

  };




}