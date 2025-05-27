import mongoose from "mongoose";

const mongooseSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    gender: {
        type: String,
        required: true,
        enum:["Male","Female"],
    },
    profilePic:{
        type: String,
        default: ""
    }

},{timestamps: true});

const User = mongoose.model("User", mongooseSchema);
export default User;