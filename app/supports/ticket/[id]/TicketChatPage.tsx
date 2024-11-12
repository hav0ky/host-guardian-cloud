"use client";

import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { useParams, useRouter } from "next/navigation"; // Use router for page refresh
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/loader";
import SupportContentWrapper from "../../components/SupportContentWrapper";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { GET_SUPPORT_TICKET_URL, MSG_URL, UPDATE_SUPPORT_URL } from "../../apiConstants";
import TextEditor from "../../components/TextEditor";
import { Lock } from 'lucide-react';

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
    const router = useRouter(); // For page refresh
    const [ticket, setTicket] = useState<SupportTicketData | null>(null);
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [messageText, setMessageText] = useState<string>("");
    const [shouldReset, setShouldReset] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState<'close' | 'reopen'>('close'); // For dialog type

    const isAdmin = user.role === 'admin';

    async function updateTicketStatus(ticketId: string, status: string) {
        try {
            const response = await axios.patch(UPDATE_SUPPORT_URL, { ticketId, status });
            if (response.data.success) {
                toast.success(`Ticket status updated to ${status}`);
                setTicket(prevTicket => prevTicket ? { ...prevTicket, status } : null);
                router.refresh(); // Refresh page to reflect status change
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
                const ticketResponse = await axios.get(`${GET_SUPPORT_TICKET_URL}/${ticketId}`);
                setTicket(ticketResponse.data.ticket);

                const messagesResponse = await axios.get(`${MSG_URL}/${ticketId}`);
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
            const response = await axios.post(MSG_URL, {
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
            setShouldReset(true);
        } catch (err) {
            console.error("Error sending message:", err);
            toast.error("Failed to send message.");
        }
    };

    const handleConfirmCloseTicket = () => {
        updateTicketStatus(ticketId, 'closed');
        setIsDialogOpen(false);
    };

    const handleReopenTicket = async () => {
        try {
            await updateTicketStatus(ticketId, 'open');
            setTicket(prevTicket => prevTicket ? { ...prevTicket, status: 'open' } : null);
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Error reopening ticket:", error);
            toast.error("Failed to reopen ticket.");
        }
    };

    const handleResetComplete = () => {
        setShouldReset(false);
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
                    <div className="ml-auto flex items-center space-x-4">
                        {ticket?.status === "closed" && (
                            <>
                                <Button variant="secondary" onClick={() => {
                                    setDialogType('reopen');
                                    setIsDialogOpen(true);
                                }}>
                                    Reopen
                                </Button>
                                <Lock className="w-5 h-5 text-gray-500" />
                            </>
                        )}
                        <Button
                            onClick={() => {
                                setDialogType('close');
                                setIsDialogOpen(true);
                            }}
                            disabled={ticket.status === "closed"}
                        >
                            {ticket?.status === "closed" ? "Closed" : "Close"}
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
                                    className={`p-3 max-w-lg w-fit rounded-lg ${messageAlignment} text-black dark:text-white`}
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
                                    <p
                                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(msg.message_text) }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className="dark:border-neutral-700 border-input mt-10">
                        <TextEditor wordLimit={50} handleChange={setMessageText} initialContent={''} placeHolderText={'Type your message...'}
                            shouldReset={shouldReset} onResetComplete={handleResetComplete} />
                    </div>
                </CardContent>


                <CardFooter className="flex justify-end space-x-2">
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
                        <DialogTitle>
                            {dialogType === 'close' ? 'Are you sure you want to close this ticket?' : 'Are you sure you want to reopen this ticket?'}
                        </DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={dialogType === 'close' ? handleConfirmCloseTicket : handleReopenTicket}>
                            Yes, {dialogType === 'close' ? 'Close' : 'Reopen'} Ticket
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </SupportContentWrapper>
    );
}
