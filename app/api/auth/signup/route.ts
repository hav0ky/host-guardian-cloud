import { lucia } from "@/lib/auth";
import query from "@/lib/db";
import bcrypt from 'bcrypt';
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const { username, email, password } = await request.json()
        const existing_user = await query.users.get_by_email(email);

        if (existing_user) {
            return new Response("User already exists!", {
                status: 404
            });
        }

        const id = generateIdFromEntropySize(10);
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        await query.users.create({
            id,
            username,
            email,
            password: hashedPassword
        })

        const session = await lucia.createSession(id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

        return new Response("User created successfully!", {
            status: 200
        });

    } catch (error) {
        return new Response("Something went wrong :(", {
            status: 500
        });
    }
}