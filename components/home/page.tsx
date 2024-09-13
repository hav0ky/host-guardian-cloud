'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import messages from './game-data.json'

import Autoplay from "embla-carousel-autoplay"
import WidthWrapper from "@/components/ui/width-wrapper";
import Link from "next/link";
import Image from 'next/image'
import { gameServers } from '@/app/config/gameservers'
import Features from './features'
import MapComponent from "./map-view";
import GameServers from "./gamelist";
import HeroFeatures from "./herofeatures";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Accordions from "./accordians";

const GameServersPage = () => {

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
        <HeroFeatures />
        {/* game listing section */}
        <GameServers />
        {/* mapview section */}
        <MapComponent />
        {/* Features section */}
        <Features />
        {/* QA section  */}
        {/* <div className="flex justify-center items-center py-24"> */}
        <Accordions/>
        {/* </div> */}
      </WidthWrapper>

    </>

  )
}

export default GameServersPage;
