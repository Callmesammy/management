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
import { Textarea } from "@/components/ui/textarea"



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
  managers: z.string({
    required_error: "please choose your manager"
  }),
  image: z.string({
    message: "please enter your emails"
  }),
  doc_type: z.string({
    message: "please enter your emails"
  }),
  history: z.string().min(6,{
    message: "please enter your emails"
  }),
  insurance: z.string().min(5,{
    message: "please enter your Insurance details"
  }),
  policy: z.string().min(4,{
    message: "please enter your emails"
  }),
  family: z.string().min(0,{
    message: "please enter your emails"
  }),
  other: z.string().min(4,{
    message: "please enter your emails"
  }),
  phone_nu: z.coerce.number({
    message: "Enter number"
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
        type: 'male' | 'female' | 'private',
        image: "",
        doc_type: "",
        history: "",
        insurance: "",
        policy: "",
        family: "",
        other: "",
        phone_nu: 234
      },
    })

       
    // 2. Define a submit handler.
   async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
        try{
            const supabase = createClient()

        const { data, error } = await supabase
        .from('man_documents')
        .insert([values])
        .select()
        
        if(data){
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
          <h1 className="font-bold text-2xl"> Personal Information <span className="text-red-700 text-2xl">*</span></h1>
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
                  className="  space-y-1 grid md:grid-cols-3"
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
              name="other"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Contact Name</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="Sammy Neo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="phone_nu"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone No</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading}  placeholder="sammynon@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /></div>
          <h1 className="font-bold text-2xl"> Other informations <span className="text-red-700 text-2xl">*</span></h1>

            <FormField
          control={form.control}
          name="managers"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Managers</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full bg-gray-700">
                  <SelectTrigger>
                    <SelectValue placeholder="Salect your manager" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-amber-950 ">
                  <SelectItem value="ali">
                  <div className="rounded-full w-8 h-8 flex relative">
                    <Image src="/Ali.jpg" alt="picture" fill className="rounded-full object-cover"/>
                  </div> <h1 className="text-md font-semibold text-pretty">Dr. Ali Shank</h1>
                  </SelectItem>
                  <SelectItem value="anthony">
                  <div className="rounded-full w-8 h-8 flex relative">
                    <Image src="/Anthony.jpg" alt="picture" fill className="rounded-full object-cover"/>
                  </div> <h1 className="text-md font-semibold text-pretty">Dr. Anthony Isaiah</h1>
                  </SelectItem>
                  <SelectItem value="franklin">
                  <div className="rounded-full w-8 h-8 flex relative">
                    <Image src="/Franklin.webp" alt="picture" fill className="rounded-full object-cover"/>
                  </div> <h1 className="text-md font-semibold text-pretty">Mr. Franklin Sheriff</h1>
                  </SelectItem>
                  <SelectItem value="peace">
                  <div className="rounded-full w-8 h-8 flex relative">
                    <Image src="/Peace.png" alt="picture" fill className="rounded-full object-cover"/>
                  </div> <h1 className="text-md font-semibold text-pretty">Dr. Peace Samson</h1>
                  </SelectItem>
                  <SelectItem value="ruth">
                  <div className="rounded-full w-8 h-8 flex relative">
                    <Image src="/Ruth.webp" alt="picture" fill className="rounded-full object-cover"/>
                  </div> <h1 className="text-md font-semibold text-pretty">Mrs. Ruth Kennedy</h1>
                  </SelectItem>
                  <SelectItem value="sindy">
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
              name="insurance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insurance Provider</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder=" Insurance" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="policy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insurance Policy</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading}  placeholder="enter Policy" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <div className="grid grid-cols-2 w-full gap-3">
            <FormField
              control={form.control}
              name="family"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Family history (Optional) </FormLabel>
                  <FormControl>
                  <Textarea disabled={isLoading}  placeholder="any allegies" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="history"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Past Account History </FormLabel>
                  <FormControl>
                    <Textarea disabled={isLoading}  placeholder="eg. Malarie, Ulcer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <h1 className="font-bold text-2xl"> Identification and Verification <span className="text-red-700 text-2xl">*</span></h1>
            
  <FormField
              control={form.control}
              name="doc_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What document are you submitting?</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder=" NIN, Work id, Drivers Lincense, Passport, School ID " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> 
              <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIN, Work id, Drivers Lincense, Passport, School ID</FormLabel>
                  <FormControl>
                    <div>
                   <Input accept=".pdf,.jpg,.png"  disabled={isLoading}  type="file" {...field} className="relative" />
                    </div>

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
  