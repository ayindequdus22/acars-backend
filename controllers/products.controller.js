import products from "../models/product.model.js"

export const createProduct = async(req,res)=>{
const newProducts = new products(req.body)
await newProducts.save();
return res.status(200).json({message:"Created products"})
}
export const getAllProducts = async(req,res)=>{
const product =  await products.find().sort({createdAt:+1}).select("_id name image price");
return res.status(200).json(product)
}
