import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import type { DB_GameServer, DB_GameServerFeatures, DB_GameServerPricing, GamePlans, DB_PanelUsers } from '@/types/schema'; // Assuming you have these types defined
import db from './mysql';

interface DB_GameServerDB extends DB_GameServer, RowDataPacket { }
interface DB_GameServerPricingDB extends DB_GameServerPricing, RowDataPacket { }
interface GamePlansDB extends GamePlans, RowDataPacket { }
interface DB_PanelUser extends DB_PanelUsers, RowDataPacket { }

const GameServerProducts = {
    getAll: async (): Promise<DB_GameServer[]> => {
        try {
            const [rows] = await db.query<DB_GameServerDB[]>('SELECT * FROM `p_gameserver`');
            rows.forEach((db) => {
                if (db.versions) db.versions = (db.versions as unknown as string).split(',');
            });
            return rows;
        } catch (err) {
            console.log(`[DB] Error while getting all p_database: ${err}`);
            return [];
        }
    },

    getAllWithPricing: async (): Promise<(DB_GameServer & { pricing: DB_GameServerPricing[] })[]> => {
        try {
            // Query to get all database products
            const [dbProducts] = await db.query<DB_GameServerDB[]>('SELECT * FROM `p_gameserver`');

            // Prepare the final result array
            const productsWithPricing: (DB_GameServer & { pricing: DB_GameServerPricing[] })[] = [];

            // Iterate over each database product
            for (const product of dbProducts) {
                // Split versions if stored as a comma-separated string

                // Query to get all pricing tiers for the current database product
                const [pricing] = await db.query<DB_GameServerPricingDB[]>(
                    'SELECT * FROM `p_gameserver_pricing` WHERE game_id = ?',
                    [product.id]
                );

                // Add the product along with its pricing to the result array
                productsWithPricing.push({
                    ...product,
                    pricing
                });
            }

            return productsWithPricing;
        } catch (err) {
            console.log(`[DB] Error while getting products with pricing: ${err}`);
            return [];
        }
    },

    getById: async (gameserverId: string): Promise<DB_GameServer | null> => {
        try {
            const [rows] = await db.query<DB_GameServerDB[]>('SELECT * FROM `p_gameserver` WHERE id = ?', [gameserverId]);
            if (!rows.length) return null;

            const dbProduct = rows[0];
            if (dbProduct.versions) dbProduct.versions = (dbProduct.versions as unknown as string).split(',');
            return dbProduct;
        } catch (err) {
            console.log(`[DB] Error while getting gameserver by ID: ${err}`);
            return null;
        }
    },

    getGameServerWithPricingById: async (game_id: string): Promise<(DB_GameServer & { pricing: DB_GameServerPricing[] }) | null> => {
        try {
            // Query to get all database products
            const [rows] = await db.query<DB_GameServerDB[]>('SELECT * FROM `p_gameserver` WHERE id = ?', [game_id]);
            if (!rows.length) return null;

            const dbProduct = rows[0];
            if (dbProduct.versions) dbProduct.versions = (dbProduct.versions as unknown as string).split(',');

            const [pricing] = await db.query<DB_GameServerPricingDB[]>(
                'SELECT * FROM `p_gameserver_pricing` WHERE game_id = ?',
                [game_id]
            );

            return {
                ...dbProduct,
                pricing
            }

        } catch (err) {
            console.log(`[DB] Error while getting products with pricing: ${err}`);
            return null;
        }
    },

    getGameFeatures: async (game_id: string): Promise<(DB_GameServer & { features: DB_GameServerFeatures[] }) | null> => {
        try {
            // Query to get all database products
            const [rows] = await db.query<DB_GameServerDB[]>('SELECT * FROM `p_gameserver` WHERE id = ?', [game_id]);
            if (!rows.length) return null;

            const dbProduct = rows[0];
            if (dbProduct.versions) dbProduct.versions = (dbProduct.versions as unknown as string).split(',');

            const [features] = await db.query<DB_GameServerFeatures[]>(
                'SELECT * FROM `p_gameserver_features` WHERE id = ?',
                [game_id]
            );

            return {
                ...dbProduct,
                features
            }

        } catch (err) {
            console.log(`[DB] Error while getting products with pricing: ${err}`);
            return null;
        }
    },

    getPlanById: async (gameserverId: string, plan: string): Promise<GamePlansDB | null> => {
        try {
            const [rows] = await db.query<GamePlansDB[]>('SELECT * FROM `p_gameserver_pricing` WHERE game_id = ? AND name = ?', [gameserverId, plan]);
            if (!rows.length) return null;
            const gamePlans = rows[0];
            const [serverRows] = await db.query<DB_GameServerDB[]>('SELECT * FROM p_gameserver WHERE id = ?', [gameserverId]);
            const gameServer = serverRows.length ? serverRows[0] : null;
            gamePlans.gameServer = gameServer;
            if (gamePlans.versions) gamePlans.versions = (gamePlans.versions as unknown as string).split(',');
            console.log(gamePlans, "ftat")

            return gamePlans;
        } catch (err) {
            console.log(err, "ftat")

            console.log(`[DB] Error while getting game plans by ID: ${err}`);
            return null;
        }
    },

    getPanelUserByEmail: async (email: string): Promise<DB_PanelUser | null> => {
        try {

            const [rows] = await db.query<DB_PanelUser[]>('SELECT * FROM `panel_users` WHERE email = ?', [email]);

            if (!rows.length) return null;
            const userData = rows[0];
            console.log(userData,"HEEEE")

            if (userData.versions) userData.versions = (userData.versions as unknown as string).split(',');
            return userData;
        } catch (err) {
            console.log(`[DB] Error while getting gameserver by ID: ${err}`);
            return null;
        }
    },


    createPanelUser: async (props: Partial<DB_PanelUser>): Promise<number | null> => {
        try {
            const keys = Object.keys(props);
            const values = Object.values(props);

            const [rows] = await db.query<ResultSetHeader>(
                `INSERT INTO panel_users (${keys.join(', ')}) VALUES (${keys.map(() => '?').join(', ')})`,
                values
            );
            return rows.insertId;
        } catch (err) {
            console.log(`[DB] Error while creating database: ${err}`);
            return null;
        }
    },




    // getPricingByDatabaseId: async (databaseId: string): Promise<DB_Pricing[]> => {
    //     try {
    //         const [rows] = await db.query<DB_PricingDB[]>('SELECT * FROM `p_database_pricing` WHERE database_id = ?', [databaseId]);
    //         return rows;
    //     } catch (err) {
    //         console.log(`[DB] Error while getting pricing for database: ${err}`);
    //         return [];
    //     }
    // },

    // create: async (props: Partial<DB_Product>): Promise<number | null> => {
    //     try {
    //         const keys = Object.keys(props);
    //         const values = Object.values(props);

    //         const [rows] = await db.query<ResultSetHeader>(
    //             `INSERT INTO p_database (${keys.join(', ')}, created_at) VALUES (${keys.map(() => '?').join(', ')}, NOW())`,
    //             values
    //         );
    //         return rows.insertId;
    //     } catch (err) {
    //         console.log(`[DB] Error while creating database: ${err}`);
    //         return null;
    //     }
    // },

    // update: async (id: string, props: Partial<DB_Product>): Promise<boolean> => {
    //     try {
    //         const keys = Object.keys(props);

    //         const [rows] = await db.query<ResultSetHeader>(
    //             `UPDATE \`p_database\` SET ${keys.map((f) => `${f} = ?`).join(', ')} WHERE id = ?`,
    //             [...Object.values(props), id]
    //         );
    //         return rows.affectedRows > 0;
    //     } catch (err) {
    //         console.log(`[DB] Error while updating database: ${err}`);
    //         return false;
    //     }
    // },

    // createPricing: async (databaseId: string, pricing: Partial<DB_Pricing>): Promise<number | null> => {
    //     try {
    //         const keys = Object.keys(pricing);
    //         const values = Object.values(pricing);

    //         const [rows] = await db.query<ResultSetHeader>(
    //             `INSERT INTO p_database_pricing (database_id, ${keys.join(', ')}) VALUES (?, ${keys.map(() => '?').join(', ')})`,
    //             [databaseId, ...values]
    //         );
    //         return rows.insertId;
    //     } catch (err) {
    //         console.log(`[DB] Error while creating pricing: ${err}`);
    //         return null;
    //     }
    // }
};

export default GameServerProducts;
