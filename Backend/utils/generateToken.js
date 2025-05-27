import jwt from "jsonwebtoken";

const generateToken = (userId,res) => {   
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d", // Token expiration time
    });
    res.cookie("token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true, // Prevents client-side access to the cookie
        secure: process.env.NODE_ENV === "development", // Use secure cookies in production
        sameSite: "strict", // Helps prevent CSRF attacks
    });
    return token; // Optionally return the token if needed
}
export default generateToken;
