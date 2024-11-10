import query from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest, { params }: { params: { ticketId: string } }) {
    console.log("Received Ticket ID:", params.ticketId);

    const { ticketId } = params;

    if (!ticketId) {
        return NextResponse.json({ error: 'Ticket ID is required' }, { status: 400 });
    }

    try {
        const messages = await query.support.getMessagesByTicketId(Number(ticketId));

        if (messages) {
            return NextResponse.json({ messages });
        } else {
            return NextResponse.json({ error: 'No messages found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error in GET /api/messages/[ticketId]:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
