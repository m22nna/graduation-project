"use client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

const onlyArabic = /^[\u0621-\u064A\s]+$/;

const formSchema = z.object({
  firstName: z
    .string()
    .regex(onlyArabic, "الاسم لا يجب أن يحتوي على أرقام أو رموز")
    .min(2, "الاسم الأول يجب أن يكون حرفين على الأقل"),
  lastName: z
    .string()
    .regex(onlyArabic, "الاسم لا يجب أن يحتوي على أرقام أو رموز")
    .min(2, "الاسم الأخير يجب أن يكون حرفين على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  phone: z.string().min(10, "رقم الموبايل غير صحيح"),
  reason: z.string().min(1, "اختر سبب التواصل"),
  contactTime: z.string().optional(),
  message: z.string().min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل"),
  agree: z.boolean().refine(v => v === true, "يجب الموافقة قبل الإرسال"),
})

export default function Contact() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      reason: "",
      contactTime: "",
      message: "",
      agree: false,
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    toast.success("تم إرسال رسالتك بنجاح ✔")
    console.log(data)
  }

  return (
    <section dir="rtl" className="w-full flex justify-center mt-12 px-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-8 space-y-8">

        {/* Title */}
        <div className="text-center space-y-2">

          <h2 className="text-3xl font-bold " style={{color:"var(--main-internal-color)"}}>تواصل معنا</h2>

          {/* <h2 className="text-3xl font-bold text-green-700">تواصل معنا</h2> */}

          <p className="text-gray-500">سيتم الرد عليك خلال 24 ساعة.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="text-right max-w-sm">
                  <FormLabel>الاسم الأول</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="اكتب اسمك الأول"
                      {...field}
                      className="border-green-400 focus-visible:ring-green-700"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="text-right max-w-sm">
                  <FormLabel>الاسم الأخير</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="اكتب اسمك الأخير"
                      {...field}
                      className="border-green-400 focus-visible:ring-green-700"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-right max-w-sm">
                  <FormLabel>البريد الإلكتروني</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@mail.com"
                      {...field}
                      className="border-green-400 focus-visible:ring-green-700"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="text-right max-w-sm">
                  <FormLabel>رقم الموبايل</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="01234567890"
                      {...field}
                      className="border-green-400 focus-visible:ring-green-700"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Reason */}
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem className="text-right max-w-sm">
                  <FormLabel>سبب التواصل</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="border-green-500 bg-green-600 text-white">
                        <SelectValue placeholder="اختر سبب التواصل" />
                      </SelectTrigger>

                      <SelectContent className="bg-green-50 border border-green-300">
                        <SelectItem
                          value="question"
                          className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-green-700 hover:bg-green-100"
                        >
                          استفسار
                        </SelectItem>
                        <SelectItem
                          value="complaint"
                          className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-green-700 hover:bg-green-100"
                        >
                          شكوى
                        </SelectItem>
                        <SelectItem
                          value="suggestion"
                          className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-green-700 hover:bg-green-100"
                        >
                          اقتراح
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Contact Time */}
            <FormField
              control={form.control}
              name="contactTime"
              render={({ field }) => (
                <FormItem className="text-right max-w-sm">
                  <FormLabel>وقت مناسب للتواصل (اختياري)</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="border-green-500 bg-green-600 text-white">
                        <SelectValue placeholder="اختر الوقت" />
                      </SelectTrigger>

                      <SelectContent className="bg-green-50 border border-green-300">
                        <SelectItem
                          value="morning"
                          className="bg-white hover:bg-green-100"
                        >
                          الصباح
                        </SelectItem>
                        <SelectItem
                          value="afternoon"
                          className="bg-white hover:bg-green-100"
                        >
                          بعد الظهر
                        </SelectItem>
                        <SelectItem
                          value="evening"
                          className="bg-white hover:bg-green-100"
                        >
                          المساء
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="text-right">
                  <FormLabel>الرسالة</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="اكتب رسالتك هنا..."
                      {...field}
                      className="border-green-400 focus-visible:ring-green-700 h-32"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Agree */}
            <FormField
              control={form.control}
              name="agree"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 text-right">
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  <FormLabel className="m-0">أوافق على التواصل معي عبر الهاتف أو البريد</FormLabel>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3 rounded-xl"
            >
              إرسال
            </Button>

          </form>
        </Form>

      </div>
    </section>
  )
}
