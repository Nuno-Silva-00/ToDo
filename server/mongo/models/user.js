import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, requidred: true },
    password: { type: String, required: true },
    allToDos: [{ type: mongoose.Schema.Types.ObjectId, ref: "ToDo" }],
    allItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shopping" }],
    // allNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Notes" }]
});

const USER = mongoose.model("User", UserSchema);
export default USER;