

import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../Socket/socket.js";


export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;
   // first we find the conversation between sender and receiver
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        // if conversation does not exist, create a new one
        //its work the first time when the user send a message to another user
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        // create the message
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        // push the message to the conversation's messages array
        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }
        
        // save the conversation and the new message
         //and this will run in parallel to save the data
         await Promise.all([conversation.save(),newMessage.save()]);

        const receiversocketId = getReceiverSocketId(receiverId)
        if(receiversocketId){
            io.to(receiversocketId).emit("newMessage",newMessage)
        }




        // return the new message and conversation details
        return res.status(200).json(newMessage);


    } catch (error) {
        console.error("Error in sendMessage controller:", error.message);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}


export const getMessage = async (req, res) => {
   try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;
        

        // find the conversation between sender and receiver
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");
        
        if(!conversation) {
            return res.status(200).json([]);
        }
        const messages = conversation.messages;
        res.status(200).json(messages); // Return messages or an empty array if none found
      
   } catch (error) {
        console.error("Error in getMessage controller:", error.message);
        return res.status(500).json({ message: "Internal server error" });

   }
}