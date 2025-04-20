import Image from "next/image";
import Auth from "../(auth)/auth";

export default function Home() {
  return (
    <div className="flex w-full h-screen ">
    <div className=" justify-center grid grid-cols-2 w-full h-full">
      <div className="w-full h-screen flex justify-center items-center border relative">
        <Image src="/manage.jpg" alt="background" fill className="object-cover"/>
        </div>
      <div className="px-2 pt-3 flex items-center justify-center">
        <Auth/>
      </div>

    </div>
    </div>
  );
}
