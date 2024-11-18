import { RowDataPacket } from "mysql2";

// User Interface
export interface SA_User {
    id: string;
    username: string;
    email: string | undefined;
    password: string;
    avatar: string;
    role: "member" | "admin";
    created_at: Date;
    password?: string | undefined;
    created_at?: string | undefined;
}

export interface CREATE_PANEL_USER{
    email: string | undefined;
    username: string | undefined;
    first_name: string | undefined;
    last_name: string,
    password: string
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
        id: number; // Required, based on DB_PanelUsers and PANEL_USER_RESULT
        user_id: number; // Required, based on DB_PanelUsers
        username: string; // Required, based on DB_PanelUsers
        email: string; // Required, based on DB_PanelUsers
        password: string; // Required, based on all interfaces
        uuid: string; // Required, based on DB_PanelUsers
        first_name: string; // Required, based on DB_PanelUsers
        last_name: string; // Required, based on PANEL_USER and PANEL_USER_RESULT
        external_id: string | null; // Optional in PANEL_USER, required in DB_PanelUsers
        language?: string; // Optional, based on PANEL_USER
        root_admin: boolean; // Required, based on DB_PanelUsers
        "2fa": boolean; // Required, based on DB_PanelUsers
        created_at: string; // Required, based on DB_PanelUsers
        updated_at: string; // Required, based on DB_PanelUsers
    }
export interface PANEL_USER {
    email: string | undefined;
    username: string | undefined;
    first_name: string | undefined;
    last_name: string,
    password: string
    id?: number | undefined;
    external_id?: string | null;
    uuid?: string;
    language?: string;
    root_admin?: boolean;
    "2fa"?: boolean; 
    created_at?: string; 
    updated_at?: string; 
    user_id?: number;
    id: number | undefined;
}
export interface PANEL_USER_RESULT {
    email: string | undefined;
    username: string | undefined;
    first_name: string | undefined;
    last_name: string,
    password: string
    id?: number | undefined;
    external_id?: string | null;
    uuid?: string;
    language?: string;
    root_admin?: boolean;
    "2fa"?: boolean; 
    created_at?: string;
    updated_at?: string;
    user_id?: number;
    id: number;
}
