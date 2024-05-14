import Cart from '../models/cart.model.js';

const createCart =async (req, res) => {
    const { userId, items } = req.body;
    try {
        const cart = new Cart({ userId, items });
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};