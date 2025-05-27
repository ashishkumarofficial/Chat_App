import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";


export const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      if(!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }
      // Logic for user login
      const user = await User.findOne({username});
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
     const isPasswordValid = await bcrypt.compare(password, user?.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      // Generate token and send response
       generateToken(user._id, res); // Assuming generateToken is defined elsewhere
      res.status(200).json({
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        profilePic: user.profilePic,
        message: "Login successful",
      });
} catch (error) {
   console.log("Error in login controller:", error.message);
    res.status(500).json({ message: "Internal server error" });  
}
};

export const signup = async (req, res) => {
  try {
       const {fullname,username,confirmPassword, password, gender } = req.body;
     if(password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
     }

    // Logic for user signup
    
    const user = await User.findOne({username});
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    //bcrypt the password
    const hashedPassword = await bcrypt.hash(password, 10,); 

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      password : hashedPassword,
      gender,
      profilePic: gender === "Male" ? boyProfilePic : girlProfilePic,
    });

     if(newUser){
       await generateToken(newUser._id, res); // Assuming generateToken is defined elsewhere
        await newUser.save();
        res.status(201).json({ 
        _id :newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilePic,

    });
}
    else {
      res.status(400).json({ error: "Invalid user data" });
    }

  } catch (error) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
    
  }
};

export const logout = async (req, res) => {
 try {
   res.cookie("token","",{
    maxAge:0
   })
   res.status(200).json({massage:"User Logout Successfully"})
 } catch (error) {
   console.log("Error in logged-out controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
 }
};
