import mongoose from "mongoose";

const shoppingSchema = new mongoose.Schema({
    item: { type: String, required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: new Date() },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "USER" },
});

const SHOPPING = mongoose.model("Shopping", shoppingSchema);

export default SHOPPING;