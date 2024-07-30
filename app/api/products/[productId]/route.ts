import { connectToDb } from "@/lib/connectToDb";
import Product from "@/lib/Models/ProductModel";
import Variant from "@/lib/Models/ProductsVariant";
import { ObjectId } from "mongoose";
import { NextResponse } from "next/server";

interface NextParams {
  productId: string;
  variantId: string;
}
export async function GET(
  request: Request,
  { params }: { params: NextParams },
) {
  await connectToDb();
  console.log(params, "paramsssss");
  const { productId } = params; //this is for normal params

  const url = new URL(request.url);
  const color = url.searchParams.get("color");
  const size = url.searchParams.get("size");
  console.log(color, size, "colorrrrr");
  let data;
  data = await Product.findById(productId).populate({
    path: "Variants",
    model: "Variant",
    populate: { path: "product", model: "Product", select: "-__v" },
  });
  if (!data) {
    NextResponse.json("no data found");
  }
  if (color && size) {
    const variantdata = await Variant.find({
      color: color,
      size: size.toUpperCase(),
    }).populate({ path: "product", model: "Product", select: "-Variants" });
    console.log(variantdata, color, size, "variantIdcheck");
    return NextResponse.json(variantdata);
  }
  if (color) {
    const variantdata = await Variant.find({
      color: color,
    });
    console.log(variantdata, color, "variantIdcheck");
    return NextResponse.json(variantdata);
  }
  if (size) {
    const variantdata = await Variant.find({
      color: color,
      size: size.toUpperCase(),
    });
    console.log(variantdata, color, "variantIdcheck");
    return NextResponse.json(variantdata);
  }
  console.log(data);
  return NextResponse.json(data);
}
