import React from 'react';

interface Hero_Feature {
    title: string;
    subtitle: string;
    image: string; 
  }
const HeroFeatures: React.FC = () => {
        const games:Hero_Feature[] = [
            
          { title: "Counter-Strike 2", subtitle: "FPS Game", image: "/img/games/cs2.jpeg" },
          { title: "Minecraft", subtitle: "Sandbox Game", image: "/img/games/cs2.jpeg" },
          { title: "Fortnite", subtitle: "Battle Royale Game", image: "/img/games/cs2.jpeg" },
        ];
    return (
        <>
        {/* <div className=' flex flex-col  text-center  items-center mt-24 '>
          <h2 className="text-3xl text-black dark:text-white font-bold text-center">
            Top 3 Must-Play Games Right Now!
          </h2>
          <p className="leading-normal dark:text-gray-300 sm:text-lg sm:leading-7 max-w-3xl pt-2 mx-auto">
            Discover the games that are defining the current gaming landscape!"
          </p>

        </div> */}
          <div className="flex justify-around gap-16 my-6 ">
            {games.map((game: any, index: number) => (
              <div
                key={index}
                className="w-full max-w-full bg-white hidden sm:block md:block lg:block xl:block 2xl:block md:visible border border-gray-200 dark:shadow-[0_20px_50px_rgba(255,_255,_255,_0.3)] shadow-[0_20px_50px_rgba(0,_2,_2,_0.7)] rounded-lg dark:bg-black dark:border-gray-700"
              >
                <img className="rounded-t-lg w-full h-32 object-cover p-4" src={game.image} alt={game.name} />
                <div className="p-5">
                  <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    {game.title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{game.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </>
    );
};

export default HeroFeatures;