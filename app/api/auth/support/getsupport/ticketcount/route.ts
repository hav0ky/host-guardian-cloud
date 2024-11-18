import { NextResponse } from 'next/server';
import { validateRequest } from '@/lib/auth';
import query from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const counts = await query.support.getTicketCounts();
        return NextResponse.json({ success: true, counts }, { status: 200 });
    } catch (error) {
        console.error('Error retrieving ticket counts:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
