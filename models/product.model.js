import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    name: {
        type: String
    },
      image: {
        type: String
    },
    price: {
        type: Number
    },
  
},	{ timestamps: true })
const products = mongoose.model("Products",productSchema);
export default products;