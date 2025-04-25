import Image from "next/image";
import { MdOutlineWavingHand } from "react-icons/md";
import { ProfileForm } from "./profile-form";
import Link from "next/link";

const Auth = () => {
  return (
    <div className="flex w-full h-screen justify-center space-y-3 flex-col"> 
    <Link href={"/mainform"} className="p-2 px-auto bg-sky-900 w-[8rem] rounded flex justify-center hover:bg-sky-950 items-center"> Continue</Link>
      <div className="  items-center justify-center flex w-full h-screen flex-col">
        <div className="flex space-x-2 items-center w-full justify-center ">
          <Image
            src="/log.png"
            alt="logo"
            width={70}
            height={100}
            className="flex"
          />
          <h1 className="font-bold text-xl  "> Managing it</h1>
        </div>

        <div className="flex items-center space-x-2 pt-7 pr-[6rem] w-full justify-center">
          <h1 className="font-bold text-4x1 flex"> Hi there</h1>{" "}
          <MdOutlineWavingHand className=" size-6 flex   transition-transfrom duration-500 ease-in-out hover:rotate-3 text-amber-400" />{" "}
        </div>
        <p className="text-gray-300 text-sm ">Get started with appointments.</p>
        <div className="flex pt-4  w-full items- justify-center">
            <ProfileForm/>
        </div>
        
      </div>
      
    </div>
  );
};

export default Auth;
