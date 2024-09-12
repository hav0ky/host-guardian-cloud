import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import type { DB_Count, DB_UserData } from '@/types/schema'
import db from './mysql'

interface DB_Users extends DB_UserData, RowDataPacket { }


// check user have db server exist
// post new db server data by userid and dbid
// get new server data by userid and dbid
// get list of database server by userid


const Database = {
    db_server_exist: async (userid: string, dbid: string): Promise<boolean> => {
        try {
            const sql = `SELECT COUNT(*) AS count FROM \`database\` WHERE userid = ? AND dbid = ?`;
            const [rows] = await db.query<any[]>(sql, [userid, dbid]);
            console.log(rows[0].count, "rowss")
            return rows[0].count > 0;
        } catch (err) {
            console.log(`[DB] Error while checking if record exists: ${err}`);
            return false;
        }
    },

    create_dbserver_by_user: async (data: DB_Users): Promise<string> => {
        console.log(data.userid);
        try {
            const q = `INSERT INTO \`database\` 
                      (userid, dbid, dbtype, dateofcreation, dbconfig, location, premium, status, ip, port, dbusername, dbpwd, plan) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            await db.query(q, [
                data.userid, data.dbid, data.dbtype, data.dateofcreation,
                data.dbconfig, data.location, data.premium, data.status, data.ip,
                data.port, data.dbusername, data.dbpwd, data.plan
            ]);

            console.log(`[DB] Successfully inserted data for userid: ${data.userid}`);
            return `Server Created Successfully userid: ${data.userid}`;
        } catch (err) {
            console.log(`[DB] Error while creating server: ${err}`);
            return `${err} || Error while creating server'`;
        }
    },

    get_allserver_by_user: async (userid: string): Promise<DB_Users | null> => {
        try {
            const [rows] = await db.query<DB_Users[]>('SELECT * FROM `database` WHERE userid = ?', [userid])
            if (!rows.length || rows.length < 1) return null

            const user = rows[0]
            return user
        } catch (err) {
            console.log(`[DB] Error while getting the admin: ${err}`)
            return null
        }
    },
}

export default Database;
