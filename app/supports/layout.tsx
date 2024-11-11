"use client";

import { ReactNode, useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import axios from 'axios';
import { LoadingSpinner } from '@/components/ui/loader';
import { GET_SUPPORT_TICKET_URL } from './apiConstants';

interface SupportLayoutProps {
    children: ReactNode;
}

interface Ticket {
    id: number;
    name: string;
}

const SupportLayout: React.FC<SupportLayoutProps> = ({ children }) => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true)
            try {
                const response = await axios.get(GET_SUPPORT_TICKET_URL);
                setTickets(response.data.tickets);
                setLoading(false)

            } catch (error) {
                console.error("Error fetching tickets:", error);
                setLoading(false)
            }
        };

        fetchTickets();
    }, []);
    if (loading) return <LoadingSpinner/>;

    return (
        <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto mt-20 dark:bg-neutral-950-800 text-black dark:text-white">
            <div className="w-full md:w-1/4 xl:w-1/5">
                <Sidebar tickets={tickets} />
            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
};

export default SupportLayout;
