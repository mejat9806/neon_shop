import AddToCart from "@/app/_components/Product/AddToCart";
import ColorProduct from "@/app/_components/Product/ColorProduct";
import ImageCarousel from "@/app/_components/Product/ImageCarousel";
import ImageView from "@/app/_components/Product/ImageView";
import SizeVariant from "@/app/_components/Product/SizeVariant";
import { productDataType, variantType } from "@/app/_types/type";

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
  searchParams?: { color?: string; size?: string };
}) => {
  const { productId } = params;
  const color = searchParams?.color;
  const size = searchParams?.size || "";
  const data: productDataType = await fetch(
    `http://localhost:3000/api/products/${productId}`,
  ).then((res) => res.json());
  let colorVariants: variantType[] = [];
  if (color) {
    colorVariants = await fetch(
      `http://localhost:3000/api/products/${productId}?color=${color}`,
    ).then((data) => data.json());
  }
  console.log(colorVariants, "grouped variants");

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

  // const size = groupedVariants.flatMap((size) => size.sizes);

  return (
    <div className="w-full mt-20">
      <div className="lg:grid lg:grid-cols-[1fr_0.8fr] flex flex-col  mx-9">
        <div>
          <div className="hidden lg:flex">
            <ImageView productData={data} />
          </div>
          <div className="lg:hidden">
            <ImageCarousel productData={data} />
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <h1 className="font-silkscreen  font-bold text-3xl">{data.name}</h1>
          <h1 className="text-2xl font-bold font-orbitron">{data.desc}</h1>
          <div className="flex gap-2">
            {groupedVariants.map((variant) => (
              <ColorProduct key={variant._id} variantData={variant} />
            ))}
          </div>
          <div className="flex gap-5 flex-col">
            <h1 className="font-bold font-orbitron text-2xl">Size</h1>
            <div className="flex gap-5">
              {colorVariants &&
                colorVariants.map((size) => (
                  <SizeVariant sizeData={size} key={size._id} />
                ))}
            </div>
            <AddToCart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
