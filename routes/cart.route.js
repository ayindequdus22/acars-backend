import express from 'express';
import { createOrGetCart, addItemToCart, removeItemFromCart, getUserCart, updateItemQuantity, clearCart } from '../controllers/cart.controller.js';

const router = express.Router();
router.get('/', createOrGetCart);
router.post('/add', addItemToCart);
router.post('/remove', removeItemFromCart);
router.get('/items', getUserCart);
router.post('/update', updateItemQuantity);
router.post('/clear', clearCart);

export default router;










