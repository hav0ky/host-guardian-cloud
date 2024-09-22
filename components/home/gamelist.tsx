'use clinet'
import { gameServers } from '@/app/config/gameservers'
import { getAllGames } from '@/lib/db/gameserverapi'
import { GameServer } from '@/types/schema'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
interface GameServersProps {
  data: GameServer[];
}
const GameServers: React.FC<GameServersProps> = ({ data }) => {
  
  return (
    <div className="container mx-auto mt-28">
      <div className='flex flex-col text-center items-center my-12'>
        <h2 className="text-3xl text-black dark:text-white font-bold text-center mb-2">
          GAME SERVERS
        </h2>
        <p className="leading-normal dark:text-gray-300 sm:text-lg sm:leading-7 max-w-3xl pt-2 mx-auto">
          {data.length > 0 ? "Discover the games that are defining the current gaming landscape!" : "No games are defined yet in the game server"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-5 lg:grid-cols-3 md:gap-7">
        {data.map((gameServer: GameServer) => (
          <Link href={`/gameserver/${gameServer.id}`} key={gameServer.id}>
            <div className="relative flex border dark:border-neutral-800 flex-col h-[380px] w-full rounded-md overflow-hidden shadow-lg group transition-transform duration-300 hover:-translate-y-2"> {/* Add hover effect to slide card up */}

              {/* Halo Effect using a Pseudo Element */}
              <div className="absolute inset-0 z-0 halo-light"></div>

              <div className="p-3 px-4 h-[80%] overflow-hidden relative z-10">
                <Image
                  src={gameServer.background}
                  alt={gameServer.id}
                  width={500}
                  height={700}
                  objectFit='contain'
                  className="object-cover w-full rounded-md h-full border-0"
                />
                <div className="absolute inset-0 bg-transparent bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-0"></div>
              </div>

              <div className="h-[20%] px-4 flex flex-col relative z-10">
                <h3 className="text-lg font-semibold text-black dark:text-white truncate">
                  {gameServer.name}
                </h3>
                {/* <p className="text-gray-500 dark:text-gray-400">Small game server</p> */}
                <div className="flex items-center pt-2">
                  <span className="text-black text-sm dark:text-white">
                    Starting at:
                  </span>
                  <span className="ml-2 text-lg font-bold text-black dark:text-gray-300">
                    ${gameServer.planprice}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GameServers;
