import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to User
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Link to Product
        quantity: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "shipped", "delivered"], default: "pending" }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;