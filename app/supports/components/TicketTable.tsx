"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "../useUserHooks";
import { LoadingSpinner } from "@/components/ui/loader";
import { Ticket } from "../types";


interface TicketTableProps {
    tickets: Ticket[];
}

const TicketTable: React.FC<TicketTableProps> = ({ tickets }) => {
    const router = useRouter();
    const { user, loading } = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterPriority, setFilterPriority] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterOpenOneMessage, setFilterOpenOneMessage] = useState(false);
    const entriesPerPage = 10;

    useEffect(() => {
        if (tickets) {
            setIsLoading(false);
        }
    }, [tickets]);

    const handleTicketSelect = (ticket: Ticket) => {
        router.push(`/supports/ticket/${ticket.id}`);
    };

    const isAdmin = user?.role === 'admin';

    // Filter tickets based on search term, priority, status, and "open with one message"
    const filteredTickets = tickets.filter((ticket) => {
        const matchesSearch = isAdmin
            ? ticket.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.priority?.toLowerCase().includes(searchTerm.toLowerCase())
            : ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesPriority = filterPriority ? ticket.priority === filterPriority : true;
        const matchesStatus = filterStatus ? ticket.status === filterStatus : true;
        const matchesOpenOneMessage = filterOpenOneMessage ? (ticket.admin_replied === "false") : true;
        console.log(ticket.admin_replied, "aaa")
        return matchesSearch && matchesPriority && matchesStatus && matchesOpenOneMessage;
    });

    const totalPages = Math.ceil(filteredTickets.length / entriesPerPage);
    const paginatedTickets = filteredTickets.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-col lg:flex-row items-start lg:items-center bg-muted/50 gap-4 w-full">
                {!isAdmin ? (
                    <div className="flex-grow w-full lg:w-auto">
                        <CardTitle className="text-lg">My Support Tickets</CardTitle>
                        <CardDescription>
                            {isAdmin ? "View all support tickets submitted by users below." : "View your recent support tickets below."}
                        </CardDescription>
                    </div>
                ) : null}
                <div className="w-full lg:w-1/3 flex items-center lg:mt-2">
                    <input
                        type="text"
                        placeholder={isAdmin ? "Search by name, email, subject, department, or priority" : "Search by subject"}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-neutral-700 rounded-md dark:bg-neutral-900 dark:text-white h-[40px] lg:h-auto"
                    />
                </div>

                {/* Admin Filters */}
                {isAdmin && (
                    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-start mb-3 lg:items-center lg:mt-0">
                        <select
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value)}
                            className="w-full sm:w-auto p-2 border border-gray-300 dark:border-neutral-700 rounded-md dark:bg-neutral-900 dark:text-white h-[40px] lg:h-auto"
                        >
                            <option value="">Filter by Priority</option>
                            <option value="urgent">Urgent</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full sm:w-auto p-2 border border-gray-300 dark:border-neutral-700 rounded-md dark:bg-neutral-900 dark:text-white h-[40px] lg:h-auto"
                        >
                            <option value="">Filter by Status</option>
                            <option value="open">Open</option>
                            <option value="in progress">In Progress</option>
                            <option value="closed">Closed</option>
                        </select>
                        <label className="flex items-center w-full sm:w-auto text-gray-700 dark:text-gray-300 lg:h-auto">
                            <input
                                type="checkbox"
                                checked={filterOpenOneMessage}
                                onChange={() => setFilterOpenOneMessage(!filterOpenOneMessage)}
                                className="mr-2 h-[20px]"
                            />
                            Admin not Replied
                        </label>
                    </div>
                )}
            </CardHeader>





            <CardContent>
                {filteredTickets.length > 0 ? (
                    <div className="overflow-x-auto mt-3">
                        <Table className="min-w-full bg-white dark:bg-neutral-900 rounded-md shadow-md overflow-hidden">
                            <TableHeader className="bg-gray-100 dark:bg-neutral-800">
                                <TableRow>
                                    <TableHead className="py-3 px-6 text-left text-gray-700 dark:text-gray-300 uppercase text-sm font-medium">
                                        ID
                                    </TableHead>
                                    <TableHead className="py-3 px-6 text-left text-gray-700 dark:text-gray-300 uppercase text-sm font-medium">
                                        Department
                                    </TableHead>
                                    <TableHead className="py-3 px-6 text-left text-gray-700 dark:text-gray-300 uppercase text-sm font-medium">
                                        Priority
                                    </TableHead>
                                    {isAdmin && (
                                        <>
                                            <TableHead className="py-3 px-6 text-left text-gray-700 dark:text-gray-300 uppercase text-sm font-medium">
                                                Name
                                            </TableHead>
                                            <TableHead className="py-3 px-6 text-left text-gray-700 dark:text-gray-300 uppercase text-sm font-medium">
                                                Email
                                            </TableHead>
                                        </>
                                    )}
                                    <TableHead className="py-3 px-6 text-left text-gray-700 dark:text-gray-300 uppercase text-sm font-medium">
                                        Subject
                                    </TableHead>
                                    <TableHead className="py-3 px-6 text-left text-gray-700 dark:text-gray-300 uppercase text-sm font-medium">
                                        Status
                                    </TableHead>
                                    <TableHead className="py-3 px-6 text-left text-gray-700 dark:text-gray-300 uppercase text-sm font-medium">
                                        Date
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="text-gray-600 dark:text-gray-400 text-base font-medium">
                                {paginatedTickets.map((ticket) => (
                                    <TableRow
                                        key={ticket.id}
                                        onClick={() => handleTicketSelect(ticket)}
                                        className="border-b border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                                    >
                                        <TableCell className="py-3 px-6 whitespace-nowrap font-medium">
                                            {ticket.id}
                                        </TableCell>
                                        <TableCell className="py-3 px-6">{ticket.department}</TableCell>
                                        <TableCell className="py-3 px-6">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${ticket.priority === "urgent"
                                                    ? "bg-purple-200 text-purple-800"
                                                    : ticket.priority === "high"
                                                        ? "bg-red-200 text-red-800"
                                                        : ticket.priority === "medium"
                                                            ? "bg-yellow-200 text-yellow-800"
                                                            : ticket.priority === "low"
                                                                ? "bg-blue-200 text-blue-800"
                                                                : "bg-green-200 text-green-800"
                                                    }`}
                                            >
                                                {ticket.priority}
                                            </span>
                                        </TableCell>
                                        {isAdmin && (
                                            <>
                                                <TableCell className="py-3 px-6">{ticket.name}</TableCell>
                                                <TableCell className="py-3 px-6">{ticket.email}</TableCell>
                                            </>
                                        )}
                                        <TableCell className="py-3 px-6">{ticket.subject}</TableCell>
                                        <TableCell className="py-3 px-6">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${ticket.status === "open"
                                                    ? "bg-green-200 text-green-800"
                                                    : ticket.status === "in progress"
                                                        ? "bg-yellow-200 text-yellow-800"
                                                        : "bg-red-200 text-red-800"
                                                    }`}
                                            >
                                                {ticket.status === "in progress" ? 'InProg' : ticket.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="py-3 px-6 whitespace-nowrap">
                                            {new Date(ticket.created_at).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="flex justify-between items-center mt-4">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="px-4 py-2 bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 rounded-md disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="px-4 py-2 bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 rounded-md disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
                        {isAdmin ? "No support tickets have been submitted yet." : "No tickets available. You haven’t created any support tickets yet."}
                    </p>
                )}
            </CardContent>
        </Card>
    );
};

export default TicketTable;
