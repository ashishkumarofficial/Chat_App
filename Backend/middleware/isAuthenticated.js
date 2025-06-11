import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {
    try {
    const token = req.cookies.jwt;
    // console.log(token)
    if(!token){
        return res.status(401).json({ message: "User not authenticated" });
    }
    const decodedToken  =  jwt.verify(token,process.env.JWT_SECRET);
    if(!decodedToken){
        return res.status(401).json({ message: "Invalid token" });
    }

    // console.log("Token:", token);
    
    const user = await User.findById(decodedToken.userId).select("-password");
    if(!user){
        return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
    } catch (error) {
        console.error("Error in isAuthenticated middleware:", error.message);
        return res.status(500).json({ message: "Internal server error" });       
    } 
}
export default isAuthenticated;