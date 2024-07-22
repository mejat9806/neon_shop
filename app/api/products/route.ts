import { join } from "path";
import { promises as fs } from "fs";
import mime from "mime";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/lib/Models/ProductModel";
import { connectToDb } from "@/lib/connectToDb";

export async function GET() {
  await connectToDb();

  const data = await Product.find();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  await connectToDb();

  const formdata = await request.formData();
  const name = formdata.get("name");
  const type = formdata.get("type");
  const desc = formdata.get("desc");
  const price = formdata.get("price");

  // Handle multiple files
  const files = formdata.getAll("file") as Blob[] | null;

  // Validate required fields
  if (!files || files.length === 0 || !name || !price || !desc || !type) {
    return NextResponse.json({ err: "error" }, { status: 400 });
  }

  // Ensure all files are images
  for (const file of files) {
    const fileType = file.type;
    if (!fileType.startsWith("image/")) {
      return NextResponse.json({ err: "only images allowed" }, { status: 400 });
    }
  }

  // Process each file
  const imageUrls: string[] = [];
  const relativeUploadDir = `/fashion image`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    // Ensure the directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const extension = mime.getExtension(file.type);
      const filename = `${uniqueSuffix}.${extension}`;

      // Save the file
      await fs.writeFile(join(uploadDir, filename), buffer);

      // Store image URL
      imageUrls.push(`${relativeUploadDir}/${filename}`);
    }
    // console.log(imageUrls, "imageUrls");
    // Create the product
    const dataToSend = {
      image: imageUrls,
      name,
      type,
      desc,
      price,
    };
    const createdProduct = await Product.create(dataToSend);
    console.log(createdProduct);

    return NextResponse.json(createdProduct);
  } catch (e) {
    console.error("Error while trying to upload files\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
