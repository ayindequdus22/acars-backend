import products from "../models/product.model.js";
const getOverView =  async(req, res) => {
    try {
        const overviews = (await products.find()).slice(0,4)
        // limit(4).exec();
   return res.status(200).send(overviews) 
    } catch (error) {
       return res.status(500).json("Internal server error")
    }
  
  
}
export default getOverView;