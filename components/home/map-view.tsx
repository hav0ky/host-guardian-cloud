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
        <div className="relative">
            <img
                src="/img/world-map.svg" 
                className="w-full h-auto"
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
    );
};

export default MapComponent;
