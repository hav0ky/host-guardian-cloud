import { Lucia } from "lucia";
import { Mysql2Adapter } from "@lucia-auth/adapter-mysql";
import db from "./db/mysql";
import { cookies } from "next/headers";
import { cache } from "react";

import type { Session, User } from "lucia";
import { SA_User } from "@/types/schema";
import { redirect } from "next/navigation";

const adapter = new Mysql2Adapter(db, {
    user: "users",
    session: "sessions"
});

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            // set to `true` when using HTTPS
            secure: process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes: (attributes) => {
        return {
            // attributes has the type of DatabaseUserAttributes
            id: attributes.id,
            username: attributes.username,
            email: attributes.email,
            avatar: attributes.avatar,
            role: attributes.role
        };
    }
});

export const validateRequest = cache(
    async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
        const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
        if (!sessionId) {
            return {
                user: null,
                session: null
            };
        }

        const result = await lucia.validateSession(sessionId);
        // next.js throws when you attempt to set cookie when rendering page
        try {
            if (result.session && result.session.fresh) {
                const sessionCookie = lucia.createSessionCookie(result.session.id);
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            }
            if (!result.session) {
                const sessionCookie = lucia.createBlankSessionCookie();
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            }
        } catch { }
        return result;
    }
);

export const invalidateRequest = async (): Promise<boolean> => {
    const { session } = await validateRequest();
    if (!session) {
        return false
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect('/')
}

// IMPORTANT!
declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: SA_User;
    }
}