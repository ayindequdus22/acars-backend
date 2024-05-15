import express from 'express';
import { createOrGetCart, addItemToCart, removeItemFromCart, getUserCart, updateItemQuantity, clearCart } from '../controllers/cart.controller.js';
// import Cart from '../models/cart.model.js';
// import products from '../models/product.model.js';
// import User from '../models/user.model.js';
// const router = express.Router();

// // router.post('/add', addToCart);
// // router.put('/update/:cartItemId', updateCartItem);
// // router.delete('/remove/:cartItemId', removeCartItem);
// // router.delete('/clear/:userId', clearCart);
// // router.post('/:userId', async (req, res) => {
// //     const userId = req.params.userId;
// //     const { productId, quantity, price } = req.body;

// //     try {
// //       // Find the user's cart
// //       let cart = await Cart.findOne({ user: userId });
// //       if (!cart) {
// //         // If no cart exists, create a new one
// //         cart = new Cart({ user: userId, items: [], totalPrice: 0 });
// //       }

// //       // Add item to the cart
// //       cart.items.push({ productId, quantity, price });

// //       // Recalculate total price
// //       cart.calculateTotalPrice();

// //       // Save the cart
// //       await cart.save();

// //       res.status(200).json({ message: 'Item added to cart', cart });
// //     } catch (error) {
// //       res.status(500).json({ message: 'Error adding item to cart', error });
// //     }
// //   });


// const addItemToCart = async(userId, productId, quantity) => {
//     const user = await User.findById(userId);
//     const product = await products.findById(productId);
//     let cart = await Cart.findOne({ user: user._id });

//     if (!cart) {
//         cart = new Cart({ user: user._id, items: [] });
//     }

//     const cartItem = cart.items.find(item => item.product.equals(product._id));

//     if (cartItem) {
//         cartItem.quantity += quantity;
//     } else {
//         cart.items.push({ product: product._id, quantity });
//     }

//     await cart.save();
// }

// // Example usage
// const userId = "663b8be354909b81c0abf53b";
// const productId ="663b93f2462df36d15bae067";
// const quantity = 2;

// addItemToCart(userId, productId, quantity)
//     .then(() => console.log('Item added to cart'))
//     .catch(err => console.error('Error adding item to cart:', err));



// async function getCartItems(userId) {
//     try {
//         const cart = await Cart.findOne({ user: userId }).populate('items.product');

//         if (!cart) {
//             return { message: 'Cart is empty', items: [] };
//         }

//         return cart;
//     } catch (error) {
//         throw new Error('Error getting cart items: ' + error.message);
//     }
// }

// // Example usage

// getCartItems(userId)
//     .then(cart => console.log('Cart items:', cart))
//     .catch(err => console.error(err.message));

// export default router;


const router = express.Router();
router.get('/', createOrGetCart);
router.post('/add', addItemToCart);
router.post('/remove', removeItemFromCart);
router.get('/items', getUserCart);
router.post('/update', updateItemQuantity);
router.post('/clear', clearCart);

export default router;










