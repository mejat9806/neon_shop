import CanvasDivider from "@/components/Divider/CanvasDivider";
import Divider from "@/components/Divider/Divider";
import BIGImage from "@/components/HomePageComponents/BIGImage";
import Product1 from "@/components/HomePageComponents/Product1";
export default async function Home() {
  const data = await fetch("http://localhost:3000/api/products").then((res) =>
    res.json(),
  );
  console.log(data);
  return (
    <main className={`flex flex-col `}>
      <BIGImage />
      <Product1 />
      <Divider />
    </main>
  );
}
