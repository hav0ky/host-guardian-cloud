import { apiConfig, nodesID } from '@/app/config/apiconfig';
import { validateRequest } from '@/lib/auth';
import axios from 'axios';
export async function POST(request: Request, response: Response) {
    try {
        const { user } = await validateRequest();
        const data = await request.json();
        data.node = nodesID;
        // const checkUserExistorNot = await  //TODO

        const userData = {
            email: user?.email,
            username: user?.username,
            first_name: user?.username,
            last_name: 'test',
            password: "Test@123"
        }
        const response = await axios.post(apiConfig.thirdparty.createUser, userData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.PT_TOKEN_SECRET}`,
            },
        });
        console.log(response.data.attributes,"createed")

        const datauser = {
            id: 4,
            external_id: null,
            uuid: '9da28a9f-8cc8-4fe4-833d-a6f57f25c77d',
            username: 'test',
            email: 'test@mm.com',
            first_name: 'test',
            last_name: 'test',
            language: 'en',
            root_admin: false,
            
            created_at: '2024-09-28T21:27:57+00:00',
            updated_at: '2024-09-28T21:27:57+00:00'
          }

        // TODO  create User 
         //Final API call completed

        // const allocationsResponse = await axios.get(apiConfig.thirdparty.getAllocation, {
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${process.env.PT_TOKEN_SECRET}`
        //     }
        // });       
        // const allocationsData = allocationsResponse.data.data;
        // console.log("Received allocationsData:", allocationsData);

        // const firstAvailableAllocation = allocationsData.find((item: any) => !item.attributes.assigned);
        // if (firstAvailableAllocation) {
        //     data.allocation.default = firstAvailableAllocation.attributes.id;
        // } else {
        //     const newAllocationId = data.length + 1;
        
        //     data.allocation.default = newAllocationId;
        // }
        // console.log("Received request data:", data);

        // if (!data.startup || !data.docker_image || !data.environment || !data.node) {
        //     console.log("gttttt")
        //     return new Response("Missing required fields", { status: 400 });
        // }
        // const serverResponse = await axios.post(apiConfig.thirdparty.createGameServer, data, {
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
