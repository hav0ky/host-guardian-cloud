"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PlusCircle, List, Clipboard } from "lucide-react"; // Import icons from lucide-react
import { Separator } from "@/components/ui/separator"; // Divider component
import { LoadingSpinner } from "@/components/ui/loader";
import { useEffect } from "react";
import { useUser } from "../useUserHooks";
import { useSupportTickets } from "../SupportTicketsContext";
import { Ticket } from "../types";

// interface Ticket {
//     id: number;
//     name: string;
//     last_updated: string;
// }

interface SidebarProps {
    // tickets: Ticket
}

function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));

    if (seconds < 60) return `${seconds} sec ago`;
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr ago`;
    if (days < 30) return `${days} d ago`;
    if (months < 12) return `${months} mon ago`;
    return `${years} years ago`;
}

const Sidebar: React.FC<SidebarProps> = () => {
    const { tickets } = useSupportTickets();
    const router = useRouter();
    const recentTickets = tickets
        .sort((a, b) => new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime())
        .slice(0, 15);

    const handleTicketClick = (ticketId: number) => {
        router.push(`/supports/ticket/${ticketId}`);
    };

    const { user, loading } = useUser();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [loading, user, router]);

    if (loading) return <LoadingSpinner />;
    if (!user) return null;

    return (
        <div className="h-full overflow-y-auto space-y-4">
            {/* Create Ticket Button */}
            {user?.role !== 'admin' && (
                <>
                    <Button
                        onClick={() => router.push("/supports/createtickets")}
                        className="w-full mb-4 flex items-center space-x-2"
                    >
                        <PlusCircle className="h-5 w-5" />
                        <span>Create New Ticket</span>
                    </Button>
                    {/* Divider */}
                    <Separator className="my-4" />
                </>
            )}

            {/* Recent Tickets Section */}
            <Card className="">
                <CardHeader>
                    <div className="flex items-center space-x-2">
                        <List className="h-5 w-5" />
                        <CardTitle className="text-md font-semibold">Recent Tickets</CardTitle>
                    </div>
                </CardHeader>
                <CardContent
                    className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-700"
                    style={{
                        scrollbarWidth: 'thin',
                    }}
                >
                    {recentTickets.length > 0 ? (
                        recentTickets.map((ticket, index) => (
                            <div key={ticket.id}>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-between text-left text-sm"
                                    onClick={() => handleTicketClick(ticket.id)}
                                >
                                    <span>
                                        #{ticket.id} - {ticket.name}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {formatRelativeTime(ticket.last_updated)}
                                    </span>
                                </Button>
                                {index < recentTickets.length - 1 && (
                                    <Separator className="border-gray-200 dark:border-neutral-700" />
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">No recent tickets</p>
                    )}
                </CardContent>


            </Card>

            {/* Divider */}
            <Separator className="my-4" />

            {/* My Support Tickets Section */}
            <Card>
                <CardHeader>
                    <div className="flex items-center space-x-2">
                        <Clipboard className="h-5 w-5" />
                        <CardTitle className="text-md font-semibold">Support</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-left flex items-center space-x-2"
                        onClick={() => router.push("/supports")}
                    >
                        <span>My Support Tickets</span>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Sidebar;
