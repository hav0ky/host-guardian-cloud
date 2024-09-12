"use client"

import * as React from "react"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { loginSchema } from "@/types/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

type Input = z.infer<typeof loginSchema>

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function LoginForm({ className, ...props }: LoginFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const router = useRouter()
    const form = useForm<Input>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function onSubmit(data: Input) {
        // event.preventDefault()
        setIsLoading(true)
        try {
            const respose = await axios.post("/api/auth/signin", data)
            if (respose.status == 200) {
                toast.success(respose.data)
                window.location.href = '/'
            } else {
                toast.error(respose.data)
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email" {...field} disabled={isLoading} type="email" />
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
                                    {/* <Input placeholder="Enter your password" {...field} type="password" disabled={isLoading} /> */}
                                    {/* <PasswordInput placeholder="Enter your password" {...field} type="password" disabled={isLoading} /> */}
                                    <Input placeholder="Enter your password" {...field} disabled={isLoading} type="password" />
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
                        Sign In
                    </Button>
                </form>
            </Form>
        </div>
    )
}