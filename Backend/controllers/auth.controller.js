import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";


export const signup = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// https://avatar-placeholder.iran.liara.run/

		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});

		if (newUser) {
			// Generate JWT token here
			generateToken(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
        status:true,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};



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
    //   console.log("users",user.fullName)
      // Generate token and send response
       generateToken(user._id, res); // Assuming generateToken is defined elsewhere
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
        message: "Login successful",
      });
} catch (error) {
   console.log("Error in login controller:", error.message);
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
