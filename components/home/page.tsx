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

const GameServersPage = () => {

  const [hovered, setHovered] = useState(false);

  return (
    <>
      <main className=" relative w-[100vw]  flex-grow flex flex-col items-center justify-center dark:bg-slate-950 text-white">
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
              // style={{
              //   backgroundImage: `url(${'/game_server_bg.jpg'})`, backgroundSize: 'contain', backgroundPosition: 'center',
              //   // borderColor: 'red', borderWidth:2
              // }}
              >
                <div className="relative z-10 flex flex-col md:flex-row w-full h-full  backdrop-blur-sm">
                  {/* Text Section */}
                  <div className="md:w-1/2 flex flex-col  justify-center items-start p-24 xl:ml-44 lg:4  md:ml-32 dark:text-white text-black">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 md:gap-4 gap-14">
            {gameServers.map(gameServer =>
              <Link href={`/gameserver/${gameServer.id}`} key={gameServer.id}>
                <div className="flex flex-col h-[450px] w-full  rounded-lg border hover:border-gray-400 border-neutral-700 overflow-hidden shadow-lg relative group">
                  <div className="relative h-[60%] overflow-hidden m-2">
                    <Image
                      src={gameServer.background}
                      alt={gameServer.id}
                      width={500}
                      height={500}
                      className="object-cover w-full rounded-lg h-full transition-all duration-300 transform group-hover:scale-105 group-hover:brightness-10"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-0"></div>
                  </div>
                  <div className="h-[40%] p-4 flex flex-col justify-between ">
                    <h3 className="text-lg font-semibold text-black dark:text-white mb-2 truncate">{gameServer.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-2">
                      Small game server
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 mb-2">
                      High speed
                    </p>
                    <div className="flex items-center space-x-1">
                      <span className="text-black dark:text-white">Starting at: </span>
                      <span className="text-lg font-bold text-black dark:text-white">{'$9'}</span>
                    </div>
                  </div>
                </div>

              </Link>
            )}
          </div>
        </div>
      </WidthWrapper>
    </>

  )
}

export default GameServersPage;
