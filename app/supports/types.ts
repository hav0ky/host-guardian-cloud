
export interface Ticket {
    filter(arg0: (ticket: Ticket) => boolean): unknown;
    id: number;
    name: string;
    email: string;
    subject: string;
    department: string;
    priority: string;
    message: string;
    status: string;
    created_at: string;
    last_updated: string;
    admin_replied: string;
}

export interface MessageData {
    id: number;
    ticket_id: number;
    sender_id: string;
    message_text: string;
    created_at: Date;
    last_updated: Date;
}

export interface SU_ERROR{
    subject: string;
    department: string;
    priority: string;
    message: string;
}
