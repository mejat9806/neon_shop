import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}) {
  const productId = params.productId;
  console.log(productId);
  const product = await fetch(
    `http://localhost:3000/api/products/${productId}`,
  ).then((response) => response.json());
  console.log(product, " productMetadata");
  return {
    title: product.name.toUpperCase(),
  };
}

const page = ({ params }: { params: string }) => {
  console.log(params);
  return (
    <div className="mt-5">
      <h1>page</h1> <header>dsadadsadasdada</header>
    </div>
  );
};

export default page;
