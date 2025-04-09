import Order from "../models/order.js";

// Créer une commande
export const createOrder = async (req, res) => {
    const { user, products, totalAmount } = req.body;
    try {
        const newOrder = await Order.create({ user, products, totalAmount });
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer toutes les commandes
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "name email").populate("products.product", "name price");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
