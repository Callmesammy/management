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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"



const formSchema = z.object({
  username: z.string().min(2).max(50, {
    message: "User Name required"
  }),
  email: z.string().min(3,{
    message: "please enter your emails"
  }),
  phone_no: z.coerce.number().min(10,{
    message: "phone number not complete"
  }),
  type: z.enum(["male", "female", "private"], {
    required_error: "Select Gender",
  }),
})

export function OtherForm() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        email: "", 
        phone_no: +234, 
        type: "private"
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-[60rem]">
          <h1 className="font-bold text-2xl"> Personal Information</h1>
           <div className="grid grid-cols-2 w-full gap-3">
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
            /></div>

<div className="grid grid-cols-2 w-full gap-3">
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


<FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3 ">
              <FormLabel>Select Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex  space-y-1 "
                >
                  <FormItem className="flex border rounded-md p-2 items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="all" />
                    </FormControl>
                    <FormLabel className="font-normal">
                    Male
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex border rounded-md p-2 items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="mentions" />
                    </FormControl>
                    <FormLabel className="font-normal">
                     Female
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-2">
                    <FormControl>
                      <RadioGroupItem value="none" />
                    </FormControl>
                    <FormLabel className="font-normal">Private</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
            

</div>

<div className="grid grid-cols-2 w-full gap-3">
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
            /></div>
            <div className="grid grid-cols-2 w-full gap-3">
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
            /></div>
          <h1 className="font-bold text-2xl"> Medical Information</h1>

            <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full bg-gray-700">
                  <SelectTrigger>
                    <SelectValue placeholder="Salect your manager" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-amber-950 ">
                  <SelectItem value="m@example.com">
                  <div className="rounded-full w-8 h-8 flex relative">
                    <Image src="/Ali.jpg" alt="picture" fill className="rounded-full object-cover"/>
                  </div> <h1 className="text-md font-semibold text-pretty">Dr. Ali Shank</h1>
                  </SelectItem>
                  <SelectItem value="m@exadddmple.com">
                  <div className="rounded-full w-8 h-8 flex relative">
                    <Image src="/Anthony.jpg" alt="picture" fill className="rounded-full object-cover"/>
                  </div> <h1 className="text-md font-semibold text-pretty">Dr. Anthony Isaiah</h1>
                  </SelectItem>
                  <SelectItem value="m@exddample.com">
                  <div className="rounded-full w-8 h-8 flex relative">
                    <Image src="/Franklin.webp" alt="picture" fill className="rounded-full object-cover"/>
                  </div> <h1 className="text-md font-semibold text-pretty">Mr. Franklin Sheriff</h1>
                  </SelectItem>
                  <SelectItem value="m@exadfdmple.com">
                  <div className="rounded-full w-8 h-8 flex relative">
                    <Image src="/Peace.png" alt="picture" fill className="rounded-full object-cover"/>
                  </div> <h1 className="text-md font-semibold text-pretty">Dr. Peace Samson</h1>
                  </SelectItem>
                  <SelectItem value="m@exerample.com">
                  <div className="rounded-full w-8 h-8 flex relative">
                    <Image src="/Ruth.webp" alt="picture" fill className="rounded-full object-cover"/>
                  </div> <h1 className="text-md font-semibold text-pretty">Mrs. Ruth Kennedy</h1>
                  </SelectItem>
                  <SelectItem value="m@examdfgple.com">
                  <div className="rounded-full w-8 h-8 flex relative">
                    <Image src="/Sindy.jpg" alt="picture" fill className="rounded-full object-cover"/>
                  </div> <h1 className="text-md font-semibold text-pretty">Miss. Sindy Jeremiah</h1>
                  </SelectItem>
                 
                </SelectContent>
                
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
          <div className="grid grid-cols-2 w-full gap-3">
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
            /></div>
            <Button disabled={isLoading} className="bg-sky-700 w-full font-semibold cursor-pointer" type="submit">{isLoading && <div>
                    <Loader2 className="animate-spin size-5"/> 
            </div> } Get Started</Button>
          </form>
        </Form>
      )
  }
  