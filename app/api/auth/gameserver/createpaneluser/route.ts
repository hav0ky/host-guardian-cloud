import { NextResponse } from 'next/server';
import query from '@/lib/db';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { username, email, first_name, last_name, language, root_admin, password } = data;

        if (!username || !email || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        const [existingUser] = await query.gameservers.getPanelUserByEmail(email);
        if (existingUser.length > 0) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }

        const [result] = await query.gameservers.createPanelUser(data)

        return NextResponse.json({ message: 'User created successfully', userId: result.insertId }, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
