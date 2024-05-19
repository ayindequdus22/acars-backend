import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartItems: [cartItemSchema],
    totalPrice: {
        type: Number,
        required: true,
        default: 0, min: 0
    },
    totalQuantity: {
        type: Number,
        required: true,
        default: 0,
        min: 0 // Ensure the total quantity is not negative
    }
});

// // Middleware to update the total price before saving
// cartSchema.pre('save', async function (next) {
//     const cart = this;
//     // Fetch product details for each cart item
//     const productIds = cart.cartItems.map(item => item.product);
//     const products = await mongoose.model('Products').find({ '_id': { $in: productIds } });

//     // Calculate the total price
//     cart.totalPrice = cart.cartItems.reduce((total, item) => {
//         const product = products.find(p => p._id.equals(item.product));
//         return total + (product ? item.quantity * product.price : 0);
//     }, 0);

//     next();
// });


// Middleware to update the total price and total quantity before saving
cartSchema.pre('save', async function(next) {
    const cart = this;

    // Check if cartItems is modified
    if (cart.isModified('cartItems')) {
        // Fetch product details for each cart item
        const productIds = cart.cartItems.map(item => item.product);
        const products = await mongoose.model('Products').find({ '_id': { $in: productIds } });

        // Calculate the total price and total quantity
        let totalPrice = 0;
        let totalQuantity = 0;

        cart.cartItems.forEach(item => {
            const product = products.find(p => p._id.equals(item.product));
            if (product) {
                totalPrice += item.quantity * product.price;
                totalQuantity += item.quantity;
            }
        });

        cart.totalPrice = totalPrice;
        cart.totalQuantity = totalQuantity;
    }

    next();
});
const Cart = mongoose.model('Cart', cartSchema);


export default Cart;
