// import { getGameServerById } from "@/config/gameservers"
import HeroSection from "./hero"
import { redirect } from "next/navigation"
import query from "@/lib/db"
import GameServerListing from "./listing"
import WidthWrapper from "@/components/ui/width-wrapper"
import Image from "next/image"
import { HoverEffect } from "@/components/ui/card-hover-effect"

const GamePage = async ({ params }: { params: { id: string } }) => {
    const data = await query.gameservers.getGameServerWithPricingById(params.id)
    const featureData = await query.gameservers.getGameFeatures(params.id);
    console.log(featureData?.features)
    if (!data) {
        redirect('/')
    }

    return (
        <div>
            <HeroSection data={data} />
            <WidthWrapper >
                <div className="justify-center items-center">
                    <div className="pb-10 max-w-7xl text-center items-center relative w-full">
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400 from-neutral-700 to-neutral-800 bg-opacity-50 pt-20">
                            {data.name} Pricing
                        </h1>
                        <p className="mt-2 font-normal text-base dark:text-neutral-300">
                            Pricing plans for {data.name}
                        </p>
                    </div>
                    <div className=" justify-center align-middle items-center flex flex-wrap gap-6">
                        {data.pricing.map((p, i) =>
                             <div className="flex justify-center items-center h-full">
                             <GameServerListing data={p} index={i} key={i} />
                         </div>
                        )}
                    </div>
                </div>
            </WidthWrapper>
            <div className='w-full py-10'>
                <section className="space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
                    <div className="pb-4 relative w-full text-center">
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400 from-neutral-700 to-neutral-800 bg-opacity-50 pt-20">
                            Easy to use control panel
                        </h1>
                        <p className="mt-2 font-normal text-base text-muted-foreground">
                            We are offering a clean and easy control panel for our game hosting, with all the features you need.
                        </p>
                    </div>
                    <div className='mx-auto md:max-w-[64rem] px-4'>
                        <div className='mt-4 mb-1 flow-root sm:mt-14 sm:mb-16'>
                            <div className='-m-2 rounded-xl bg-neutral-900/20 dark:bg-neutral-800/40 p-2 ring-1 ring-inset ring-secondary lg:-m-4 lg:rounded-2xl lg:p-4'>
                                <Image src="/img/games/control.png" alt="panel" height={1000} width={1000} className="w-full h-full rounded-xl" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="max-w-5xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400 from-neutral-700 to-neutral-800 bg-opacity-50 pt-20">
                    Features
                </h1>
                <HoverEffect items={featureData?.features} />
            </div>
            {/* footer */}
            <div className="pt-24" />

        </div>
    )
}

export default GamePage