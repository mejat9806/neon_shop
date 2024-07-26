import MainHeader from "@/app/_components/HeaderComponents/MainHeader";
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
  console.log(product, "productIDDD");
  return {
    title: product.name.toUpperCase(),
  };
}

const page = async ({ params }: { params: { productId: string } }) => {
  const { productId } = params;
  const data = await fetch(
    `http://localhost:3000/api/products/${productId}`,
  ).then((res) => res.json());
  console.log(data, "in fecth");
  return (
    <div className="mt-5 overflow-hidden">
      <h1>page</h1> <header>dsadadsadasdada</header>
    </div>
  );
};

export default page;
