const jwt = require('jsonwebtoken');
const validator  = require("validator");
const userModel = require('../Model/UserModel');
const { hashPassword, matchPassward } = require('../Helper/hasPassword');

const Registration = async(req,res)=>{
if(!validator.isEmail(req.body.email)){return res.status(400).send({sucess:false,message:"email not valid"})}
const user = await userModel.findOne({email:req.body.email})
if (user){return res.status(409).send({Success: false,message:"User Already Exsist"})}
try{
    // Bcrypt the password 
let hashPawordd = await hashPassword(req.body.password)
// console.log("Hasshed password: ",hashPawordd)  
let newUser = await userModel.create({...req.body,password:hashPawordd})
res.status(201).send({Suucess:true, message:"Registerd Successfully", data:newUser})
}
catch (error) {
    console.error('Error during registration:', error);
  }  
 }


const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ message: 'User not Registerd' });
    }

    const isMatch = await matchPassward(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid password' });
    }

    var token = jwt.sign({user:user},"shhh",{expiresIn: "1h"})
    res.status(200).send({ message: 'Logged in successfully', token });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in', error });
  }
};
module.exports = {Registration,login}