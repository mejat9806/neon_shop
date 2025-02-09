import mongoose, { Model, Schema } from "mongoose";

interface VariantType {
  product: Schema.Types.ObjectId;
  size: "s" | "m" | "l" | "xl" | "2xl";
  color: string;
  price: number;
  quantity: number;
  sku: String;
  image: string[];
}
const VariantSchema = new mongoose.Schema<VariantType>({
  product: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
  color: { type: String, required: true },
  size: { type: String, required: true },
  sku: { type: String, required: true },
  quantity: { type: Number, required: true },
  image: { type: [String], required: true },
});

const Variant: Model<VariantType> =
  mongoose.models.Variant ?? mongoose.model("Variant", VariantSchema);

export default Variant;
