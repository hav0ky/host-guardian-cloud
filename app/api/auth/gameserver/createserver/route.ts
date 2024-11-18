import { apiConfig, createPanelUserTD } from '@/app/config/apiconfig';
import { validateRequest } from '@/lib/auth';
import query from '@/lib/db';
import { CREATE_PANEL_USER, DB_PanelUsers } from '@/types/schema';
interface DB_PanelUser extends DB_PanelUsers, RowDataPacket { }

import axios from 'axios';
import { RowDataPacket } from 'mysql2/promise';

export async function POST(request: Request) {
    try {
        // Validate user request and extract data
        const { user } = await validateRequest();
        const data = await request.json();
        // data.node = nodesID;

        const userPass = "Test@123"; 
        const userData: CREATE_PANEL_USER = {
            email: user?.email,
            username: 'pratik212',
            first_name: user?.username,
            last_name: 'test',
            password: userPass
        };

        // Check if user exists in local DB
        let userExist = await query.gameservers.getPanelUserByEmail(userData.email);
        if (!userExist) {
            // Create a new panel user if not found
            const res = await createPanelUserTD(userData);
       
            if (res?.status === 201 && 'data' in res) {
                const datauser = res?.data?.atributes;
                datauser.password = userPass;
                await query.gameservers.createPanelUser(datauser);
                userExist = datauser as DB_PanelUser | null;

            } else if (res?.status === 422) {
                console.log('User already exists on the server.');
            } else {
                throw new Error('Failed to create panel user.');
            }
        }

        data.user = userExist?.id;
        const allocationsResponse = await axios.get(apiConfig.thirdparty.getAllocation, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.PT_TOKEN_SECRET}`
            }
        });
        console.log("Received data:", allocationsResponse);

        const allocationsData = allocationsResponse.data.data;
        console.log("Received allocationsData:", allocationsData);

        const firstAvailableAllocation = allocationsData.find((item: { attributes: { assigned: string; }; }) => !item.attributes.assigned);
        data.allocation = {
            default: firstAvailableAllocation
                ? firstAvailableAllocation.attributes.id
                : allocationsData.length + 1
        };
        console.log("fdinal request data:", data);

        if (!data.startup || !data.docker_image || !data.environment) {
            return new Response("Missing required fields", { status: 400 });
        }

        const serverResponse = await axios.post(apiConfig.thirdparty.createGameServer, data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${process.env.PT_TOKEN_SECRET}`
            }
        });

        return new Response(JSON.stringify(serverResponse.data), { status: 201 });

    } catch (error) {
        console.error("Error creating server:", error);

        // Handle Axios errors
        if (axios.isAxiosError(error)) {
            return new Response(`Failed to create server: ${error.response?.data || error.message}`, {
                status: error.response?.status || 500
            });
        }

        return new Response("Something went wrong, please try again.", {
            status: 500
        });
    }
}
