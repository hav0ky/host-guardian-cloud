import React from 'react';

// Define the type for each card's data
interface FeatureCard {
  title: string;
  description: string;
  icon: string; // Placeholder for icon URL or static image
}

// Define the array of card data
const featuresData: FeatureCard[] = [
  {
    title: '24/7/365 SUPPORT',
    description: 'Get the best customer support of any Minecraft server host. Our average support ticket reply time is under 15 minutes. Our passionate specialists will help get your server up and running.',
    icon: '/img/games/control.png', // Replace with your static image path
  },
  {
    title: 'SERVERS WORLDWIDE FOR LOWER LATENCY',
    description: 'We offer game server hosting at 20 locations worldwide so that you can have low latency wherever you’re located.',
    icon: '/img/games/control.png',
  },
  {
    title: 'AUTOMATED MODPACK INSTALLATION',
    description: 'Our Minecraft server hosting plans include automatic installation, making modpack server hosting a breeze with hundreds of mods and modpacks just a few clicks away.',
    icon: '/img/games/control.png',
  },
  {
    title: 'DDOS PROTECTION',
    description: 'All of our gaming servers are outfitted with DDoS protection to help you avoid downtime, including intentional DDoS attacks.',
    icon: '/img/games/control.png',
  },
  {
    title: 'FREE DEDICATED SERVER IP',
    description: 'When you choose our premium Minecraft server hosting option, your server is on port 25565 by default, so there’s no need to enter extra port numbers after your server IP.',
    icon: '/img/games/control.pngg',
  },
  {
    title: '2+ YEARS OF BACKUPS',
    description: 'We’ll keep server data for nearly three years, letting you go back and resume playing with the same world, settings, and data.',
    icon: '/img/games/control.png',
  },
];

const Features: React.FC = () => {
  return (
    <section className="   rounded-lg  opacity-90 dark:bg-transparent bg-neutral-400/60 text-white py-9 ">
    {/* Background gradient to top-left */}
    <div className=" opacity-90 pointer-events-none"></div>
    
    <div className="    ">
      <h2 className="text-3xl text-black dark:text-white font-bold text-center mb-10">OUR FEATURES</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-5">
        {featuresData.map((feature, index) => (
            <div key={index} className="dark:bg-neutral-950 dark:border-neutral-900 dark:text-white  bg-neutral-200 border flex flex-col text-left border-neutral-300 text-black p-6 rounded-lg shadow-lg relative z-10">
  <img
    src={feature.icon}
    alt={feature.title}
    className="w-12 h-12 mb-4 mx-auto" // Centers the image horizontally
  />
  <h3 className="text-xl dark:text-gray-300/90 font-semibold mb-2">{feature.title}</h3>
  <p className="text-gray-400 ">{feature.description}</p>
</div>

   
        ))}
      </div>
    </div>
  </section>
);
};

export default Features;
