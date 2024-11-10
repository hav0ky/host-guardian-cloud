"use client";

import { useEffect, useState } from 'react';
import TicketTable from './components/TicketTable';
import axios from 'axios';
import SupportContentWrapper from './components/SupportContentWrapper';
import { useRouter, useSearchParams } from 'next/navigation';


const SupportsPage: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    const router = useRouter();
    const searchParams = useSearchParams();
    const newTicketId = searchParams.get("newTicketId");

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get("/api/auth/support/getsupport/getsupporttickets");
                let fetchedTickets = response.data.tickets;

                if (newTicketId) {
                    const newTicket = fetchedTickets.find((ticket: any) => ticket.id === parseInt(newTicketId));
                    if (newTicket) {
                        fetchedTickets = [
                            newTicket,
                            ...fetchedTickets.filter((ticket: any) => ticket.id !== parseInt(newTicketId)),
                        ];
                    }
                }

                setTickets(fetchedTickets);
            } catch (error) {
                console.error("Error fetching tickets:", error);
            }
        };

        fetchTickets();
    }, [newTicketId]);

    return (
        <div>
            <SupportContentWrapper>
                <TicketTable tickets={tickets} />
            </SupportContentWrapper>
        </div>
    );
};

export default SupportsPage;
