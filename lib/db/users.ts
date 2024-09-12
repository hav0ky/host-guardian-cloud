import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import type { DB_Count, SA_User } from '@/types/schema'
import db from './mysql'

interface SA_UserDB extends SA_User, RowDataPacket { }

const Users = {
    getAll: async (page: number = 1, limit: number = 100000): Promise<SA_User[]> => {
        try {
            const [rows] = await db.query<SA_UserDB[]>(
                `SELECT * FROM \`users\` LIMIT ${limit} OFFSET ${(page - 1) * limit}`
            )

            // rows.forEach((admin) => {
            //     if (admin.server_id) admin.server_id = (admin.server_id as unknown as string).split(',')
            //     if (admin.flags && !(admin.flags as string).startsWith('#')) {
            //         admin.flags = (admin.flags as string).split(',') as Flag[]
            //     }
            // })

            return rows
        } catch (err) {
            console.log(`[DB] Error while getting all users: ${err}`)
            return []
        }
    },
    get_by_email: async (email: string): Promise<SA_User | null> => {
        try {
            const [rows] = await db.query<SA_UserDB[]>('SELECT * FROM `users` WHERE email = ?', [email])
            if (!rows.length || rows.length < 1) return null

            const user = rows[0]

            return user
        } catch (err) {
            console.log(`[DB] Error while getting the admin: ${err}`)
            return null
        }
    },
    get_all_safe: async (): Promise<SA_User[]> => {
        try {
            const [rows] = await db.query<SA_UserDB[]>(
                `SELECT id, name, discord_id, steam, avatar, role, created FROM \`users\``
            )
            return rows
        } catch (err) {
            console.log(`[DB] Error while getting all users: ${err}`)
            return []
        }
    },
    get_token_by_id: async (user_id: string): Promise<string | null> => {
        try {
            const [rows] = await db.query<SA_UserDB[]>('SELECT github_access_token FROM `users` WHERE id = ?', [user_id]);
            if (!rows.length) return null;
            // console.log(rows)
            const { github_access_token } = rows[0];
            return github_access_token;
        } catch (err) {
            console.log(`[DB] Error while getting the token: ${err}`);
            return null;
        }
    },
    get_by_github_id: async (github_id: string): Promise<SA_User | null> => {
        try {
            const [rows] = await db.query<SA_UserDB[]>('SELECT * FROM `users` WHERE github_id = ?', [github_id])
            if (!rows.length || rows.length < 1) return null

            const user = rows[0]
            // if (admin.server_id) admin.server_id = (admin.server_id as unknown as string).split(',')
            // if (admin.flags && !(admin.flags as string).startsWith('#')) {
            //     admin.flags = (admin.flags as string).split(',') as Flag[]
            // }

            return user
        } catch (err) {
            console.log(`[DB] Error while getting the admin: ${err}`)
            return null
        }
    },
    getById: async (userId: string): Promise<SA_User | null> => {
        try {
            const [rows] = await db.query<SA_UserDB[]>('SELECT * FROM `users` WHERE id = ?', [userId])
            if (!rows.length || rows.length < 1) return null

            const user = rows[0]
            // if (admin.server_id) admin.server_id = (admin.server_id as unknown as string).split(',')
            // if (admin.flags && !(admin.flags as string).startsWith('#')) {
            //     admin.flags = (admin.flags as string).split(',') as Flag[]
            // }

            return user
        } catch (err) {
            console.log(`[DB] Error while getting the admin: ${err}`)
            return null
        }
    },
    create: async (props: Partial<SA_User>): Promise<number | null> => {
        try {
            const keys = Object.keys(props)
            const values = Object.values(props)

            const [rows] = await db.query<ResultSetHeader>(
                `INSERT INTO users (${keys.join(', ')}, created_at) VALUES (${keys.map(() => '?').join(', ')}, NOW())`,
                values
            )

            return rows.insertId
        } catch (err) {
            console.log(`[DB] Error while creating user: ${err}`)
            return null
        }
    },
    update: async (id: string, props: Partial<SA_User>): Promise<boolean> => {
        try {
            const keys = Object.keys(props)

            const [rows] = await db.query<ResultSetHeader>(
                `UPDATE \`users\` SET ${keys.map((f) => `${f} = ?`).join(', ')} WHERE id = ?`,
                [...Object.values(props), id]
            )

            return rows.affectedRows > 0
        } catch (err) {
            console.log(`[DB] Error while updating user: ${err}`)
            return false
        }
    },
    count: async (): Promise<number> => {
        try {
            const [rows] = await db.query<DB_Count[]>('SELECT COUNT(*) FROM `sa_admins`')
            return rows?.[0]?.['COUNT(*)']
        } catch (err) {
            console.log(`[DB] Error while counting admins: ${err}`)
            return 0
        }
    },
}

export default Users
