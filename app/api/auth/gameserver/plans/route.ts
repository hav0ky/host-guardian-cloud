import query from "@/lib/db";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const game_id = searchParams.get('game_id');
    const planName = searchParams.get('planName');
    if (!game_id || !planName) {
        return new Response("Missing query parameters", {
            status: 400,
        });
    }

    try {
        const userServer = await query.gameservers.getPlanById(game_id, planName);
        if (!userServer) {
            return new Response("'User server not found'", {
                status: 404,
            });
        }
        return new Response(JSON.stringify(userServer), {
            status: 200
        });
    } catch (err) {
        console.error('[API] Error while fetching user server:', err);
        return new Response("'Internal server error'", {
            status: 500,
        });
    }
}
