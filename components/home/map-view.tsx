import React from 'react';
import Image from 'next/image';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { regions } from './region-list';

const MapComponent = () => {
    return (

        <div className='h-[90vh] mt-36'>
            <div className=' flex flex-col justify-center  text-center  items-center '>
                <h2 className="text-3xl text-black dark:text-white font-bold text-center">
                    Our Worldwide Server Coverage
                </h2>
                <p className="leading-normal dark:text-gray-300 sm:text-lg sm:leading-7 max-w-3xl pt-2 mx-auto">
                    Discover our global server coverage. Hover over the map to learn more about server locations and their benefits.
                </p>

            </div>
            <div className=' max-w-7xl mx-auto'>
                <div className="relative mt-6">
                    <Image
                        alt='map'
                        src="/img/world-map.svg"
                        className="w-full"
                        width={0}
                        height={0}

                    />
                    {/* Markers for each point in each region */}
                    {regions.map((region) =>
                        <TooltipProvider key={region.id} delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: `${region.point[0]}%`,
                                            top: `${region.point[1]}%`,
                                            transform: 'translate(-50%, -50%)',
                                            borderRadius: '50%',
                                            background: '#99f6e4', // Customize the marker style
                                        }}
                                        className='h-1 w-1 sm:h-2.5 sm:w-2.5 hover:outline outline-offset-2 outline-2 outline-teal-200/60'
                                    />
                                </TooltipTrigger>
                                <TooltipContent side='right' sideOffset={8}>
                                    <p>{region.city}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MapComponent;
