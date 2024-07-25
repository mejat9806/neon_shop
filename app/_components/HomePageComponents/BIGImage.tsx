import Image from "next/image";
import ButtonWithMotion from "../UI components/ButtonWithMotion";
import maskBG from "@/public/image/mask_bg.webp";
import GirlBG from "@/public/image/girl_bg.webp";
const BIGImage = () => {
  return (
    <div className="font-silkscreen overflow-hidden -z-10">
      <div className="flex h-screen ">
        <div className="flex w-svw relative">
          <div className="md:w-1/2 w-full   relative">
            <Image
              src={maskBG}
              alt="image"
              fill
              className="object-cover "
              quality={80}
              placeholder="blur"
            />
          </div>
          <div className="w-1/2 relative hidden md:flex ">
            <Image src={GirlBG} className="object-cover " fill alt="image" />
          </div>
          <div className="absolute top-1/2  flex justify-center items-center w-full flex-col">
            <h1 className="font-tiny5 text-9xl text-white ">
              Vibe
              <span className="selection:bg-red-200 text-red-400">Feel</span>
            </h1>
            <ButtonWithMotion
              type="link"
              linkHref="/products"
              linkName="shop now"
            >
              Shop Now
            </ButtonWithMotion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BIGImage;
