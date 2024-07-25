import Link from "next/link";
import { useRouter } from "next/router";

const Logo = () => {
  return (
    <Link href="/" className="">
      <div className="bg-transparent mix-blend-difference">Logo</div>
    </Link>
  );
};

export default Logo;
