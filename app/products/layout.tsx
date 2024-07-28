import MainHeader from "../_components/HeaderComponents/MainHeader";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
      <MainHeader />
      <div className="">{children}</div>
    </section>
  );
}
