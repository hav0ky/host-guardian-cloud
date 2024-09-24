import { lucia } from "@/lib/auth";
import query from "@/lib/db"
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
      
    } catch (error) {
        return new Response("Something went wrong, Please Try again", {
            status: 500
        });
    }
}