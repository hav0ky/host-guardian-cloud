"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label"
import ReactCountryFlag from "react-country-flag";
import NotFound from "@/app/not-found";
import Link from "next/link";
import { Undo2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { plans, prices, regions } from "@/components/home/region-list";
import WidthWrapper from "@/components/ui/width-wrapper";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const AdService = ({ code }: { code: string }) => {
    return (
        <div className="flex gap-2">
            <div className="min-w-6">
                <svg className="h-6 w-6 text-black font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            {code}
        </div>
    )
}

export default function ConfigPage({ params }: { params: { plan: string } }) {
    const [step, SetStep] = useState(0)
    const [value, SetValue] = useState("Mumbai")
    const search = useSearchParams()
    const plan: string = search.get('plan') || "none"
    console.log("Hello", search)
    if (plan === "Basic Plan" || plan === "performance" || plan === "extreme") {
        return (
            // <div className="bg-zinc-900">
            <WidthWrapper>
                <div className="py-20 text-white min-h-screen" id="region">
                    {/* <Link
                            href='/gameserver/'
                            className={cn(buttonVariants({
                                variant: 'outline',
                                size: 'sm',
                            }), "ml-6")}>
                            <Undo2 size={16} className="mr-1" />back
                        </Link> */}
                    {/* <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 transform hover:scale-105 transition-transform duration-300 ease-in-out">
                            <div className="h-32 w-full relative">
                                <img className="absolute inset-0 w-full h-full object-cover" src="https://flagcdn.com/w320/us.png" alt="USA Flag" />
                            </div>
                            <div className="px-6 py-4">
                                <div className="font-bold text-lg text-gray-900 dark:text-gray-100">United States</div>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">
                                    Country details or description here.
                                </p>
                            </div>
                        </div> */}

                    <Card className="border-none bg-transparent ">
                        <CardHeader>
                            <CardTitle>Location</CardTitle>
                            <CardDescription>Select your desired location for the minimal ping.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup defaultValue={value} onValueChange={(e) => SetValue(e)} className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5 gap-4 ">
                                {regions.map((region) =>
                                    <div key={region.id} className="relative">
                                        {/* Hidden radio button */}
                                        <RadioGroupItem value={region.city} id={region.city} className="peer sr-only" />

                                        {/* Label styled as the card */}
                                        <Label
                                            htmlFor={region.city}
                                            className={cn(
                                                'flex flex-col justify-between rounded-md border-2 cursor-pointer transition-transform duration-300 p-4',
                                                'bg-zinc-200 dark:bg-zinc-900 border-muted hover:scale-105 hover:border-gray-700',
                                                'dark:peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary',
                                                'peer-data-[state=checked]:shadow-sm peer-data-[state=checked]:shadow-primary/50'
                                            )}
                                        >
                                            {/* Flag */}
                                            <ReactCountryFlag
                                                countryCode={region.flag}
                                                svg
                                                style={{
                                                    width: '2.5em',
                                                    height: '2.5em',
                                                }}
                                                className="rounded-lg"
                                                title={region.name}
                                            />

                                            {/* City and Country */}
                                            <div className="text-left">
                                                <h3 className="text-lg font-bold">{region.city}</h3>
                                                <p className="text-lg">{region.name}</p>
                                            </div>
                                        </Label>

                                        {/* Checkmark for selected card */}
                                        <div className="absolute top-2 right-2 peer-data-[state=checked]:block hidden">
                                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </RadioGroup>
                        </CardContent>
                        <CardFooter>
                            <p className="text-center sm:text-left">If you&apos;re unable to find your desired location, reach out to us on <a href="/" className="text-teal-200" target="_blank">Discord</a>; we might be able to set up a server in your area.</p>
                        </CardFooter>
                    </Card>
                    <Card className="mt-6 border-none bg-transparent">
                        <CardHeader>
                            <CardTitle className="text-center sm:text-left">Additional Services</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <AdService code="Automatic backup system." />
                            <AdService code="Optional MySQL-Database. Allows to use plugins needing such a database." />
                            <AdService code="Faster download of maps over the web server, as long as this is supported by the game. Also applies to maps you have uploaded." />
                        </CardContent>
                    </Card>
                    <Card className="mx-auto bg-gradient-to-r from-indigo-500 mt-6">
                        <CardHeader>
                            <CardTitle className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 text-center sm:text-left">
                                <div>
                                    <h1 className="text-3xl font-semibold">Counter-Strike 2 Hosting</h1>
                                    <p className="hidden sm:block text-base font-normal">Server Configuration - {plans[plan]}, {value}</p>
                                </div>
                                <div className="flex flex-col sm:flex-row">
                                    <div className="text-center font-normal">
                                        <h1 className="text-3xl">${prices[plan]}</h1>
                                        <p className="text-base">This cost estimate does not include taxes.</p>
                                    </div>
                                    <Link
                                        href={`/checkout?plan=${plan}&region=${value}`}
                                        className={cn(buttonVariants({
                                            variant: 'default',
                                        }), "mt-4 sm:my-auto sm:ml-4")}>
                                        Proceed to checkout
                                    </Link>
                                    {/* <Button className="mt-4 sm:my-auto sm:ml-4">Proceed to checkout</Button> */}
                                </div>
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            </WidthWrapper>
            // </div>
        )
    } else {
        return (<NotFound />)
    }
}

{/* <Dialog>
<DialogTrigger asChild>
    <Button className="mt-4 sm:my-auto sm:ml-4">Proceed to checkout</Button>
</DialogTrigger>
<DialogContent className="sm:max-w-[425px]">
    <div className={cn("space-y-6", {
        hidden: step == 1
    })}>
        <DialogHeader>
            <DialogTitle>Item Cart</DialogTitle>
        </DialogHeader>
        <Card>
            <CardHeader>
                <CardTitle className="text-xl -mb-1.5">Counter-Strike 2 Server</CardTitle>
                <CardDescription className="text-gray-300">, {value}</CardDescription>
            </CardHeader>
            <CardContent className="-mt-3 flex justify-between">
                <p className="text-sm">1 Month</p>
                <p>$</p>
            </CardContent>
        </Card>
        <Separator />
        <div>
            <div className="flex justify-between">
                <p>Counter-Strike 2 Server</p>
                <p>$$</p>
            </div>
            <div className="flex justify-between font-semibold">
                <p>Total</p>
                <p className="text-teal-300">$</p>
            </div>
        </div>
        <DialogFooter>
            <Button type="submit" className="w-full" size="sm" onClick={() => SetStep(1)}>Continue</Button>
        </DialogFooter>
    </div>
    <div className={cn("space-y-6", {
        hidden: step == 0
    })}>
        <DialogHeader>
            <DialogTitle>How would you like to pay?</DialogTitle>
        </DialogHeader>
        <RadioGroup defaultValue="card" className="grid grid-cols-1 gap-4">
            <div>
                <RadioGroupItem value="card" id="card" className="peer sr-only" />
                <Label
                    htmlFor="card"
                    className="flex flex-col justify-between rounded-md border-2 cursor-pointer border-muted bg-popover p-4 peer-data-[state=checked]:border-teal-300 [&:has([data-state=checked])]:border-primary"
                >
                    <div className="text-left">
                        <h3 className="text-base font-semibold">Credit / Debit Cards</h3>
                        <p className="text-sm">Pay with Visa, Mastercard, Amex or use Apple Pay or Google Pay if they are enabled on you device.</p>
                    </div>
                </Label>
            </div>
            <div>
                <RadioGroupItem value="crypto" id="crypto" className="peer sr-only" />
                <Label
                    htmlFor="crypto"
                    className="flex flex-col justify-between rounded-md border-2 cursor-pointer border-muted bg-popover p-4 peer-data-[state=checked]:border-teal-300 [&:has([data-state=checked])]:border-primary"
                >
                    <div className="text-left">
                        <h3 className="text-base font-semibold">Cryptocurrencies</h3>
                        <p className="text-sm">Send a cryptocurrency transaction from your wallet</p>
                    </div>
                </Label>
            </div>
        </RadioGroup>
        <DialogFooter className="flex flex-row gap-2">
            <Button className="w-full" variant="outline" size="sm" onClick={() => SetStep(0)}>Back</Button>
            <Button type="submit" className="w-full" size="sm" >Pay</Button>
        </DialogFooter>
    </div>
</DialogContent>
</Dialog> */}