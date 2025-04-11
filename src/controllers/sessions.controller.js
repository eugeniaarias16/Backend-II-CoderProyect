import { User } from "../dao/models/user.model.js";
import { validPassword } from "../utils/hashPassword.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import passport from "passport";


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

static async login(req,res){
  try{
    const existingUser= await  User.findOne({email:req.body.email});
    if(!existingUser){
      return res.status(400).json({status:"error",message:"Invalid email"});
    }
    const loginPassword= req.body.password;
    const userPassword= existingUser.password;
    const isValidPassword= await validPassword(loginPassword,userPassword);
    if(!isValidPassword){
      return res.status(400).json({status:"error",message:"Invalid password"});
    }
    const userWithoutPassword = existingUser.toObject();
    delete userWithoutPassword.password; 
    
    // Crear JWT token
    const token= jwt.sign(userWithoutPassword,config.JWT_SECRET,{expiresIn:config.JWT_EXPIRES_IN});
    res.cookie('authToken', token, { httpOnly: true, maxAge:60*60*1000}); //1 hour


    res.status(200).json({status:"success",message:"Login successful", user:userWithoutPassword});


  }catch(error){
      res.status(500).json({status:"error",message:"Internal server error"});
  }
}




}