export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="  flex justify-center items-center max-w-4xl h-svh overflow-hidden w-full mx-auto">
      {children}
    </section>
  );
}
