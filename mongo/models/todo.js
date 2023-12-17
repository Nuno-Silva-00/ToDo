import mongoose from "mongoose";

const toDoSchema = new mongoose.Schema({
    todo: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "USER" },
});

const TODO = mongoose.model("ToDo", toDoSchema);

export default TODO;