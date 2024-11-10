"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/loader";
import SupportContentWrapper from "../../components/SupportContentWrapper";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";

interface SupportTicketData {
    id: number;
    name: string;
    status: string;
}

interface MessageData {
    id: number;
    ticket_id: number;
    sender_id: number;
    message_text: string;
    created_at: Date;
}

export default function TicketChatPage({ user }: { user: any }) {
    const { id: ticketId } = useParams();
    const [ticket, setTicket] = useState<SupportTicketData | null>(null);
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [messageText, setMessageText] = useState<string>("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const isAdmin = user.role === 'admin';

    async function updateTicketStatus(ticketId: string, status: string) {
        try {
            const response = await axios.patch('/api/auth/support/getsupport/updatesupport', { ticketId, status });
            if (response.data.success) {
                console.log('Ticket status updated successfully:', response.data.message);
                toast.success("Ticket status updated successfully");
                setTicket(prevTicket => prevTicket ? { ...prevTicket, status } : null);
            } else {
                console.error('Failed to update ticket status:', response.data.error);
                toast.error("Failed to update ticket status.");
            }
        } catch (error) {
            console.error('Error while updating ticket status:', error);
            toast.error("An error occurred while updating the ticket status.");
        }
    }

    useEffect(() => {
        const fetchTicketData = async () => {
            try {
                const ticketResponse = await axios.get(`/api/auth/support/getsupport/getsupporttickets/${ticketId}`);
                setTicket(ticketResponse.data.ticket);

                const messagesResponse = await axios.get(`/api/auth/support/messages/${ticketId}`);
                setMessages(messagesResponse.data.messages);
            } catch (err) {
                console.error("Error fetching ticket details:", err);
                toast.error("Failed to load ticket details.");
            }
        };

        if (ticketId) fetchTicketData();
    }, [ticketId]);

    const handleSendMessage = async () => {
        if (!messageText.trim() || !ticket) return;

        try {
            const response = await axios.post("/api/auth/support/messages", {
                ticket_id: ticket.id,
                sender_id: user.id,
                message_text: messageText,
            });

            setMessages([
                ...messages,
                {
                    id: response.data.messageId,
                    ticket_id: ticket.id,
                    sender_id: user.id,
                    message_text: messageText,
                    created_at: new Date(),
                },
            ]);
            setMessageText("");
        } catch (err) {
            console.error("Error sending message:", err);
            toast.error("Failed to send message.");
        }
    };

    const handleConfirmCloseTicket = () => {
        updateTicketStatus(ticketId, 'closed');
        setIsDialogOpen(false); // Close the dialog after confirming
    };

    if (!ticket) return <LoadingSpinner />;

    return (
        <SupportContentWrapper>
            <Card>
                <CardHeader className="flex flex-row items-center bg-muted/50">
                    <div className="grid gap-0.5">
                        <CardTitle className="text-lg">
                            Chat for Ticket: #{ticket?.id} {ticket?.name}
                        </CardTitle>
                        <CardDescription>Status: {ticket?.status}</CardDescription>
                    </div>
                    <div className="ml-auto">
                        <Button onClick={() => setIsDialogOpen(true)} disabled={ticket.status === "closed"}>
                            Close
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="space-y-4 mt-4">
                        {messages.map((msg) => {
                            const isMessageFromAdmin = msg.sender_id === user.id && isAdmin;
                            const isOwnMessage = msg.sender_id === user.id;

                            const messageAlignment = isOwnMessage
                                ? "ml-auto bg-neutral-100 dark:bg-neutral-800 text-right"
                                : "mr-auto bg-neutral-200 dark:bg-neutral-700 text-left";

                            const messageLabel = isOwnMessage
                                ? "You"
                                : isAdmin
                                ? "User"
                                : "Admin";

                            return (
                                <div
                                    key={msg.id}
                                    className={`p-3 max-w-lg rounded-lg ${messageAlignment} text-black dark:text-white`}
                                >
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                        {`Posted by ${messageLabel} on ${new Intl.DateTimeFormat("en-GB", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        }).format(new Date(msg.created_at))} (${new Intl.DateTimeFormat("en-US", {
                                            hour: "numeric",
                                            minute: "numeric",
                                            second: "numeric",
                                            hour12: true,
                                        }).format(new Date(msg.created_at))})`}
                                    </div>
                                    <p>{msg.message_text}</p>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>

                <CardFooter className="flex items-center space-x-2">
                    <Input
                        placeholder="Type your message..."
                        className="mr-2"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        disabled={ticket.status === "closed"}
                    />
                    <Button
                        onClick={handleSendMessage}
                        disabled={ticket.status === "closed"}
                        className={ticket.status === "closed" ? "opacity-50 cursor-not-allowed" : ""}
                    >
                        Send
                    </Button>
                </CardFooter>
            </Card>

            {/* Confirmation Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to close this ticket?</DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleConfirmCloseTicket}>
                            Yes, Close Ticket
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </SupportContentWrapper>
    );
}
