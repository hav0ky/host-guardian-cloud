import { lucia } from "@/lib/auth";
import query from "@/lib/db"
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()

        const existing_user = await query.users.get_by_email(email);

        if (!existing_user) {
            return new Response("User does not exist!", {
                status: 404
            });
        }

        const valid_pass = await bcrypt.compare
            (password, existing_user.password)

        if (!valid_pass) {
            return new Response("Password does not match!", {
                status: 404
            });
        }

        const session = await lucia.createSession(existing_user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

        return new Response("User logged in successfully!", {
            status: 200
        });

    } catch (error) {
       // console
        return new Response("Something went wrong :(", {
            status: 500
        });
    }
}