import Header from "../_components/HeaderComponents/Header";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="py-10  flex justify-center items-center h-svh">
      <Header />
      {children}
    </section>
  );
}
