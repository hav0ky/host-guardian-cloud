import axios from 'axios';
 export async function POST(request: Request) {

    try {
        const data = await request.json();
        if (!data.name || !data.user || !data.egg || !data.docker_image || !data.startup) {
            return new Response("Missing required fields", { status: 400 });
        }
        console.log(data.name, data.user, data)
        // const serverResponse = await axios.post(apiConfig.urls.createGameServer, data, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //         'Authorization': `Bearer ${process.env.PT_TOKEN_SECRET}`
        //     }
        // });
        // return new Response(JSON.stringify(serverResponse.data), { status: 201 });

    } catch (error) {
        console.error("Error creating server:", error);
        if (axios.isAxiosError(error)) {
            return new Response(`Failed to create server: ${error.response?.data || error.message}`, {
                status: error.response?.status || 500
            });
        }
        return new Response("Something went wrong, Please Try again", {
            status: 500
        });
    }
}
