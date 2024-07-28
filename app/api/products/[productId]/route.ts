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
  const variantId = url.searchParams.get("variant");
  console.log(variantId, "variantId");
  let data;
  data = await Product.findById(productId).populate({
    path: "Variants",
    model: "Variant",
    populate: { path: "product", model: "Product", select: "-__v" },
  });
  if (!data) {
    NextResponse.json("no data found");
  }
  if (variantId) {
    const variantdata = await Variant.findById(variantId);
    console.log(variantdata, variantId, "variantIdcheck");
    return NextResponse.json(variantdata);
  }
  console.log(data);
  return NextResponse.json(data);
}
