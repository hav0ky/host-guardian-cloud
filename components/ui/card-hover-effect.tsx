'use client'
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";


// {
//   id: 'cs2',
//   feature: 'Global Server Locations',
//   iconname: 'Global',
//   description: "We offers game servers worldwide. So, no matter where you are, you'll get the same quality service.",
//   game_id: '4'
// }

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    featurename: string;
    description: string;
    iconname:  string;
    game_id: string;
  }[];
  className?: string;
}) => {

  // {
  //   id: 'cs2',
  //   featurename: 'DDOS PROTECTED',
  //   iconname: 'EarthLock',
  //   description: 'All of our data centres have an enterprise-level of DDOS protection to ensure your server is always online.',
  //   game_id: '1'
  // },

  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={'#'}
          key={item?.game_id}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
            
          </AnimatePresence>
          <Card>
            <CardIcon icon={items.iconname} className="mr-2" />
            <CardTitle>{item.featurename}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-white dark:bg-black border  border-black/[0.2] dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("dark:text-zinc-100 text-zinc-900 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-4 dark:text-zinc-400 text-zinc-600 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};


export const CardIcon = ({
  icon,
  className,
}: {
  icon?: string ; // Restrict to valid Lucide icon names
  className?: string;
}) => {
  type IconComponentType = React.ComponentType<{ size?: number, className?: string }>;

const IconComponent = icon ? (LucideIcons[icon] as typeof LucideIcons[keyof typeof LucideIcons]) : null;
  return (
    <div className={cn("dark:text-zinc-100 text-zinc-900  tracking-wide", className)}>
      {IconComponent ? (
        <IconComponent className="text-zinc-100 font-bold tracking-wide mb-4" size={44} />
      ) : null}
    </div>
  );
};
