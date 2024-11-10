import { NextResponse } from 'next/server';
import query from '@/lib/db';

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    console.log('Received data for status update:', data);

    const { ticketId, status } = data;

    if (!ticketId || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await query.support.updateTicketStatus(ticketId, status);
    if (result) {
      return NextResponse.json({ success: true, message: 'Ticket status updated successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Failed to update ticket status' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error updating ticket status:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
