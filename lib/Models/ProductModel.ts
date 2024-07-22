import mongoose, { Model } from "mongoose";

interface ProductType {
  name: string;
  price: number;
  type: string;
  desc: string;
  image: string[];
}

const ProductsSchema = new mongoose.Schema<ProductType>({
  desc: { type: String, required: [true, "des is required"] },
  name: { type: String, required: [true, "Name is required"] },
  type: { type: String, required: [true, "Type is required"] },
  image: [String],
  price: { type: Number, required: [true, "Price is required"] },
});

const Product: Model<ProductType> =
  mongoose.models.Product ?? mongoose.model("Product", ProductsSchema);
export default Product;
