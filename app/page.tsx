import CanvasDivider from "@/components/Divider/CanvasDivider";
import Divider from "@/components/Divider/Divider";
import BIGImage from "@/components/HomePageComponents/BIGImage";
import Product1 from "@/components/HomePageComponents/Product1";
export default function Home() {
  return (
    <main className={`flex flex-col `}>
      <BIGImage />
      <CanvasDivider />
      <Product1 />
    </main>
  );
}
