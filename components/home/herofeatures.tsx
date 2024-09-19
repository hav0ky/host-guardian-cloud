"use client"
import React, { useEffect, useState } from 'react';
import { Gauge, ShieldCheck, UserRoundCog } from 'lucide-react';

interface Hero_Feature {
  title: string;
  subtitle: string;
  image: React.ReactNode;
}

const HeroFeatures: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 100);
  }, []);

  const games: Hero_Feature[] = [
    {
      title: "High Performance",
      subtitle: "Experience ultra-fast, low-latency gameplay with our high-performance servers.",
      image: <Gauge size={110} />,
    },
    {
      title: "DDoS Protection",
      subtitle: "Stay safe from attacks with advanced DDoS protection. Our robust security ensures your servers remain online and stable.",
      image: <ShieldCheck size={102} />,
    },
    {
      title: "Built by Experts",
      subtitle: "Crafted by experts with years of experience. Designed to deliver unmatched reliability.",
      image: <UserRoundCog size={102} />,
    },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-around gap-8 md:gap-16 my-6 pt-8">
        {games.map((game: Hero_Feature, index: number) => (
          <div
            key={index}
            className={`w-full max-w-full bg-neutral-100 dark:bg-black sm:flex md:flex lg:flex xl:flex 2xl:flex md:visible border border-neutral-200/55 dark:border-neutral-900 shadow-lg rounded-lg flex-col md:flex-row hover:-translate-y-2
            transform transition-all duration-7-00 ease-out ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} 
            style={{ transitionDelay: `${index * 0.2}s` }}
          >
            {/* Left Section: Title & Subtitle */}
            <div className="p-5 md:w-[70%] flex flex-col justify-center">
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                {game.title}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {game.subtitle}
              </p>
            </div>

            {/* Right Section: Image */}
            <div className="p-5 md:w-[30%] flex justify-center items-center">
              {game.image}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HeroFeatures;
