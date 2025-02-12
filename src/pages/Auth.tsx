import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod"
import { loginSchema, registerSchema } from "@/schema/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
const initValue = {
    email: "",
    password: ""
}
export default function Auth(): React.JSX.Element {
    const { type } = useParams()
    const isLogin = type == "login"
    const schema = isLogin ? loginSchema : registerSchema
    const defaultValue = isLogin ? initValue : { ...initValue, name: "" }
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: defaultValue
    });
    const navigate = useNavigate()
    const { dispatch, loginThunk } = useAuth()
    const onSubmit = async (data: z.infer<typeof schema>) => {
        try {
            await dispatch(loginThunk({ username: data.email, password: data.password })).unwrap()
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }

    return <div className="flex items-center md:flex-row flex-col justify-between">
        <img loading="lazy" src="/assets/auth.png" alt="" className="w-4/7 h-full object-contain hidden md:block" />
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 lg:w-2/7 w-full shadow-lg px-10 py-20">
                <h2 className="text-4xl font-medium">{type == "login" ? "Log in to Exclusive" : "Create an account"}</h2>
                {type != "login" && <span className="text-base font-medium block">Just for testing, doest not have regiser now</span>}
                {type == "login" && <span className="text-base font-medium block">Enter your details below</span>}
                {type != "login" && <FormField
                    control={form.control}
                    name={"name" as keyof z.infer<typeof schema>}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base text-black/40">Name</FormLabel>
                            <FormControl>
                                <Input className=" bg-neutral-200 rounded-sm
                                focus:bg-white border-[1px] border-solid border-neutral-200
                                focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none" {...field} />
                            </FormControl>
                            <FormMessage className="text-[#DB4444]" />
                        </FormItem>
                    )}
                />}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base text-black/40">Email</FormLabel>
                            <FormControl>
                                <Input className=" bg-neutral-200 rounded-sm
                                focus:bg-white border-[1px] border-solid border-neutral-200
                                focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none" {...field} />
                            </FormControl>
                            <FormMessage className="text-[#DB4444]" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base text-black/40">Password</FormLabel>
                            <FormControl>
                                <Input className=" bg-neutral-200 rounded-sm
                                focus:bg-white border-[1px] border-solid border-neutral-200
                                focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none" {...field} />
                            </FormControl>
                            <FormMessage className="text-[#DB4444]" />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-[#DB4444] hover:opacity-75 text-white w-full mt-10 cursor-pointer">{type == "login" ? "Login" : "Create Account"}</Button>
                {type == "register" && <span className="block text-center">Already have account? <Link className="underline font-bold" to={"/auth/login"}>Login</Link></span>}
                {type == "login" && <span className="block text-center">Not have account? <Link className="underline font-bold" to={"/auth/register"}>Register</Link></span>}
            </form>
        </Form>

    </div>
}