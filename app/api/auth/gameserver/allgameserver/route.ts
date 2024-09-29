import query from "@/lib/db";

export async function GET() {
    try {
        const userServer = await query.gameservers.getAll();
        if (!userServer) {
            return new Response("'User server not found", {
                status: 404,
            });
        }
        return new Response(JSON.stringify(userServer), {
            status: 200
        });
    } catch (err) {
        console.error('[API] Error while fetching user server:', err)
        return new Response("'Internal server error", {
            status: 500,
        });
    }
}