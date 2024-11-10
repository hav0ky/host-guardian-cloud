"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Ticket {
    id: number;
    subject: string;
    status: string;
    created_at: string;
}

interface TicketTableProps {
    tickets: Ticket[];
}

const TicketTable: React.FC<TicketTableProps> = ({ tickets }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (tickets) {
            setIsLoading(false);
        }
    }, [tickets]);

    const handleTicketSelect = (ticket: Ticket) => {
        router.push(`/supports/ticket/${ticket.id}`);
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>My Support Tickets</CardTitle>
                <CardDescription>View your recent support tickets below.</CardDescription>
            </CardHeader>
            <CardContent>
                {tickets.length > 0  ? (
                    <div className="overflow-x-auto">
                        <Table className="min-w-full bg-white dark:bg-neutral-900 rounded-md shadow-md overflow-hidden">
                            <TableHeader className="bg-gray-100 dark:bg-neutral-800">
                                <TableRow>
                                    <TableHead className="py-3 px-6 text-left text-gray-700 dark:text-gray-300 uppercase text-xs">
                                        ID
                                    </TableHead>
                                    <TableHead className="py-3 px-6 text-left text-gray-700 dark:text-gray-300 uppercase text-xs">
                                        Subject
                                    </TableHead>
                                    <TableHead className="py-3 px-6 text-left text-gray-700 dark:text-gray-300 uppercase text-xs">
                                        Status
                                    </TableHead>
                                    <TableHead className="py-3 px-6 text-left text-gray-700 dark:text-gray-300 uppercase text-xs">
                                        Date
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="text-gray-600 dark:text-gray-400 text-sm font-light">
                                {tickets.map((ticket) => (
                                    <TableRow
                                        key={ticket.id}
                                        onClick={() => handleTicketSelect(ticket)}
                                        className="border-b border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                                    >
                                        <TableCell className="py-3 px-6 whitespace-nowrap font-medium">
                                            {ticket.id}
                                        </TableCell>
                                        <TableCell className="py-3 px-6">{ticket.subject}</TableCell>
                                        <TableCell className="py-3 px-6">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    ticket.status === "open"
                                                        ? "bg-green-200 text-green-800"
                                                        : ticket.status === "in progress"
                                                        ? "bg-yellow-200 text-yellow-800"
                                                        : "bg-red-200 text-red-800"
                                                }`}
                                            >
                                                {ticket.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="py-3 px-6 whitespace-nowrap">
                                            {new Date(ticket.created_at).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
                        No tickets available. You haven’t created any support tickets yet.
                    </p>
                )}
            </CardContent>
        </Card>
    );
};

export default TicketTable;
