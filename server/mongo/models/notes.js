import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    note: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "USER" },
    createdAt: { type: Date, default: new Date() },
});

const NOTE = mongoose.model("Note", noteSchema);

export default NOTE;