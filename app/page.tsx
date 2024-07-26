import Divider from "@/app/_components/Divider/Divider";
import BIGImage from "@/app/_components/HomePageComponents/BIGImage";
import Product1 from "@/app/_components/HomePageComponents/Product1";
import { productDataType } from "./_types/type";
import { Suspense } from "react";
import Header from "@/app/_components/HeaderComponents/Header";
import MainHeader from "./_components/HeaderComponents/MainHeader";
export default async function Home() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  const data: productDataType[] = await res.json();
  // console.log(data, "at home page");
  const promotionTshirt = data.filter((item) => item.category === "shirt");
  console.log(promotionTshirt, "promotionTshirt");
  return (
    <main className={`flex flex-col`}>
      <MainHeader />
      <BIGImage />
      <Product1 data={promotionTshirt} /> {/* Pass filtered data to Product1 */}
      <Divider />
    </main>
  );
}
