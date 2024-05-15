import mongoose from 'mongoose';
import User from './user.model.js';
import products from './product.model.js';


// const cartItemSchema = new Schema({
//     productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
//     quantity: { type: Number, required: true },
//     price: { type: Number, required: true }
//   });
  

//   const CartItem = mongoose.model('CartItem', cartItemSchema);
//   const cartSchema = new Schema({
//     user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     items: [cartItemSchema],
//     totalPrice: {
//       type: Number,
//       required: true,
//       default: 0
//     }
//   });
  
//   cartSchema.methods.calculateTotalPrice = function() {
//     this.totalPrice = this.items.reduce((total, item) => {
//       return total + item.quantity * item.price;
//     }, 0);
//     return this.totalPrice;
//   };
  
//   const Cart = mongoose.model('Cart', cartSchema);
    

// export default Cart;










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
        default: 0
    }
});

// Middleware to update the total price before saving
cartSchema.pre('save', async function(next) {
    const cart = this;

    // Fetch product details for each cart item
    const productIds = cart.cartItems.map(item => item.product);
    const products = await mongoose.model('Products').find({ '_id': { $in: productIds } });

    // Calculate the total price
    cart.totalPrice = cart.cartItems.reduce((total, item) => {
        const product = products.find(p => p._id.equals(item.product));
        return total + (product ? item.quantity * product.price : 0);
    }, 0);

    next();
});
const Cart = mongoose.model('Cart', cartSchema);


export default Cart;
