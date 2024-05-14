import express from 'express';
import {
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart
} from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/add', addToCart);
router.put('/update/:cartItemId', updateCartItem);
router.delete('/remove/:cartItemId', removeCartItem);
router.delete('/clear/:userId', clearCart);

export default router;
