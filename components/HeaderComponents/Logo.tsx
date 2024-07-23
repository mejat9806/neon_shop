import Link from "next/link";
import { useRouter } from "next/router";

const Logo = () => {
  return (
    <Link href="/" className="">
      <div className="text-white bg-transparent">Logo</div>
    </Link>
  );
};

export default Logo;
