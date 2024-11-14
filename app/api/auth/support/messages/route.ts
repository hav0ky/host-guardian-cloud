
import { validateRequest } from '@/lib/auth';
import query from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { ticket_id, sender_id, message_text } = await req.json(); 
    const { user } = await validateRequest()
    if (!ticket_id || !sender_id || !message_text) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try {
        const messageId = await query.support.sendMessage({
            ticket_id,
            sender_id,
            message_text,
        });

        if (messageId) {
            await query.support.updateTicketLastUpdated(ticket_id);
            if (user.role === 'admin') {
                await query.support.updateTicketStatus(ticket_id, 'in progress');
                await query.support.updateTicketAdminReplied(ticket_id, 'yes');
            }
            return NextResponse.json({ message: 'Message sent successfully', messageId }, { status: 201 });
        } else {
            return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error in POST /api/messages:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
