import MainHeader from "@/app/_components/HeaderComponents/MainHeader";
import ColorProduct from "@/app/_components/Product/ColorProduct";
import ImageView from "@/app/_components/Product/ImageView";
import { productDataType, variantType } from "@/app/_types/type";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}) {
  const productId = params.productId;
  const product = await fetch(
    `http://localhost:3000/api/products/${productId}`,
  ).then((response) => response.json());
  return {
    title: product.name.toUpperCase(),
  };
}

const page = async ({
  params,
  searchParams,
}: {
  params: { productId: string };
  searchParams?: { variant?: string };
}) => {
  const { productId } = params;
  const variant = searchParams?.variant;
  console.log(variant, "searchParams");
  const data: productDataType = await fetch(
    `http://localhost:3000/api/products/${productId}`,
  ).then((res) => res.json());
  console.log(data, "dataaaa");
  const sizeVariants = await fetch(
    `http://localhost:3000/api/products/${productId}?variant=${variant}`,
  ).then((data) => data.json());
  console.log(sizeVariants, "sizeVariants");
  // const color = data.Variants.map((variant) => variant.color);
  // const size = data.Variants.map((variant) => variant.size);
  // const uniqueVariants = data.Variants.reduce((acc, variant) => {
  //   if (!acc.find((item) => item.color === variant.color)) {
  //     acc.push(variant);
  //   }
  //   return acc;
  // }, [] as variantType[]);

  // console.log(uniqueVariants, "unique variants");
  // uniqueVariants is a result from filtering the variant that may have duplicated color
  const groupedVariants = data.Variants.reduce((acc, variant) => {
    const existingGroup = acc.find((group) => group.color === variant.color);
    if (existingGroup) {
      existingGroup.sizes.push(variant);
    } else {
      acc.push({ color: variant.color, sizes: [variant], _id: variant._id });
    }
    return acc;
  }, [] as { color: string; sizes: variantType[]; _id: string }[]);

  console.log(groupedVariants, "grouped variants");
  return (
    <div className="w-full mt-20">
      <div className="grid grid-cols-[1fr_0.8fr] ">
        <ImageView productData={data} />
        <div>
          <div></div>
          <div className="flex gap-2">
            {groupedVariants.map((variant) => (
              <ColorProduct key={variant._id} variantData={variant} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
