import mongoose, { Document, Model, Schema, Types } from "mongoose";

// interface SizeType {
//   size: string;
//   qty: number;
// }
// const SizeSchema = new mongoose.Schema<SizeType>({
//   size: String,
//   qty: Number,
// });
// interface ColorType {
//   color: string;
//   sizes: SizeType[];
// }
// const ColorOptionsSchema = new mongoose.Schema<ColorType>({
//   color: { type: String, required: true },
//   sizes: { type: [SizeSchema], required: true },
// });
interface ProductType extends Document {
  name: string;
  category: string;
  desc: string;
  front: string;
  back: string;
  // options: ColorType[];
  Variants: Types.ObjectId[];
}
const ProductsSchema = new mongoose.Schema<ProductType>({
  desc: { type: String, required: [true, "des is required"] },
  name: { type: String, required: [true, "Name is required"] },
  category: { type: String, required: [true, "category is required"] },
  front: { type: String, required: [true, "Image is required"] },
  back: { type: String, required: [true, "Image is required"] },
  // options: { type: [ColorOptionsSchema], required: true },
  Variants: [{ type: Schema.Types.ObjectId, ref: "Variant" }],
});

const Product: Model<ProductType> =
  mongoose.models.Product ?? mongoose.model("Product", ProductsSchema);
export default Product;

//this is called embeded DB
//the one with mongoose.ObjectID is a refrence technique
