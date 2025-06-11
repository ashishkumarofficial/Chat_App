import express from "express";
import dotenv from "dotenv";
import authRoutes from "./router/auth.routes.js"; 
import messagesRoutes from "./router/messages.routes.js"; 
import userRoutes from "./router/user.routes.js"; 
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";
// import cors from "cors"; // Importing CORS for handling cross-origin requests
import { app, server } from "./Socket/socket.js";
import path from "path"  

const PORT = process.env.PORT || 5000;
 
const _dirname =path.resolve();
console.log(_dirname);

dotenv.config();
app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true // if you're using cookies/auth
// }));



app.use("/api/auth",authRoutes)
app.use("/api/messages",messagesRoutes);
app.use("/api/users",userRoutes);

  app.use(express.static(path.join(_dirname,"/Frontend/dist")));
  
app.get("/*", (req, res) => {
  res.sendFile(path.join(_dirname, "Frontend", "dist", "index.html"));
});


server.listen(PORT, () => {
   connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});

