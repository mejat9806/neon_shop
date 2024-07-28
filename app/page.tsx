import Divider from "@/app/_components/Divider/Divider";
import BIGImage from "@/app/_components/HomePageComponents/BIGImage";
import Product1 from "@/app/_components/HomePageComponents/Product1";
import MainHeader from "./_components/HeaderComponents/MainHeader";
import { productDataType } from "./_types/type";
import ProductShowCase from "./_components/HomePageComponents/ProductShowCase";
import Link from "next/link";
import ButtonWithMotion from "./_components/UI components/ButtonWithMotion";
export default async function Home() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  const data: productDataType[] = await res.json();
  console.log(data, "at home page");
  const promotionTshirt = data.filter((item) => item.category === "shirt");
  // console.log(promotionTshirt, "promotionTshirt");
  return (
    <main className={`flex flex-col`}>
      <div className="relative">
        <BIGImage />
        <ButtonWithMotion
          type="link"
          linkHref="/products"
          linkName="shop now"
          className="absolute top-[70%] left-[50%] -translate-x-1/2 transform font-silkscreen"
        >
          Shop Now
        </ButtonWithMotion>{" "}
      </div>

      <MainHeader />
      <ProductShowCase data={promotionTshirt} SectionName="T-shirt" />
      <Divider />
    </main>
  );
}
