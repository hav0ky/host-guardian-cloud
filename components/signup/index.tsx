import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import { redirect } from "next/navigation"
import RegisterForm from "./form"
import { validateRequest } from "@/lib/auth"

export default async function SignUpPage() {
    const { user } = await validateRequest()

    if (user) {
        redirect('/')
    }

    return (
        <>
            <div className="container mx-auto relative items-center pt-20 justify-center">
                {/* <Link
                    href="/examples/authentication"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    Login
                </Link> */}
                <div className="p-3">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Sign up to Cloud Services
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Fill the details below to signup.
                            </p>
                        </div>
                        <RegisterForm />
                        <p className="px-12 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <Link
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}