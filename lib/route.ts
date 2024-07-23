import { join } from "path";
import { promises as fs } from "fs";
import mime from "mime";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/lib/Models/ProductModel";
import { connectToDb } from "@/lib/connectToDb";

export async function GET() {
  await connectToDb();

  const data = await Product.find();
  console.log(data);
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  await connectToDb();

  const formdata = await request.formData();
  const name = formdata.get("name");
  const type = formdata.get("type");
  const desc = formdata.get("desc");
  const price = formdata.get("price");
  const options = formdata.get("options");

  let parseOption;

  // Handle multiple files
  const files = formdata.getAll("file") as (File | Blob)[] | null;
  // Validate required fields
  if (
    !files ||
    files.length === 0 ||
    !name ||
    !price ||
    !desc ||
    !type ||
    !options
  ) {
    return NextResponse.json({ err: "error" }, { status: 400 });
  }

  try {
    parseOption = JSON.parse(options as string);
  } catch (error) {
    console.log(error);
  }

  // Ensure all files are images
  for (const file of files) {
    if (file instanceof File) {
      // Check if file is of type File
      const fileType = file.type;
      if (!fileType.startsWith("image/")) {
        return NextResponse.json(
          { err: "only images allowed" },
          { status: 400 },
        );
      }
    } else {
      return NextResponse.json({ err: "invalid file type" }, { status: 400 });
    }
  }

  // Process each file
  const imageUrls: string[] = [];
  const relativeUploadDir = `/fashion image`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    // Ensure the directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    //this will run for each of the file in the files // first create name then convert to buffer then save to next public folder // the add the url in the image url array
    for (const file of files) {
      if (file instanceof File) {
        // Check if file is of type File
        const originalFileName = file.name;
        const extension = mime.getExtension(file.type);
        const uniqueFileName = `${originalFileName}`;

        const buffer = Buffer.from(await file.arrayBuffer());

        // Save the file with the unique file name
        await fs.writeFile(join(uploadDir, uniqueFileName), buffer);

        // Store image URL
        imageUrls.push(`${relativeUploadDir}/${uniqueFileName}`);
      }
    }

    // Create the product
    const dataToSend = {
      image: imageUrls,
      name,
      type,
      desc,
      price,
      options: parseOption,
    };
    const createdProduct = await Product.create(dataToSend);

    return NextResponse.json(createdProduct);
  } catch (e) {
    console.error("Error while trying to upload files\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
