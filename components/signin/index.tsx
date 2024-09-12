import Link from "next/link"
import { LoginForm } from "./form"
import { redirect } from "next/navigation"
import { validateRequest } from "@/lib/auth"

export default async function SignInPage() {
    const { user } = await validateRequest()

    if (user) {
        redirect('/')
    }

    return (
        <>
            <div className="container mx-auto relative items-center pt-20 justify-center">
                <div className="p-3">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Sign in to your account
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email and password below to log into your account.
                            </p>
                        </div>
                        <LoginForm />
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            Don&apos;t have an account yet?{" "}
                            <Link
                                href="/signup"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Signup
                            </Link>{" "}
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}