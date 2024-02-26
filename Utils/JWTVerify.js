
const jwt = require("jsonwebtoken")
let verify= async (req, res, next) => {
  try {
    let token = req.headers.token
    if (!token) {return res.status(400).send({ success: false, message: "Token not found" });}
    var check = await jwt.verify(token,"shhh")
    if(!check) {return res.status(400).send({ success: false, message: "Login Please" })}
    req.createdBy  = check.user._id
 
    next();
  } catch (error) {
    res.status(400).send({ success: false, message: "Crashed Token" })
    console.log("Error Occured",error)
  }
};
module.exports = verify;

