import BIGImage from "@/components/HomePageComponents/BIGImage";
import Product1 from "@/components/HomePageComponents/Product1";
export default function Home() {
  return (
    <main className={`flex flex-col `}>
      <BIGImage />
      <Product1 />
    </main>
  );
}
