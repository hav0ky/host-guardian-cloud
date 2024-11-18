"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSupportTickets } from './SupportTicketsContext';
import SupportContentWrapper from './components/SupportContentWrapper';
import TicketTable from './components/TicketTable';
import { Ticket } from './types';
const SupportsPage: React.FC = () => {
    const { tickets } = useSupportTickets();
const [orderedTickets, setOrderedTickets] = useState<Ticket[]>(tickets);

    const searchParams = useSearchParams();
    const newTicketId = searchParams.get("newTicketId");

    useEffect(() => {
        if (newTicketId) {
            const newTicket = tickets.find((ticket) => ticket.id === parseInt(newTicketId));
            if (newTicket) {
                setOrderedTickets([
                    newTicket,
                    ...tickets.filter((ticket) => ticket.id !== parseInt(newTicketId)),
                ]);
            } else {
                setOrderedTickets(tickets);
            }
        } else {
            setOrderedTickets(tickets);
        }
    }, [newTicketId, tickets]);

    return (
        <div>
            <SupportContentWrapper>
                <TicketTable tickets={orderedTickets} />
            </SupportContentWrapper>
        </div>
    );
};

export default SupportsPage;
