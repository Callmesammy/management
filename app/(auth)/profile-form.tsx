"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"



const formSchema = z.object({
  username: z.string().min(2).max(50, {
    message: "User Name required"
  }),
  email: z.string().min(3,{
    message: "please enter your emails"
  }),
  phone_no: z.coerce.number().min(10,{
    message: "phone number not complete"
  })
})
export function ProfileForm() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        email: "", 
        phone_no: +234
      },
    })
   
    // 2. Define a submit handler.
   async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
        try{
            const supabase = createClient()

        const { data, error } = await supabase
        .from('managements')
        .insert([values])
        .select()
        
        if(data){
          localStorage.setItem("user_email", values.email)
        toast.success("Created succefully, Please donot close page");
        router.push("/mainform")
        
        }
        if (error){
            toast.error("something went wrong")
        }
                
        }catch(error){
            console.log(error)
        }
        // ✅ This will be type-safe and validated.
      console.log(values)
    }
    return (
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[20rem]">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="Sammy Neo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} type="email" required placeholder="sammynon@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="phone_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone No</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="Phone No" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} className="bg-sky-700 w-full font-semibold cursor-pointer" type="submit">{isLoading && <div>
                    <Loader2 className="animate-spin size-5"/> 
            </div> } Get Started</Button>
          </form>
        </Form>
      )
  }
  