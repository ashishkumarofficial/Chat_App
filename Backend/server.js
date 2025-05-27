import express from "express";
import dotenv from "dotenv";
import authRoutes from "./router/auth.routes.js"; 
import messagesRoutes from "./router/messages.routes.js"; 
import userRoutes from "./router/user.routes.js"; 
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
// app.use();
const PORT = process.env.PORT || 5000;

app.use("/api/auth",authRoutes)
app.use("/api/messages",messagesRoutes);
app.use("/api/users",userRoutes);
// app.get("/", (req, res) => { 
//   res.send("Hello from server!");
 
// });




app.listen(PORT, () => {
   connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});

