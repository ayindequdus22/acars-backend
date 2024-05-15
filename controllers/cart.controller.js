import Cart from '../models/cart.model.js';
import products from '../models/product.model.js';

// Create or get the user's cart
const createOrGetCart = async (req, res) => {
    const userId = req.user.id;

    try {
        let cart = await Cart.findOne({ user: userId }).populate('cartItems.product');
        if (!cart) {
            cart = new Cart({ user: userId, cartItems: [] });
            await cart.save();
        }
        res.status(200).json("Create cart");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addItemToCart = async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const product = await products.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const cartItem = cart.cartItems.find(item => item.product.equals(productId));

        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.cartItems.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).json({message:`${productId} has been added`,cart});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeItemFromCart = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.cartItems = cart.cartItems.filter(item => !item.product.equals(productId));

        await cart.save();
        res.status(200).json({message:`${productId} has been removed`,cart});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getUserCart = async (req, res) => {
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('cartItems.product');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json({message:"Successfully fetched cart items",cart});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




const updateItemQuantity = async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const cartItem = cart.cartItems.find(item => item.product.equals(productId));

        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        cartItem.quantity = quantity;
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const clearCart = async (req, res) => {
    const userId = req.user.id;

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.cartItems = [];
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




export { addItemToCart, clearCart, getUserCart, removeItemFromCart, createOrGetCart, updateItemQuantity }

