"use client";

import { ReactNode } from 'react';
import Sidebar from './components/Sidebar';
import { SupportTicketsProvider } from './SupportTicketsContext';

interface SupportLayoutProps {
    children: ReactNode;
}

const SupportLayout: React.FC<SupportLayoutProps> = ({ children }) => {
    return (
        <SupportTicketsProvider>
            <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto mt-20 dark:bg-neutral-950-800 text-black dark:text-white">
                <div className="w-full md:w-1/4 xl:w-1/5">
                    <Sidebar tickets={undefined} />
                </div>
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </SupportTicketsProvider>
    );
};

export default SupportLayout;
