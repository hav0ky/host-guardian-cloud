'use client'

import { useEffect, useState, memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import {
    Card, CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { DB_GameServerPricing } from '@/types/schema'
import { Skeleton } from '@/components/ui/skeleton'

const AdService = memo(({ code }: { code: string }) => (
    <div className="flex gap-2">
        <svg className="h-6 w-6 text-white font-semibold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        {code}
    </div>
))

const ProductPlaceholder = memo(() => (
    <div className='flex flex-col w-full'>
        <div className='relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl'>
            <Skeleton className='h-full w-full' />
        </div>
        <Skeleton className='mt-4 w-2/3 h-4 rounded-lg' />
        <Skeleton className='mt-2 w-16 h-4 rounded-lg' />
        <Skeleton className='mt-2 w-12 h-4 rounded-lg' />
    </div>
))

interface ProductListingProps {
    data: DB_GameServerPricing
    index: number
}

const GameServerListing = ({ data, index }: ProductListingProps) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleVisibility = () => requestAnimationFrame(() => setIsVisible(true));
        const timer = setTimeout(handleVisibility, index * 75)
        return () => clearTimeout(timer)
    }, [index])

    if (!isVisible) return <ProductPlaceholder />

    return (
        <Link
            className={cn(
                'invisible h-full w-full cursor-pointer group/main',
                isVisible && 'visible animate-in fade-in-5'
            )}
            href={`/gameserver/${data.game_id}/location?plan=${data.name}`}>
            {data.name != "Best Plans" ? <Card className="w-[340px] dark:bg-zinc-900 text-center mx-auto border rounded-md overflow-hidden shadow-lg hover:border-white">
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
                        <AdService code="30+ Regions worldwide" />
                    </div>
                    <p className="pt-4 text-3xl font-semibold">${data.price}/month</p>
                </CardContent>
                <CardFooter>
                    <Link
                        href={`/gameserver/${data.game_id}/location?plan=${data.name.trim()}`}
                        className={cn(buttonVariants({ variant: 'default' }), "mx-auto w-full")}>
                        Select
                    </Link>
                </CardFooter>
            </Card> : null}

            {/* Popular plan */}
            {data.name == "Best Plans" ?
                <Card className="w-[340px] bg-zinc-800 mt-10 text-center mx-auto border border-teal-500">
                    <CardHeader>
                    <CardTitle>{data.name}</CardTitle>
                    <CardDescription>{data.description}</CardDescription>
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
                        <p className="pt-4 text-3xl font-semibold">${data.price}/month</p>
                    </CardContent>
                    <CardFooter>
                        <Link
                            href={`/gameserver/${data.game_id}/location?plan=${data.name.trim()}`}
                            className={cn(buttonVariants({
                                variant: 'accent',
                            }), "mx-auto w-full")}>
                            Select
                        </Link>
                    </CardFooter>
                </Card> : null}
            {/* </div> */}
        </Link>
    )
}

export default memo(GameServerListing)
