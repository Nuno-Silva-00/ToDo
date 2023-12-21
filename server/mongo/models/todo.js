import mongoose from "mongoose";

const toDoSchema = new mongoose.Schema({
    todo: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "USER" },
    createdAt: { type: Date, default: new Date() },
    lastModifiedAt: { type: Date, default: new Date() },
});

const TODO = mongoose.model("ToDo", toDoSchema);

export default TODO;