import { NextResponse } from 'next/server';
import { validateRequest } from '@/lib/auth';
import query from '@/lib/db';

export async function GET(request: Request) {
    try {
        const { user } = await validateRequest();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        let tickets;
        if (user.role === 'admin') {

          tickets = await query.support.getAllSupportTickets();
        } else {
            tickets = await query.support.getSupportTicketsByEmail(user.email);
        }

        return NextResponse.json({ success: true, tickets }, { status: 200 });
    } catch (error) {
        console.error('Error retrieving support tickets:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
