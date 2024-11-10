
interface Ticket {
    id: number;
    subject: string;
    status: string;
    created_at: string;
}

interface MessageData {
    id: number;
    ticket_id: number;
    sender_id: string;
    message_text: string;
    created_at: Date;
    last_updated: Date;
}