import mongoose from "mongoose";

const shoppingSchema = new mongoose.Schema({
    item: { type: String, required: true },
    amount: { type: Number },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "USER" },
    createdAt: { type: Date, default: new Date() },
    lastModifiedAt: { type: Date, default: new Date() },
});

const SHOPPING = mongoose.model("Shopping", shoppingSchema);

export default SHOPPING;