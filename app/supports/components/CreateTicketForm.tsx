"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Bold, Italic, List, Code, Quote } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { SA_User } from "@/types/schema";
import { useRouter } from "next/navigation";
import { MSG_URL, CREATE_SUPPORT_URL } from "../apiConstants";
import TextEditor from "./TextEditor";
import { Ticket } from "../types";

interface CreateTicketFormProps {
    user: SA_User
}
const CreateTicketForm: React.FC<CreateTicketFormProps> = ({ user }) => {
    // const [tickets, setTickets] = useState<Ticket[]>([]);
    // const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [subject, setSubject] = useState('');
    const [department, setDepartment] = useState('');
    const [priority, setPriority] = useState('');
    const [errors, setErrors] = useState<any>({});
    const [selectedSupportItem, setSelectedSupportItem] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [shouldReset, setShouldReset] = useState(false);

    const name = user.username;
    const email = user.email;
    const userid = user.id;


    const applyStyle = (style: string) => {
        const textarea = document.getElementById("message") as HTMLTextAreaElement;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        let replacement = "";

        switch (style) {
            case "bold":
                replacement = `**${selectedText}**`;
                break;
            case "italic":
                replacement = `*${selectedText}*`;
                break;
            case "heading":
                replacement = `### ${selectedText}`;
                break;
            case "unordered-list":
                replacement = `\n- ${selectedText.split("\n").join("\n- ")}`;
                break;
            case "code":
                replacement = `\`${selectedText}\``;
                break;
            case "quote":
                replacement = `> ${selectedText.split("\n").join("\n> ")}`;
                break;
        }

        const newMessage = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
        setMessage(newMessage);
    };

    const renderPreview = () => {
        let html = message
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>")
            .replace(/### (.*?)\n/g, "<h3>$1</h3>")
            .replace(/- (.*?)(\n|$)/g, "<li>$1</li>")
            .replace(/`(.*?)`/g, "<code>$1</code>")
            .replace(/> (.*?)(\n|$)/g, "<blockquote>$1</blockquote>");
        return { __html: html };
    };
    const handleResetComplete = () => { setShouldReset(false); };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const newErrors: any = {};
        if (!subject.trim()) {
            newErrors.subject = 'Subject is required.';
        }
        if (!department.trim()) {
            newErrors.department = 'Please select a department.';
        }
        if (!priority.trim()) {
            newErrors.priority = 'Please select a priority.';
        }
        if (!message.trim()) {
            newErrors.message = 'Message is required.';
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            const ticketData = {
                name,
                email,
                userid,
                subject,
                department,
                priority,
                message,
            };
            try {
                const response = await axios.post(CREATE_SUPPORT_URL, ticketData);

                if (response.status === 201) {
                    setSubject('');
                    setDepartment('');
                    setPriority('');
                    setMessage('');
                    setErrors({});
                    setShouldReset(true);
                }
                setLoading(false);
                const newTicketId = response.data.ticketId;
                try {
                    await axios.post(MSG_URL, {
                        ticket_id: newTicketId,
                        sender_id: user.id,
                        message_text: message,
                    });
                } catch {
                    console.warn("Message creation failed, but proceeding to redirect.");
                }
                router.push(`/supports?newTicketId=${newTicketId}`);
            } catch (error: any) {
                console.error("Error submitting the ticket:", error);
                if (error.response && error?.response.data && error.response.data.error) {
                    alert(`Error: ${error.response.data.error}`);
                } else {
                    alert("An unexpected error occurred. Please try again later.");
                }
                setLoading(false);

            }
        }
    };






    return (
        <Card className="w-full mb-20">
            <CardHeader>
                <CardTitle>Create Support Ticket</CardTitle>
                <CardDescription>Fill out the form below to submit a new support ticket.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="John Doe" disabled required value={name} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="john@example.com" type="email" disabled required value={email} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                                id="subject"
                                placeholder="Enter the subject of your ticket"
                                required
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                            {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="department">Department</Label>
                                <Select value={department} onValueChange={setDepartment}>
                                    <SelectTrigger id="department">
                                        <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="technical">Technical Support</SelectItem>
                                        <SelectItem value="billing">Billing</SelectItem>
                                        <SelectItem value="sales">Sales</SelectItem>
                                        <SelectItem value="general">General Inquiry</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="priority">Priority</Label>
                                <Select value={priority} onValueChange={setPriority}>
                                    <SelectTrigger id="priority">
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="urgent">Urgent</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.priority && <p className="text-red-500 text-sm">{errors.priority}</p>}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <div className=" dark:border-neutral-700 border-input">
                            <TextEditor wordLimit={50} handleChange={setMessage} initialContent={''} placeHolderText={'Type your message...'} 
                        shouldReset={shouldReset} onResetComplete={handleResetComplete} />

                            </div>
                            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                        </div>
                    </div>
                    <CardFooter className="flex justify-end space-x-2 mt-6">
                        <Button variant="outline" type="button" onClick={() => toast.info("Ticket creation canceled.")}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading || !subject.trim() || !department.trim() || !priority.trim() || !message.trim()}>
                            {loading ? "Submitting..." : "Submit Ticket"}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
};

export default CreateTicketForm;
