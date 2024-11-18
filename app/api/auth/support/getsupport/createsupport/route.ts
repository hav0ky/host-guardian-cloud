import { NextResponse } from 'next/server';
import query from '@/lib/db';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received data:', data);

    const { name, email, subject, department, priority, message, userid } = data;

    if (!name || !email || !subject || !department || !priority || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const ticketId = await query.support.createSupportTicket({
      name,
      email,
      subject,
      department,
      priority,
      message,
      userid,
      created_at: new Date().toISOString(),
      last_updated: new Date().toISOString(),
    });
    if (ticketId) {
      return NextResponse.json({ success: true, ticketId }, { status: 201 });
    } else {
      return NextResponse.json({ error: 'Failed to create support ticket' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error processing support ticket submission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
