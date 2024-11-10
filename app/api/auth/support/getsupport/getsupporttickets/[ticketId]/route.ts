import { NextResponse } from 'next/server';
import { validateRequest } from '@/lib/auth';
import query from '@/lib/db';

export async function GET(request: Request, { params }: { params: { ticketId: number } }) {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const ticketId = params.ticketId;
        console.log("getting here",ticketId)

        const ticket = await query.support.getSupportTicketById(ticketId);

        if (!ticket) {
            return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, ticket }, { status: 200 });
    } catch (error) {
        console.error('Error retrieving support ticket:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
