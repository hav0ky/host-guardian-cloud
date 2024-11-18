import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { GET_SUPPORT_TICKET_URL } from './apiConstants';
import { LoadingSpinner } from '@/components/ui/loader';
import { Ticket } from './types';


interface SupportTicketsContextType {
    tickets: Ticket[];
    refreshTickets: () => void;
}

const SupportTicketsContext = createContext<SupportTicketsContextType | undefined>(undefined);

export const SupportTicketsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTickets = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(GET_SUPPORT_TICKET_URL);
            setTickets(response.data.tickets);
        } catch (error) {
            console.error("Error fetching tickets:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch tickets only once on component mount
    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const refreshTickets = useCallback(() => {
        fetchTickets();
    }, [fetchTickets]);

    return (
        <SupportTicketsContext.Provider value={{ tickets, refreshTickets }}>
            {loading ? <LoadingSpinner /> : children}
        </SupportTicketsContext.Provider>
    );
};

export const useSupportTickets = (): SupportTicketsContextType => {
    const context = useContext(SupportTicketsContext);
    if (!context) {
        throw new Error("useSupportTickets must be used within a SupportTicketsProvider");
    }
    return context;
};
