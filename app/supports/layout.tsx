"use client";

import { ReactNode, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import { SupportTicketsProvider } from "./SupportTicketsContext";
import axios from "axios";
import { GET_SUPPORT_TICKET_COUNT } from "./apiConstants";
import TicketStats from "./components/TicketStatus";
import { useUser } from "./useUserHooks";

interface SupportLayoutProps {
    children: ReactNode;
}

const SupportLayout: React.FC<SupportLayoutProps> = ({ children }) => {
    const { user } = useUser();

    const isAdmin = user?.role === 'admin';

    const [ticketCount, setTicketCount] = useState({
        total: 0,
        open: 0,
        inProgress: 0,
        closed: 0,
    });

    useEffect(() => {
        const fetchTicketData = async () => {
            try {
                const ticketRes = await axios.get(`${GET_SUPPORT_TICKET_COUNT}`);
                console.log(ticketRes.data.counts, "success");
                setTicketCount(ticketRes.data.counts);
            } catch (err) {
                console.error("Error fetching ticket details:", err);
            }
        };

        fetchTicketData();
    }, []);

    return (
        <SupportTicketsProvider>
            <div className="flex flex-col w-full max-w-7xl mx-auto mt-10 dark:bg-neutral-950-800 text-black dark:text-white">
                {/* Stats Section */}
               {isAdmin ? <div className="mb-6 px-4 md:px-0">
                    <TicketStats
                        total={ticketCount.total}
                        open={ticketCount.open}
                        inProgress={ticketCount.inProgress}
                        closed={ticketCount.closed}
                    />
                </div>: null}

                {/* Sidebar and Main Content Section */}
                <div className="flex flex-col md:flex-row px-4 md:px-0">
                    {/* Sidebar */}
                    <div className="w-full md:w-1/4 xl:w-1/5">
                        <Sidebar />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {children}
                    </div>
                </div>
            </div>
        </SupportTicketsProvider>
    );
};

export default SupportLayout;
