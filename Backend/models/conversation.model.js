import mongoose from "mongoose";
const coversationSchema = new mongoose.Schema({
    participants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
    }],
    messages:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
    }]
},{timestamps: true});

const Conversation = mongoose.model("Conversation", coversationSchema);

export default Conversation;
// This code defines a Mongoose schema for a conversation model in a chat application.