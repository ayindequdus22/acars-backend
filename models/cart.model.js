import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the schema for cart items
const CartItemSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

// Define the schema for the shopping cart
const CartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [CartItemSchema],
    totalPrice: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Pre-save hook to update timestamps and calculate total price
CartSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    this.totalPrice = this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    next();
});

const Cart = mongoose.model('Cart', CartSchema);




// const cartSchema = mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//     },
//     cartItems: [{
//         product: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Product",
//             required: true,
//         },
//         quantity: {
//             type: Number,
//             required: true,
//             min: 1,
//         }
//     }]
// }, { timestamps: true });

// const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
