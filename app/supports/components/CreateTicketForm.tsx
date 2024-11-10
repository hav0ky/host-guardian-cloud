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
                const response = await axios.post('/api/auth/support/getsupport/createsupport', ticketData);

                if (response.status === 201) {
                    setSubject('');
                    setDepartment('');
                    setPriority('');
                    setMessage('');
                    setErrors({});
                }
                setLoading(false);
                const newTicketId = response.data.ticketId;
                try {
                    await axios.post("/api/auth/support/messages", {
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



    const [messages, setMessages] = useState<MessageData[]>([]);
    const [messageText, setMessageText] = useState<string>("");

    const fetchMessages = async (ticketId: number) => {
        try {
            const response = await axios.get(`/api/auth/support/messages/${ticketId}`);
            if (response.status === 200) {
                setMessages(response.data.messages);
            }
        } catch (err) {
            toast.error("Failed to load support tickets.");
            console.error("Error fetching messages:", err);
        }
    };

    useEffect(() => {
        if (selectedTicket) {
            fetchMessages(selectedTicket.id);
        }
    }, [selectedTicket]);

    const handleSendMessage = async () => {
        if (!messageText.trim() || !selectedTicket) return;

        try {
            const response = await axios.post("/api/auth/support/messages", {
                ticket_id: selectedTicket.id,
                sender_id: user.id,
                message_text: messageText,
            });

            if (response.status === 201) {
                setMessages([...messages, {
                    id: response.data.messageId,
                    ticket_id: selectedTicket.id,
                    sender_id: user.id,
                    message_text: messageText,
                    created_at: new Date(),
                }]);
                setMessageText("");
            } else {
                toast.error("Failed to send message.");
            }
        } catch (err) {
            console.error("Error sending message:", err);
            toast.error("An unexpected error occurred while sending the message.");
        }
    };

    return (
        <Card className="w-full">
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
                            <div className="border rounded-md p-2 dark:border-neutral-700 border-input">
                                <div className="flex space-x-2 mb-2">
                                    <Button variant="outline" size="icon" type="button" onClick={() => applyStyle("bold")}>
                                        <Bold className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" type="button" onClick={() => applyStyle("italic")}>
                                        <Italic className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" type="button" onClick={() => applyStyle("heading")}>
                                        <span className="font-bold">H</span>
                                    </Button>
                                    <Button variant="outline" size="icon" type="button" onClick={() => applyStyle("unordered-list")}>
                                        <List className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" type="button" onClick={() => applyStyle("code")}>
                                        <Code className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" type="button" onClick={() => applyStyle("quote")}>
                                        <Quote className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Tabs defaultValue="write">
                                    <TabsList className="mb-2">
                                        <TabsTrigger value="write">Write</TabsTrigger>
                                        <TabsTrigger value="preview">Preview</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="write">
                                        <textarea
                                            id="message"
                                            placeholder="Describe your issue in detail"
                                            required
                                            className="w-full min-h-[150px] p-2 border rounded dark:bg-black dark:border-neutral-700"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                    </TabsContent>
                                    <TabsContent value="preview">
                                        <div
                                            className="w-full min-h-[150px] p-2 border rounded prose dark:prose-invert dark:border-gray-600"
                                            dangerouslySetInnerHTML={renderPreview()}
                                        />
                                    </TabsContent>
                                </Tabs>
                            </div>
                            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                        </div>
                    </div>
                    <CardFooter className="flex justify-end space-x-2 mt-6">
                        <Button variant="outline" type="button" onClick={() => toast.info("Ticket creation canceled.")}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Submitting..." : "Submit Ticket"}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
};

export default CreateTicketForm;
