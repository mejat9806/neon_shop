import Header from "../_components/HeaderComponents/Header";
import MainHeader from "../_components/HeaderComponents/MainHeader";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
      <MainHeader />{" "}
      <div className="py-10  flex justify-center items-center w-svw overflow-hidden">
        {children}
      </div>
    </section>
  );
}
