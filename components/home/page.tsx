'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import messages from './game-data.json'

import Autoplay from "embla-carousel-autoplay"
import WidthWrapper from "@/components/ui/width-wrapper";


import Features from './features'
import MapComponent from "./map-view";
import GameServers from "./gamelist";
import HeroFeatures from "./herofeatures";

import Accordions from "./accordians";
import { useEffect, useState } from "react";
import { GameServer } from "@/types/schema";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const GameServersPage = () => {
  const [gameServerList, setGameServerList] = useState<GameServer[]>([]);
  const [loadData, setLoadData] = useState(true);
  useEffect(() => {
    const fetchGameServers = async () => {
      try {
        const response = await axios.get('/api/auth/gameserver');
        if (Array.isArray(response.data)) {
          setGameServerList(response.data);
        } else {
          setGameServerList([]);
        }
      } catch (error) {
        console.error('Error fetching game servers:', error);
        setGameServerList([]);
      } finally {
        setLoadData(false); // Always set loading to false after data fetch
      }
    };

    fetchGameServers();
    const intervalId = setInterval(fetchGameServers, 20000);
    return () => clearInterval(intervalId);
  }, []);


  return (
    <>
      {loadData ? (
        <ProductPlaceholder />
      ) : (
        <main className="outer relative w-full border rounded-xl flex-grow flex flex-col items-center justify-center dark:bg-neutral-900 text-white overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/game_server_bg.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>

          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
                stopOnMouseEnter: true,
                stopOnInteraction: false,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="w-full">
              {gameServerList.map((message, index) => (
                <CarouselItem
                  key={index}
                  className="relative h-[60vh] flex items-center justify-center"
                >
                  <div className="relative z-10 flex flex-col sm:flex-row md:flex-row w-full h-full backdrop-blur-sm">
                    <div className="md:w-1/2 flex flex-col justify-center items-start p-24 md:p-16 sm:p-12 xl:ml-44 lg:ml-4 md:ml-1 dark:text-white text-black">
                      <h2 className="text-2xl md:text-4xl font-bold mb-2 text-left drop-shadow-lg">
                        {message.name}
                      </h2>
                      <p className="text-lg mb-4 whitespace-normal drop-shadow-md">
                        {message.description}
                      </p>
                      <button className="dark:bg-white bg-black dark:text-black text-white py-2 px-4 rounded-lg drop-shadow-lg">
                        Try Now
                      </button>
                    </div>

                    <div className="relative md:w-1/2 flex justify-center items-center">
                      <img
                        className="max-w-xs md:max-w-md lg:max-w-md h-auto object-cover rounded-md"
                        src={message.image}
                        alt="Image Description"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </main>
      )}
      {!loadData && (
        <WidthWrapper>
          <HeroFeatures />
          <GameServers data={gameServerList} />
          <MapComponent />
          <Features />
          <Accordions />
        </WidthWrapper>
      )}
    </>

  )
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

export default GameServersPage;
