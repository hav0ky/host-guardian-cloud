'use client'

// import { Product } from '@/payload-types'
import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { cn, formatPrice } from '@/lib/utils'
import Image from 'next/image'
import { DB_GameServerPricing } from '@/types/schema'
import {
    Card, CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'

interface ProductListingProps {
    data: DB_GameServerPricing
    index: number
}

const GameServerListing = ({
    data,
    index,
}: ProductListingProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, index * 75)

        return () => clearTimeout(timer)
    }, [index])

    if (!data || !isVisible) return <ProductPlaceholder />

    // const label = PRODUCT_CATEGORIES.find(
    //     ({ value }) => value === product.type
    // )?.label

    // const validUrls = product.images
    //     .map(({ image }) =>
    //         typeof image === 'string' ? image : image.url
    //     )
    //     .filter(Boolean) as string[]

    const AdService = ({ code }: { code: string }) => {
        return (
            <div className="flex gap-2">
                <svg className="h-6 w-6 text-white font-semibold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                {code}
            </div>
        )
    }
    interface Pricing {
        basic: string;
        performance: string;
        extreme: string;
    }

    const prices: Pricing = {
        basic: "14.99",
        performance: "29.99",
        extreme: "49.99"
    };
    if (isVisible && data) {
        return (
            <Link
                className={cn(
                    'invisible h-full w-full cursor-pointer group/main',
                    {
                        'visible animate-in fade-in-5': isVisible,
                    }
                )}
                href={`/gameserver/${data.game_id}/location?plan=${data.name}`}>
                <Card key={data.game_id} className="w-[340px] dark:bg-zinc-800 text-center mx-auto border hover:border-white">
                    <CardHeader>
                        <CardTitle>{data.name}</CardTitle>
                        <CardDescription>{data.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="px-2 text-left">
                            <AdService code="Upto 4 cores at 3.3 ghz" />
                            <AdService code="Optimized Kernel" />
                            <AdService code="24×7 Online" />
                            <AdService code="Full RCON & FTP" />
                            <AdService code="Web interface access" />
                            <AdService code="30+ Regions world wide" />
                        </div>
                        <p className="pt-4 text-3xl font-semibold">${data.price}/month</p>
                    </CardContent>
                    <CardFooter>
                        <Link
                            href={`/gameserver/${data.game_id}/location?plan=${data.name.trim()}`}
                            className={cn(buttonVariants({
                                variant: 'default',
                            }), "mx-auto w-full")}>
                            Select
                        </Link>
                    </CardFooter>
                </Card>

                {/* Popular plan */}
                {/* <Card className="w-[340px] bg-zinc-800 text-center mx-auto border border-teal-500">
                        <CardHeader>
                            <CardTitle>High Performance</CardTitle>
                            <CardDescription>Optimal speeds with DDoS Protection.<br />Good for medium, public size community.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='absolute left-0 right-0 mx-auto -mt-[140px] w-32 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 px-3 py-2 text-sm font-medium text-white'>
                                Popular
                            </div>
                            <div className="px-2 text-left">
                                <AdService code="Upto 4 cores at 4.5 ghz" />
                                <AdService code="Optimized Kernel" />
                                <AdService code="DDoS Protected" />
                                <AdService code="24×7 Online" />
                                <AdService code="Full RCON & FTP" />
                                <AdService code="Web interface access" />
                            </div>
                            <p className="pt-4 text-3xl font-semibold">${prices.performance}/month</p>
                        </CardContent>
                        <CardFooter>
                            <Link
                                href='/servers/minecraft/locations?plan=performance'
                                className={cn(buttonVariants({
                                    variant: 'accent',
                                }), "mx-auto w-full")}>
                                Select
                            </Link>
                        </CardFooter>
                    </Card> */}
                {/* </div> */}
            </Link>
        )
    }
}

const ProductPlaceholder = () => {
    return (
        <div className='flex flex-col w-full'>
            <div className='relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl'>
                <Skeleton className='h-full w-full' />
            </div>
            <Skeleton className='mt-4 w-2/3 h-4 rounded-lg' />
            <Skeleton className='mt-2 w-16 h-4 rounded-lg' />
            <Skeleton className='mt-2 w-12 h-4 rounded-lg' />
        </div>
    )
}

export default GameServerListing