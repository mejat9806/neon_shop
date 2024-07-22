import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | NEON",
    default: "Welcome | NEON",
  },
  description: "Home page of NEON Website home for good fashion",
};

const page = () => {
  return (
    <div className="mt-5">
      <h1>page</h1> <header>dsadadsadasdada</header>
    </div>
  );
};

export default page;
