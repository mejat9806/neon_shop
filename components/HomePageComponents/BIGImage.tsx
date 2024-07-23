import Image from "next/image";
import ButtonWithMotion from "../UI components/ButtonWithMotion";

const BIGImage = () => {
  return (
    <div className="font-silkscreen overflow-hidden -z-10">
      <div className="flex h-screen ">
        <div className="flex w-svw relative">
          <div className="w-1/2  relative">
            <Image
              src="https://images.pexels.com/photos/1480691/pexels-photo-1480691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="image"
              fill
              className="object-cover "
            />
          </div>
          <div className="w-1/2 relative">
            <Image
              src="https://images.pexels.com/photos/26584711/pexels-photo-26584711/free-photo-of-portrait-of-woman-on-a-balcony-at-night.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="object-cover "
              fill
              alt="image"
            />
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
