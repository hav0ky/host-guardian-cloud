import { RowDataPacket } from "mysql2";

// User Interface
interface SA_User {
    id: string;
    username: string;
    email: string;
    password: string;
    avatar: string;
    role: "member" | "admin";
    created_at: Date;
}

// Discord User Interface
interface DiscordUser {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: string | null;
    accent_color: number;
    global_name: string;
    avatar_decoration_data: string | null;
    banner_color: string;
    clan: string | null;
    mfa_enabled: boolean;
    locale: string;
    premium_type: number;
}

// Session Interface
interface SA_Session {
    id: string;
    expires_at: Date;
    user_id: string;
    created: Date;
    user_agent: string
    ip: string;
}

// Notifications Interface
interface SA_Notifications {
    id: number;  // Auto-incremented ID
    sender_id: string;
    receiver_id: string;
    team_id: string;
    notification_type: "invite" | "other"
    status: "pending" | "accepted" | "rejected"
    created_at: Date;
}

interface SA_Rule {
    title: string;
    desc: string;
}

interface DB_Count extends RowDataPacket {
    'COUNT(*)': number
}

// database service User Interface
interface DB_UserData {
    userid: string;
    dbid: string;
    dbtype: string;
    dateofcreation: string | null;
    dbconfig: string;
    location: string;
    premium: boolean;
    status: string | null;
    ip: string;
    port: string;
    dbusername: string;
    dbpwd: string;
    plan: string;
}

// Interface for the database products
interface DB_Product {
    id: string;          // e.g., "mysql"
    name: string;        // e.g., "MySQL"
    versions: string[];  // e.g., ["v5.7", "v8.0"]
}

// Interface for the pricing tiers
interface DB_Pricing {
    id: number;          // Auto-incremented ID
    database_id: string; // e.g., "mysql", foreign key to the `databases` table
    tier: string;        // e.g., "free", "paid"
    price: string;       // e.g., 15.00 for $15/month
    cpu: string;         // e.g., "1 vCPU"
    ram: string;         // e.g., "1 GB RAM"
    storage: string;     // e.g., "10 GB Storage"
}

interface DB_GameServer {
    id: string;
    name: string;
    description: string;
    background: string;
    image: string;
}

interface DB_GameServerPricing {
    id: number;
    game_id: string;
    name: string;
    description: string;
    price: number;
    cpu: number;
    ram: number;
    disk: number;
}

interface DB_Location {
    id: number;
    short: string;
    name: string;
}

interface DB_Node {
    id: number;
    name: string;
    location: string;
    ip: string;
    port: number;
}

interface DB_Server {
    id: number;
    name: string;
    ip: string;
    port: number;
}

interface DB_GameServerFeatures { 
    id: string;
    featurename: string;
    iconname: string;
    description:string;
    game_id: number;
}

export type GameServer = {
    id: string;
    name: string;
    description: string;
    background: string;
    image: string;
    planprice: number;
};

export type GamePlans = {
    id: string;
    game_id:string;
    name: string;
    description: string;
    price: number;
    cpu: number;
    ram: number;
    disk: number;
}


export interface DB_PanelUsers {
    id: number;
    username: string;
    email: string;
    password: string;
    uuid: string;
    first_name: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    root_admin: boolean;
}

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
