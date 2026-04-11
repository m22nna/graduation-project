"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFeedback } from "@/features/useFeedback";

const nameRegex = /^[\u0621-\u064A\sA-Za-z]+$/;

const formSchema = z.object({
    fullName: z
        .string()
        .regex(nameRegex, "Full name must only contain Arabic or English letters")
        .min(2, "Full name must be at least 2 characters"),
    email: z.string()
        .email("Invalid email address"),
    phone: z.string().min(10, "Invalid phone number"),
    reason: z.string().min(1, "Please select a reason"),
    timeSlot: z.string().min(1, "Please select a time slot"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    comment: z.string().optional(),
    ratingId: z.coerce.number().min(1, "Please select a rating").max(5),
    agree: z.boolean().refine((v) => v === true, "You must agree before submitting"),
});

export default function Contact() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            reason: "",
            timeSlot: "",
            message: "",
            comment: "",
            ratingId: 5,
            agree: false,
        },
    });

    const mutation = useFeedback(() => form.reset());

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        const payload = {
            fullName: data.fullName,
            email: data.email,
            phoneNumber: data.phone,
            reason: data.reason,
            // Convert '2026-03-14T10:00' to '2026-03-14 10:00' format
            timeSlot: data.timeSlot.replace("T", " "),
            message: data.message,
            comment: data.comment || "",
            ratingId: data.ratingId,
            userProfileId: 3,
            routeId: 12,
            tripStatusId: 2,
        };

        mutation.mutate(payload);
    };

    return (
        <section dir="rtl" className="w-full flex justify-center mt-12 px-4">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-8 space-y-8">
                {/* Title */}
                <div className="text-center space-y-2">
                    <h2
                        className="text-3xl font-bold "
                        style={{ color: "var(--main-internal-color)" }}
                    >
                        تقييم خدمة النقل / تواصل معنا
                    </h2>
                    <p className="text-gray-500">
                        رأيك يهمنا، دعنا نعرف كيف كانت رحلتك!
                    </p>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Full Name */}
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem className="text-right">
                                    <FormLabel>الاسم بالكامل</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="الاسم الثلاثي..."
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
                                <FormItem className="text-right">
                                    <FormLabel>البريد الإلكتروني</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
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
                                <FormItem className="text-right">
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

                        {/* Rating */}
                        <FormField
                            control={form.control}
                            name="ratingId"
                            render={({ field }) => (
                                <FormItem className="text-right">
                                    <FormLabel>تقييم الرحلة (من 1 إلى 5)</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                                            <SelectTrigger className="border-green-500 bg-green-600 text-white">
                                                <SelectValue placeholder="اختر التقييم" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-green-50 border border-green-300">
                                                <SelectItem value="5" className="bg-white hover:bg-green-100">⭐️⭐️⭐️⭐️⭐️ ممتازة</SelectItem>
                                                <SelectItem value="4" className="bg-white hover:bg-green-100">⭐️⭐️⭐️⭐️ جيدة جداً</SelectItem>
                                                <SelectItem value="3" className="bg-white hover:bg-green-100">⭐️⭐️⭐️ جيدة</SelectItem>
                                                <SelectItem value="2" className="bg-white hover:bg-green-100">⭐️⭐️ مقبولة</SelectItem>
                                                <SelectItem value="1" className="bg-white hover:bg-green-100">⭐️ سيئة</SelectItem>
                                            </SelectContent>
                                        </Select>
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
                                <FormItem className="text-right">
                                    <FormLabel>سبب التواصل / التقييم</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger className="border-green-500 bg-green-600 text-white">
                                                <SelectValue placeholder="اختر سبب التقييم" />
                                            </SelectTrigger>

                                            <SelectContent className="bg-green-50 border border-green-300">
                                                <SelectItem value="تقييم الرحلة" className="bg-white hover:bg-green-100">تقييم الرحلة</SelectItem>
                                                <SelectItem value="استفسار" className="bg-white hover:bg-green-100">استفسار</SelectItem>
                                                <SelectItem value="شكوى" className="bg-white hover:bg-green-100">شكوى</SelectItem>
                                                <SelectItem value="اقتراح" className="bg-white hover:bg-green-100">اقتراح</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-red-600" />
                                </FormItem>
                            )}
                        />

                        {/* Time Slot */}
                        <FormField
                            control={form.control}
                            name="timeSlot"
                            render={({ field }) => (
                                <FormItem className="text-right">
                                    <FormLabel>وقت وتاريخ الرحلة</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="datetime-local"
                                            {...field}
                                            className="border-green-400 focus-visible:ring-green-700"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-600" />
                                </FormItem>
                            )}
                        />

                        {/* Message */}
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem className="text-right">
                                    <FormLabel>تفاصيل التقييم / الرسالة</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="اكتب ملاحظاتك..."
                                            {...field}
                                            className="border-green-400 focus-visible:ring-green-700 h-24"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-600" />
                                </FormItem>
                            )}
                        />

                        {/* Comment */}
                        <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                                <FormItem className="text-right">
                                    <FormLabel>تعليق إضافي عن السائق أو المواصلات (اختياري)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="مثال: السائق محترم والمواصلات نظيفة"
                                            {...field}
                                            className="border-green-400 focus-visible:ring-green-700 h-24"
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
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    <FormLabel className="m-0">
                                        أوافق على التواصل معي بشأن هذا التقييم
                                    </FormLabel>
                                    <FormMessage className="text-red-600" />
                                </FormItem>
                            )}
                        />

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={mutation.isPending}
                            className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3 rounded-xl disabled:opacity-50"
                        >
                            {mutation.isPending ? "جاري الإرسال..." : "إرسال التقييم"}
                        </Button>
                    </form>
                </Form>
            </div>
        </section>
    );
}
