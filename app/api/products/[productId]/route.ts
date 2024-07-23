import { connectToDb } from "@/lib/connectToDb";
import Product from "@/lib/Models/ProductModel";
import { NextResponse } from "next/server";

interface NextParams {
  productId: string;
}
export async function GET(
  request: Request,
  { params }: { params: NextParams },
) {
  await connectToDb();
  const { productId } = params;
  const data = await Product.findById({ _id: productId });
  return NextResponse.json(data);
}
