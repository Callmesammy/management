import Image from "next/image";
import { MdOutlineWavingHand } from "react-icons/md";

const Auth = () => {
    
    return ( 
        <div className="flex w-full h-screen justify-center space-y-3 flex-col">
            <div className=" space-x-2 items-center flex w-full h-full">
                <Image src="/log.png" alt="logo" width={70} height={100} className="flex"/> 
            <h1 className="font-bold text-xl  "> Managing it</h1>    </div>            
        <div className="flex space-x-2 ">
          <h1 className="font-bold text-2x1"> Hi there</h1> <MdOutlineWavingHand className=" animate-spin transition-transfrom duration-500 ease-in-out " />

        </div>
        </div>
     );
}
 
export default Auth;