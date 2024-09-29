import { apiConfig, createPanelUser, nodesID } from '@/app/config/apiconfig';
import { validateRequest } from '@/lib/auth';
import query from '@/lib/db';
import axios from 'axios';
export async function POST(request: Request, response: Response) {
    try {
        const { user } = await validateRequest();
        const data = await request.json();
        data.node = nodesID;
   
        const userPass = "Test@123"
        const userData = {
            email: 'pratikss@gmaill.com',
            username: 'pratik22',
            first_name: user?.username,
            last_name: 'test',
            password: "Test@123"
        }

        const checkUserExistorNot = await query.gameservers.getPanelUserByEmail(user?.email);
        console.log(checkUserExistorNot,"got the response")


        // const response = await createPanelUser(userData);
        console.log(response.status)
        if(response?.status == 201){
            // let datauser = response?.data?.attributes
        }
        if(response?.status == 422){

        }
        const datauser = {
            id: 5,
            external_id: null,
            uuid: '33064898-d4be-400f-b031-8d2726c7a62a',
            username: 'pratik22',
            email: 'pratikss@gmaill.com',
            first_name: 'test',
            last_name: 'test',
            language: 'en',
            root_admin: false,
            '2fa': false,
            created_at: '2024-09-29T07:48:24+00:00',
            updated_at: '2024-09-29T07:48:24+00:00',
            password: userPass,
            
          }
        //   const res = query.gameservers.createPanelUser(datauser);
        //   console.log("Hello",res)
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
