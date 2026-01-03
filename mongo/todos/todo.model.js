import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
 title:{
    type: String,
    required: true,
 },
 completed:{
    type: Boolean,
    default: false,
 },
 createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
 },
 subTodos: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subToDo"
    }
 ]
},{timestamps: true});

export const toDo = mongoose.model("to-do", todoSchema);