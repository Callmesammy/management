"use client"
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineWavingHand } from "react-icons/md";

interface Details{
email: string,
username: string,
phone_no: number,
id: number

}

const Welcome = () => {
    const [details, setDetails] = useState<Details[]>([]); 

    useEffect(()=>{
        
        addDetails()
    },[])
    const addDetails = async()=>{
        const email = localStorage.getItem("user_email")

        const supabase = createClient()
        const {data, error} = await supabase.from("managements").select("*").eq("email", email)
        if(data){
            setDetails(data as Details[])
        }else if(error){
            console.log("something went wrong", error)
        }
    }

    return ( 
        <div className="w-full  pt-2 flex justify-center flex-col items-center">
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
        {details.map((doc)=>(

             <div key={doc.id} className="flex text-white items-center space-x-2 pt-7  w-full justify-center">
          <h1 className="font-bold text-3xl flex"> Welcome </h1>{" "}
          <MdOutlineWavingHand className=" size-7 flex   transition-transfrom duration-500 ease-in-out hover:rotate-3 text-amber-400" />{" "}  <h1 className="font-semibold"> {doc.username} </h1> 
        </div> 
        ))}
             
        <p className="text-sm text-gray-500">Let us know more about you</p>

         </div>
     );
}
 
export default Welcome;