"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label"
import ReactCountryFlag from "react-country-flag";
import NotFound from "@/app/not-found";
import Link from "next/link";
import { CloudIcon, MemoryStick, NetworkIcon, Undo2, ServerIcon, GlobeIcon, ClockIcon, CpuIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { DurationPlan, plans, prices, Region, regions } from "@/components/home/region-list";
import WidthWrapper from "@/components/ui/width-wrapper";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { AnimatePresence, motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";


const filterRegionsByTab = (tabValue: string, regions: Region[]): Region[] => {
    switch (tabValue) {
        case 'all':
            return regions;
        case 'asia':
            return regions.filter(region => region.region === 'Asia');
        case 'europe':
            return regions.filter(region => region.region === 'Europe');
        case 'americas':
            return regions.filter(region => region.region === 'North America' || region.region === 'South America');
        case 'middle-east':
            return regions.filter(region => region.region === 'Middle East');
        case 'oceania':
            return regions.filter(region => region.region === 'Oceania');
        default:
            return [];
    }
};

const getPriceForPlan = (plan: string) => {
    switch (plan) {
        case "Monthly":
            return 10.00;
        case "Quarterly":
            return 25.00;
        case "Half-Yearly":
            return 45.00;
        case "Yearly":
            return 80.00;
        default:
            return 0.00;
    }
};

const getDescriptionForPlan = (plan: string) => {
    switch (plan) {
        case "Monthly":
            return "Billed every month. Cancel anytime.";
        case "Quarterly":
            return "Billed every 3 months. Save 10%.";
        case "Half-Yearly":
            return "Billed every 6 months. Save 20%.";
        case "Yearly":
            return "Billed annually. Best value with 30% savings.";
        default:
            return "Select a plan.";
    }
};

const durationsPlan: DurationPlan[] = [
    { name: "Monthly", discount: null, billingFrequency: "per month" },
    { name: "Quarterly", discount: "10%", billingFrequency: "every 3 months" },
    { name: "Half-Yearly", discount: "20%", billingFrequency: "every 6 months" },
    { name: "Yearly", discount: "30%", billingFrequency: "per year" },
]

export default function ConfigPage({ params }: { params: { plan: string } }) {
    const [value, SetValue] = useState("Mumbai")

    const search = useSearchParams()
    const plan: string = search.get('plan') || "none"
    const [selectedTab, setSelectedTab] = useState('all');
    const [selectedDuration, setSelectedDuration] = useState('Monthly');
    const [selectedPlan, setSelectedPlan] = useState('')
    const [basePrice, setBasePrice] = useState(getPriceForPlan('Monthly'))
    const filteredRegions = useMemo(() => filterRegionsByTab(selectedTab, regions), [selectedTab, regions]);
    const orderDetails = {
        serverName: "Premium Gaming Server",
        location: value,
        duration: selectedDuration || 0,
        specs: "8 vCPUs, 32GB RAM, 512GB SSD",
        price: basePrice,
    }
    const [dedicatedIp, setDedicatedIp] = useState(false)
    const [cdn, setCdn] = useState(false)
    const [extraRam, setExtraRam] = useState(0)

    const dedicatedIpPrice = 5.99
    const cdnPrice = 9.99
    const ramPrice = 2.99

    const totalPrice = basePrice +
        (dedicatedIp ? dedicatedIpPrice : 0) +
        (cdn ? cdnPrice : 0) +
        (extraRam * ramPrice)

    if (plan === "Basic Plan" || plan === "performance" || plan === "extreme") {
        return (
            // <div className="bg-zinc-900">

            <WidthWrapper className="">


                <div className="flex flex-col lg:flex-row overflow-hidden ">
                    <ScrollArea className="lg:w-[72%] pr-6  h-[89vh]">
                        <div className="">
                            {/* <div id="region" className="w-full lg:w-2/3 overflow-y-auto"> */}
                            <Tabs defaultValue="all" className="w-auto max-w-full" value={selectedTab} onValueChange={setSelectedTab}>
                                <div className="pb-10 max-w-7xl text-left items-center relative w-full">
                                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400 from-neutral-700 to-neutral-800 bg-opacity-50 pt-14">
                                        SELECT LOCATION
                                    </h1>
                                    <p className="mt-2 font-normal text-base dark:text-neutral-300">
                                        Select your desired location for the minimal ping.
                                    </p>
                                </div>
                                <TabsList className="justify-start inline-flex space-x-2 overflow-x-auto whitespace-nowrap h-full">
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="asia">Asia</TabsTrigger>
                                    <TabsTrigger value="europe">Europe</TabsTrigger>
                                    <TabsTrigger value="americas">Americas</TabsTrigger>
                                    <TabsTrigger value="middle-east">Middle East</TabsTrigger>
                                    <TabsTrigger value="oceania">Oceania</TabsTrigger>
                                </TabsList>

                                <TabsContent value={selectedTab}>
                                    <motion.div
                                        key={selectedTab}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Card className="border-none bg-transparent mt-10 border ">
                                            <CardContent className="-p-6">
                                                <RadioGroup
                                                    defaultValue={value}
                                                    onValueChange={(e) => SetValue(e)}
                                                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                                                >
                                                    {filteredRegions.map((region) => (
                                                        <div key={region.id} className="relative">
                                                            <RadioGroupItem value={region.city} id={region.city} className="peer sr-only" />
                                                            <Label
                                                                htmlFor={region.city}
                                                                className={cn(
                                                                    'flex flex-col justify-between rounded-md border-2 cursor-pointer transition-transform duration-300 p-4',
                                                                    'bg-zinc-200 dark:bg-zinc-900 border-muted hover:scale-55 hover:border-gray-700',
                                                                    'dark:peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary',
                                                                    'peer-data-[state=checked]:shadow-sm peer-data-[state=checked]:shadow-primary/50'
                                                                )}
                                                            >
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

                                                                <div className="text-left">
                                                                    <h3 className="text-lg font-bold">{region.city}</h3>
                                                                    <p className="text-lg font-medium">{region.name}</p>
                                                                </div>
                                                            </Label>

                                                            <div className="absolute top-2 right-2 peer-data-[state=checked]:block hidden">
                                                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </RadioGroup>
                                            </CardContent>
                                            <CardFooter className="-p-6 mt-5">
                                                <p className="text-center sm:text-left">
                                                    If you&apos;re unable to find your desired location, reach out to us on <a href="/" className="text-teal-200" target="_blank">Discord</a>; we might be able to set up a server in your area.
                                                </p>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                </TabsContent>
                            </Tabs>
                            <div className="container mx-auto  mt-14 space-y-4">


                                <h2 className="text-2xl font-bold mb-4">Select Subscription Plan</h2>
                                <RadioGroup defaultValue={selectedDuration} onValueChange={(e) => {setSelectedDuration(e); setBasePrice(getPriceForPlan(e))}} className="space-y-2">
                                    {durationsPlan.map((plan) => (
                                        <div
                                            key={plan.name}
                                            className={`flex items-center space-x-4 border p-3 rounded-lg ${selectedDuration === plan.name ? 'border-gray-300' : 'border'
                                                }`}
                                        >
                                            <RadioGroupItem value={plan.name} id={plan.name} className="w-5 h-5" />

                                            <Label htmlFor={plan.name} className="flex-grow cursor-pointer">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <span className="font-semibold text-lg">{plan.name}</span>
                                                        {plan.discount && (
                                                            <Badge variant="secondary" className="ml-3">
                                                                Save {plan.discount}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <div className="text-right -mb-6">
                                                        <span className="font-bold text-lg">
                                                            ${getPriceForPlan(plan.name).toFixed(2)}
                                                        </span>
                                                        <p className="text-sm text-muted-foreground">
                                                            {plan.billingFrequency}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {getDescriptionForPlan(plan.name)}
                                                </p>
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                            <div className="pb-10 max-w-7xl text-left items-center relative w-full">
                                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400 from-neutral-700 to-neutral-800 bg-opacity-50 pt-20">
                                    CONFIGURATBLE OPTIONS
                                </h1>
                                <p className="mt-2 font-normal text-base dark:text-neutral-300">
                                    Fine-Tune Your Setup for Optimal Performance.
                                </p>
                            </div>

                            <div className="container mx-auto mb-20">
                                <div className="flex flex-col lg:flex-row gap-8">
                                    <Card className="w-full  flex flex-col">

                                        <CardContent className="flex-grow space-y-6 mt-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <NetworkIcon className="h-4 w-4" />
                                                    <Label htmlFor="dedicated-ip" className="text-lg font-semibold" >Dedicated IP</Label>
                                                </div>
                                                <Switch
                                                    id="dedicated-ip"
                                                    checked={dedicatedIp}
                                                    onCheckedChange={setDedicatedIp}
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <CloudIcon className="h-4 w-4" />
                                                    <Label htmlFor="cdn" className="text-lg font-semibold">CDN</Label>
                                                </div>
                                                <Switch
                                                    id="cdn"
                                                    checked={cdn}
                                                    onCheckedChange={setCdn}
                                                />
                                            </div>
                                            <div className="space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <MemoryStick className="h-4 w-4" />
                                                        <Label className="text-lg font-semibold">Extra RAM</Label>
                                                    </div>
                                                    <span>{extraRam} GB</span>
                                                </div>

                                                <Select value={extraRam.toString()} onValueChange={(value: any) => setExtraRam(Number(value))}>
                                                    <SelectTrigger className="w-full mt-20">
                                                        <SelectValue placeholder="Select RAM" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="0">0 GB</SelectItem>
                                                        <SelectItem value="4">4 GB</SelectItem>
                                                        <SelectItem value="8">8 GB</SelectItem>
                                                        <SelectItem value="12">12 GB</SelectItem>
                                                        <SelectItem value="16">16 GB</SelectItem>
                                                        <SelectItem value="20">20 GB</SelectItem>
                                                        <SelectItem value="24">24 GB</SelectItem>
                                                        <SelectItem value="28">28 GB</SelectItem>
                                                        <SelectItem value="32">32 GB</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-4">
                                                <DropdownMenuSeparator />
                                                <h3 className="text-lg font-semibold">Additional Options</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <Card className="p-4">
                                                        <h4 className="font-medium mb-2">DDoS Protection</h4>
                                                        <p className="text-sm text-muted-foreground">Advanced protection against DDoS attacks</p>
                                                    </Card>
                                                    <Card className="p-4">
                                                        <h4 className="font-medium mb-2">Backup Service</h4>
                                                        <p className="text-sm text-muted-foreground">Daily backups of your server data</p>
                                                    </Card>
                                                    <Card className="p-4">
                                                        <h4 className="font-medium mb-2">24/7 Support</h4>
                                                        <p className="text-sm text-muted-foreground">Round-the-clock technical assistance</p>
                                                    </Card>
                                                    <Card className="p-4">
                                                        <h4 className="font-medium mb-2">Custom Control Panel</h4>
                                                        <p className="text-sm text-muted-foreground">Tailored control panel for easy management</p>
                                                    </Card>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>


                                </div>
                            </div>

                            {/* </div> */}

                        </div>
                    </ScrollArea>

                    <Card className="lg:w-[28%] m-4 sticky mt-14 h-fit lg:top-4">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <div className="flex items-center space-x-4">
                                <ServerIcon className="h-6 w-6 text-primary" />
                                <div>
                                    <p className="font-medium">{orderDetails.serverName}</p>
                                    <p className="text-sm text-muted-foreground">Selected Server</p>
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <GlobeIcon className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">Location</span>
                                    </div>
                                    <span className="text-sm font-medium">{orderDetails.location}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <ClockIcon className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">Duration</span>
                                    </div>
                                    <span className="text-sm font-medium">{orderDetails.duration}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <CpuIcon className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">Specifications</span>
                                    </div>
                                    <span className="text-sm font-medium">{orderDetails.specs}</span>
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span>Base Price</span>
                                    <span>${basePrice.toFixed(2)}</span>
                                </div>
                                {dedicatedIp && (
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Dedicated IP</span>
                                        <span>${dedicatedIpPrice.toFixed(2)}</span>
                                    </div>
                                )}
                                {cdn && (
                                    <div className="flex items-center justify-between text-sm">
                                        <span>CDN</span>
                                        <span>${cdnPrice.toFixed(2)}</span>
                                    </div>
                                )}
                                {extraRam > 0 && (
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Extra RAM ({extraRam}GB)</span>
                                        <span>${(extraRam * ramPrice).toFixed(2)}</span>
                                    </div>
                                )}
                            </div>
                            <DropdownMenuSeparator />
                            <div className="flex items-center justify-between font-medium">
                                <span>Total Price</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Confirm Order</Button>
                        </CardFooter>
                    </Card>
                </div>
            </WidthWrapper >
        )
    } else {
        return (<NotFound />)
    }
}


{/* <Card className="mx-auto bg-gradient-to-r from-indigo-500 mt-6">
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
                                    <Button className="mt-4 sm:my-auto sm:ml-4">Proceed to checkout</Button>
                                </div>
                            </CardTitle>
                        </CardHeader>
                    </Card> */}
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