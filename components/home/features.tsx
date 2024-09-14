import { FileCog, FolderSync, Globe, HeartHandshake, Network, ShieldCheck } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';


interface FeatureCard {
  title: string;
  description: string;
  icon: React.ReactNode; 
}


const featuresData: FeatureCard[] = [

  {
    title: 'SERVERS WORLDWIDE FOR LOWER LATENCY',
    description: 'Enjoy ultra-low latency with globally distributed game servers for the smoothest gameplay.',
    icon: <Globe size={48} />,
  },
  {
    title: 'AUTOMATED PLUGINS INSTALLATION',
    description: 'Easily install modpacks with our automated setup, getting your custom server up and running fast.',
    icon: <FileCog size={48} />,
  },
  {
    title: 'DDOS PROTECTION',
    description: 'Stay secure with advanced DDoS protection, ensuring uninterrupted gaming experiences.',
    icon: <ShieldCheck   size={48}/>,
  },
  {
    title: 'DEDICATED SERVER IP',
    description: 'Get your own dedicated IP for hassle-free server access without extra port numbers.',

    icon: <Network  size={48} />,
  },
  {
    title: 'BACKUPS',
    description: 'Keep your game data safe with automatic backups, letting you restore your server anytime.',
    icon: <FolderSync  size={48}/>,
  },
  {
    title: '24/7/365 SUPPORT',
    description: 'Our expert team is available 24/7 to assist with any server-related issues or questions.',
    icon: <HeartHandshake  size={48} />, 
  }
];

const Features: React.FC = () => {

  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimate(true);
            observer.unobserve(entry.target); 
          }
        });
      },
      { threshold: 0.2 } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-[100vh] flex justify-center items-center align-middle">
      <section
        className="rounded-lg opacity-90 dark:bg-transparent  text-white py-9"
        ref={sectionRef}
      >
        <div className="opacity-90 pointer-events-none"></div>
        <div>
          <h2 className="text-3xl text-black dark:text-white font-bold text-center mb-10">
             FEATURES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-5">
            {featuresData.map((feature, index) => (
              <div
                key={index}
                className={`dark:bg-transparent  dark:text-white bg-neutral-100  flex flex-col text-left border-neutral-200/50 text-black p-6 rounded-lg shadow-lg relative z-10 
                ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} 
                transition-all duration-700 ease-out`}
                style={{ transitionDelay: `${index * 0.2}s` }} 
              >
               <div className='pb-3'>
               {feature.icon}
               </div>
                <h3 className="text-xl dark:text-gray-200 font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-200">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
