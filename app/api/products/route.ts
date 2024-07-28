import { join } from "path";
import { promises as fs } from "fs";
import mime from "mime";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/lib/Models/ProductModel";
import { connectToDb } from "@/lib/connectToDb";
import Variant from "@/lib/Models/ProductsVariant";

export async function GET(request: Request) {
  await connectToDb();
  const fullUrl = request.url;
  const url = new URL(fullUrl);
  const searchParams = new URLSearchParams(url.search);
  // all the filters
  //!sort
  let sortPrice = searchParams.get("sort") || "asc";
  const sorted = sortPrice === "asc" ? 1 : -1;
  if (sortPrice !== "asc" && sortPrice !== "desc") {
    return sortPrice === "asc";
  }
  //!minmax value
  const minPrice = searchParams.get("minPrice") || 0;
  const maxPrice = searchParams.get("maxPrice") || Number.MAX_VALUE.toString();
  console.log({ maxPrice, minPrice });
  //! Category
  const category = searchParams.get("category");

  //build query
  let query: any = {};
  //if there is a price
  if (maxPrice || minPrice) {
    query.price = { $gte: minPrice, $lte: maxPrice };
  }
  //if there is a category
  if (category) {
    query.category = { $eq: category };
  }

  //

  const data = await Product.find(query)
    .populate({
      path: "Variants",
      model: "Variant",
    })
    .sort({ price: sorted });

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  await connectToDb();

  const formdata = await request.formData();
  const name = formdata.get("name");
  const category = formdata.get("category");
  const desc = formdata.get("desc");
  const price = formdata.get("price");
  const productSku = formdata.get("productSku");
  const Variants = formdata.get("Variants");

  let parseOption;
  const mainImage = formdata.get("mainImage") as File;
  const imageVariants = formdata.getAll("imageVariants") as Blob[];
  const image = formdata.getAll("image") as Blob[];
  // console.log({
  //   name,
  //   category,
  //   desc,
  //   price,
  //   productSku,
  //   Variants,
  //   mainImage,
  //   imageVariants,
  // });
  // Handle multiple files
  // const image = formdata.getAll("image") as Blob[];
  // console.log(image, "imageimage");
  // Validate required fields
  if (
    !mainImage ||
    !name ||
    !price ||
    !desc ||
    !category ||
    !Variants ||
    !imageVariants ||
    !image
  ) {
    return NextResponse.json({ err: "error" }, { status: 400 });
  }
  // if (
  //   !files ||
  //   files.length === 0 ||
  //   !name ||
  //   !price ||
  //   !desc ||
  //   !category ||
  //   !Variants
  // ) {
  //   return NextResponse.json({ err: "error" }, { status: 400 });
  // }

  try {
    parseOption = JSON.parse(Variants as string); //this is where we parse the JSON object from variants to JS readable text
  } catch (error) {
    console.log(error);
  }

  if (!mainImage.type.startsWith("image/")) {
    return NextResponse.json({ err: "only images allowed" }, { status: 400 });
  }

  // Ensure all files are images
  for (const file of imageVariants) {
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
  const relativeUploadDir = `/fashion image`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  const saveFile = async function (file: File, fileNamePrefix: string) {
    const originalFileName = file.name;
    // const extension = mime.getExtension(front.type);
    const uniqueFileName = `${fileNamePrefix}-${originalFileName}`;
    // const extensionBack = mime.getExtension(back.type);
    const buffer = Buffer.from(await file.arrayBuffer());
    //     // Save the file with the unique file name
    await fs.writeFile(join(uploadDir, uniqueFileName), buffer);
    return `${relativeUploadDir}/${uniqueFileName}`;
  };

  try {
  } catch (error) {}

  try {
    //this for 1 iamge
    // Ensure the directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // for (const file of files) {
    //   if (file instanceof File) {

    //this is for 1 image

    //     // Store image URL
    //     imageUrls.push(`${relativeUploadDir}/${uniqueFileName}`);
    //   }
    // }
    const imageURL = [];
    for (const file of image) {
      if (file instanceof File) {
        const fileName = file.name;
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(join(uploadDir, fileName), buffer);
        imageURL.push(`${fileName}`);
      }
    }

    const colorVariantURL = [];
    for (const file of imageVariants) {
      if (file instanceof File) {
        const fileName = file.name;
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(join(uploadDir, fileName), buffer);
        colorVariantURL.push(`${fileName}`);
      }
    }

    const [mainImageURL] = await Promise.all([
      saveFile(mainImage, "MainImage"),
      // saveFile(imageVariants, "imageVariants"),
    ]);
    // Create the product
    const dataToSend = {
      mainImage: mainImageURL,
      name,
      image: imageURL,
      category,
      productSku,
      desc,
      price,
    };
    const createdProduct = await Product.create(dataToSend);
    const variantId = [];
    for (const option of parseOption) {
      const { color, sizes, sku } = option;
      const colorVariant = colorVariantURL.filter(
        (v) => v.split("_")[0] === color,
      );
      for (const sizeObj of sizes) {
        const { size, quantity, sku } = sizeObj;
        const variantData = await Variant.create({
          product: createdProduct._id,
          size,
          color,
          quantity,
          sku,
          image: colorVariant,
        });
        // console.log(variantData)
        variantId.push(variantData._id);
      }
    }
    createdProduct.Variants = variantId;
    createdProduct.save();
    return NextResponse.json(createdProduct);
  } catch (e) {
    console.error("Error while trying to upload files\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}

// old code
// Property 'name' does not exist on type 'Blob'.ts(2339) const originalFileName = front.name;
//     const extension = mime.getExtension(front.type);
//     const uniqueFileName = `${originalFileName}`;
// import { join } from "path";
// import { promises as fs } from "fs";
// import mime from "mime";
// import { NextRequest, NextResponse } from "next/server";
// import Product from "@/lib/Models/ProductModel";
// import { connectToDb } from "@/lib/connectToDb";
// import Variant from "@/lib/Models/ProductsVariant";

// export async function GET() {
//   await connectToDb();

//   const data = await Product.find().populate({
//     path: "Variants",
//     model: "Variant",
//   });
//   console.log(data);
//   return NextResponse.json(data);
// }

// export async function POST(request: Request) {
//   await connectToDb();

//   const formdata = await request.formData();
//   const name = formdata.get("name");
//   const category = formdata.get("category");
//   const desc = formdata.get("desc");
//   const price = formdata.get("price");
//   const Variants = formdata.get("Variants");

//   let parseOption;

//   // Handle multiple files
//   // const files = formdata.getAll("file") as (File | Blob)[] | null;
//   const front = formdata.get("front") as Blob | null;
//   const back = formdata.get("back") as Blob | null;
//   // Validate required fields
//   if (!front || !back || !name || !price || !desc || !category || !Variants) {
//     return NextResponse.json({ err: "error" }, { status: 400 });
//   }
//   // if (
//   //   !files ||
//   //   files.length === 0 ||
//   //   !name ||
//   //   !price ||
//   //   !desc ||
//   //   !category ||
//   //   !Variants
//   // ) {
//   //   return NextResponse.json({ err: "error" }, { status: 400 });
//   // }

//   try {
//     parseOption = JSON.parse(Variants as string);
//   } catch (error) {
//     console.log(error);
//   }
//   console.log(parseOption, "parseOption");
//   console.log(front, "front");
//   if (!front.type.startsWith("image/")) {
//     return NextResponse.json({ err: "only images allowed" }, { status: 400 });
//   }

//   // Ensure all files are images
//   // for (const file of files) {
//   //   if (file instanceof File) {
//   //     // Check if file is of type File
//   //     const fileType = file.type;
//   //     if (!fileType.startsWith("image/")) {
//   //       return NextResponse.json(
//   //         { err: "only images allowed" },
//   //         { status: 400 },
//   //       );
//   //     }
//   //   } else {
//   //     return NextResponse.json({ err: "invalid file type" }, { status: 400 });
//   //   }
//   // }

//   // Process each file
//   // const imageUrls: string[] = [];
//   const relativeUploadDir = `/fashion image`;
//   const uploadDir = join(process.cwd(), "public", relativeUploadDir);

//   try {
//     // Ensure the directory exists
//     await fs.mkdir(uploadDir, { recursive: true });

//     // for (const file of files) {
//     //   if (file instanceof File) {
//     //     // Check if file is of type File
//     const originalFileName = front.name;
//     const extension = mime.getExtension(front.type);
//     const uniqueFileName = `${originalFileName}`;

//     //     const buffer = Buffer.from(await file.arrayBuffer());

//     //     // Save the file with the unique file name
//     //     await fs.writeFile(join(uploadDir, uniqueFileName), buffer);

//     //     // Store image URL
//     //     imageUrls.push(`${relativeUploadDir}/${uniqueFileName}`);
//     //   }
//     // }

//     // Create the product
//     const dataToSend = {
//       // image: imageUrls,
//       name,
//       category,
//       desc,
//     };
//     const createdProduct = await Product.create(dataToSend);
//     const variantId = [];
//     for (const option of parseOption) {
//       const { color, sizes, price } = option;
//       let variantPrice = { price };
//       for (const sizeObj of sizes) {
//         const { size, price, quantity } = sizeObj;
//         console.log(price, "colorrrrr");
//         const variantData = await Variant.create({
//           product: createdProduct._id,
//           size,
//           color,
//           quantity,
//           // image: imageUrls, // Assuming the first image URL for simplicity; adjust as needed
//           ...variantPrice,
//         });
//         console.log(variantData);
//         variantId.push(variantData._id);
//       }
//     }
//     createdProduct.Variants = variantId;
//     createdProduct.save();
//     return NextResponse.json("hello");
//   } catch (e) {
//     console.error("Error while trying to upload files\n", e);
//     return NextResponse.json(
//       { error: "Something went wrong." },
//       { status: 500 },
//     );
//   }
// }
