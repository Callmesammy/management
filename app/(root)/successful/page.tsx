import React, { useEffect, useState } from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { createClient } from "@/utils/supabase/client";

interface document{
    id: number, 
    managers: string
}
export function BackgroundLine() {
    useEffect(()=>{
        fileAdd()
    },[])
    const [addfile, setAddFile] = useState<document[]>()

    const fileAdd=async()=>{
        const supabase = await createClient()
        const {data, error} = await supabase.from("man_documents").select("*")
        if(data){
            setAddFile(data)
        }else{
            console.log("something went wrong", error)
        }
    }
  return (
    <>
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Congratulations <br /> and thanks for booking {addfile?.map((do)=>(
            <div key={do.id}>
                {do.managers}
            </div>
        ))}
        
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        we will get back to your shorly 
      </p>
      
    </BackgroundLines>
    
    </>
  );
}
