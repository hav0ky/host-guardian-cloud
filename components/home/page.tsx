'use client'
import React, { useEffect, useRef, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import messages from './game-data.json'

import Autoplay from "embla-carousel-autoplay"
import WidthWrapper from "@/components/ui/width-wrapper";
import Link from "next/link";
import Image from 'next/image'
import { gameServers } from '@/app/config/gameservers'
import MapComponent from './map-view'

const GameServersPage = () => {

  const [hovered, setHovered] = useState(false);

  return (
    <>
      <main className=" outer  relative w-[100vw] rounded-s-3xl -full  border flex-grow flex flex-col items-center justify-center dark:bg-neutral-900 text-white">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/game_server_bg.jpg')`, backgroundSize: 'contain', backgroundPosition: 'center', }}></div>

        <Carousel
          plugins={[Autoplay({
            delay: 2000,
            stopOnMouseEnter: true,
            stopOnInteraction: false,
          })]} className="w-full"
        >
          <CarouselContent className="w-full">
            {messages.map((message, index) => (
              <CarouselItem
                key={index}
                className="relative w-full h-[60vh] flex items-center justify-center"
              >
                <div className="relative  z-10 flex flex-col md:flex-row w-full h-full  backdrop-blur-sm">
                  {/* Text Section */}
                  <div className=" md:w-1/2 flex flex-col  justify-center items-start p-24 xl:ml-44 lg:4  md:ml-32 dark:text-white text-black">
                    <h2 className="text-2xl md:text-4xl font-bold mb-2 text-center drop-shadow-lg">{message.title}</h2>
                    <p className="text-lg mb-4 whitespace-normal drop-shadow-md ">{message.description}</p>
                    <button className="dark:bg-white bg-black dark:text-black text-white py-2 px-4 rounded-lg drop-shadow-lg">Try Now</button>
                  </div>

                  {/* Image Section */}
                  <div className="relative md:w-1/2 flex justify-center items-center">
                    <img
                      className="max-w-xs md:max-w-md h-auto object-cover rounded-md"
                      src={'/img/games/cs2.png'}
                      alt="Image Description"
                    />

                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

      </main>
      <WidthWrapper>

        <div className="container mx-auto px-4 py-8">
        <div className="grid   grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 md:gap-8 gap-16">
  {gameServers.map(gameServer => (
    <Link href={`/gameserver/${gameServer.id}`} key={gameServer.id}>
      <div className="relative flex border dark:border-neutral-800 flex-col h-[470px] w-[3/4] rounded-md hover:border-gray-400  overflow-hidden shadow-lg group">
        
        {/* Halo Effect using a Pseudo Element */}
        <div className="absolute inset-0 z-0 halo-light"></div>

        <div className=" p-3 px-4 h-[80%] overflow-hidden   relative z-10">
          <Image
            src={gameServer.background}
            alt={gameServer.id}
            width={500}
            height={700}
            className="object-cover w-full rounded-md h-full transition-all duration-300 transform group-hover:scale-105 group-hover:brightness-10 border-0"
          />
          <div className="absolute inset-0 bg-transparent bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-0"></div>
        </div>

        <div className="h-[20%] px-4 flex flex-col relative z-10">
          <h3 className="text-lg  font-bold text-black dark:text-white  truncate">{gameServer.name}</h3>
          {/* <p className="text-gray-500 text-sm  dark:text-gray-400 ">Small game server</p> */}
          <span className="text-black mt-5  dark:text-white">Starting at: ${gameServer.price} 
          </span>
        
        </div>
      </div>
    </Link>
  ))}
</div>

          </div>
          <div>
            <div className=' flex flex-col justify-center  text-center  items-center mt-24 '>
              <h2 className="font-heading text-5xl text-current leading-[1.1]">
                Our Worldwide Server Coverage
              </h2>
              <p className="leading-normal dark:text-gray-300 sm:text-lg sm:leading-7 max-w-3xl pt-2 mx-auto">
                Discover our global server coverage. Hover over the map to learn more about server locations and their benefits.
              </p>

            </div>

            <div className="mt-20 mb-20">

              <MapComponent />

            </div>

          </div>
      </WidthWrapper>
    </>

  )
}

export default GameServersPage;
