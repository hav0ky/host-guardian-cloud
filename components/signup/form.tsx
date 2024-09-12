"use client"

import * as React from "react"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { registerSchema } from "@/types/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

type Input = z.infer<typeof registerSchema>

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export default function RegisterForm({ className, ...props }: RegisterFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const router = useRouter()
    const form = useForm<Input>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    })

    async function onSubmit(data: Input) {
        // event.preventDefault()
        try {
            setIsLoading(true)
            const response = await axios.post("/api/auth/signup", data)
            if (response.status == 200) {
                toast.success(response.data)
                toast.success("User logged in successfully!")
                window.location.href = "/"
            } else {
                toast.error(response.data)
            }
        } catch (error) {
            toast.error("Something went wrong :(")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Provide your desired username" {...field} type="text" disabled={isLoading} />
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
                                    <Input placeholder="Enter an email" {...field} type="email" disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter a good password" {...field} type="password" disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Confirm your password" {...field} type="password" disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* <Button type="submit">Submit</Button> */}
                    <Button type="submit" disabled={isLoading} className="w-full" size="sm">
                        {/* {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )} */}
                        Sign Up
                    </Button>
                </form>
            </Form>
        </div>
    )
}