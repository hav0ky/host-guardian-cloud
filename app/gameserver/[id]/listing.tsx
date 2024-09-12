'use client'

// import { Product } from '@/payload-types'
import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { cn, formatPrice } from '@/lib/utils'
import Image from 'next/image'
import { DB_GameServerPricing } from '@/types/schema'

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

    if (isVisible && data) {
        return (
            <Link
                className={cn(
                    'invisible h-full w-full cursor-pointer group/main',
                    {
                        'visible animate-in fade-in-5': isVisible,
                    }
                )}
                href={`#`}>
                <div className='flex flex-col w-full'>
                    <div className='group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl'>
                        <Image
                            fill
                            loading='eager'
                            className='h-full w-full object-cover object-center'
                            src={"/img/games/" + data.game_id + ".jpeg"}
                            alt='Product image'
                        />
                    </div>

                    <h3 className='mt-4 font-medium text-sm'>
                        {data.name}
                    </h3>
                    <p className='mt-1 text-sm text-muted-foreground'>
                        {data.cpu} CPU / {data.ram} GB RAM / {data.disk} GB NVMe SSD
                    </p>
                    <p className='mt-1 font-medium text-sm'>
                        {formatPrice(data.price)}
                    </p>
                </div>
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