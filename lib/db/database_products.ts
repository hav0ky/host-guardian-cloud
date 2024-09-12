import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import type { DB_Product, DB_Pricing } from '@/types/schema'; // Assuming you have these types defined
import db from './mysql';

interface DB_ProductDB extends DB_Product, RowDataPacket { }
interface DB_PricingDB extends DB_Pricing, RowDataPacket { }

const DatabaseProducts = {
    getAll: async (): Promise<DB_Product[]> => {
        try {
            const [rows] = await db.query<DB_ProductDB[]>('SELECT * FROM `p_database`');
            rows.forEach((db) => {
                if (db.versions) db.versions = (db.versions as unknown as string).split(',');
            });
            return rows;
        } catch (err) {
            console.log(`[DB] Error while getting all p_database: ${err}`);
            return [];
        }
    },

    getAllWithPricing: async (): Promise<(DB_Product & { pricing: DB_Pricing[] })[]> => {
        try {
            // Query to get all database products
            const [dbProducts] = await db.query<DB_ProductDB[]>('SELECT * FROM `p_database`');

            // Prepare the final result array
            const productsWithPricing: (DB_Product & { pricing: DB_Pricing[] })[] = [];

            // Iterate over each database product
            for (const product of dbProducts) {
                // Split versions if stored as a comma-separated string
                if (product.versions) {
                    product.versions = (product.versions as unknown as string).split(',');
                }

                // Query to get all pricing tiers for the current database product
                const [pricing] = await db.query<DB_PricingDB[]>(
                    'SELECT * FROM `p_database_pricing` WHERE database_id = ?',
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

    getById: async (databaseId: string): Promise<DB_Product | null> => {
        try {
            const [rows] = await db.query<DB_ProductDB[]>('SELECT * FROM `p_database` WHERE id = ?', [databaseId]);
            if (!rows.length) return null;

            const dbProduct = rows[0];
            if (dbProduct.versions) dbProduct.versions = (dbProduct.versions as unknown as string).split(',');
            return dbProduct;
        } catch (err) {
            console.log(`[DB] Error while getting database by ID: ${err}`);
            return null;
        }
    },

    getPricingByDatabaseId: async (databaseId: string): Promise<DB_Pricing[]> => {
        try {
            const [rows] = await db.query<DB_PricingDB[]>('SELECT * FROM `p_database_pricing` WHERE database_id = ?', [databaseId]);
            return rows;
        } catch (err) {
            console.log(`[DB] Error while getting pricing for database: ${err}`);
            return [];
        }
    },

    create: async (props: Partial<DB_Product>): Promise<number | null> => {
        try {
            const keys = Object.keys(props);
            const values = Object.values(props);

            const [rows] = await db.query<ResultSetHeader>(
                `INSERT INTO p_database (${keys.join(', ')}, created_at) VALUES (${keys.map(() => '?').join(', ')}, NOW())`,
                values
            );
            return rows.insertId;
        } catch (err) {
            console.log(`[DB] Error while creating database: ${err}`);
            return null;
        }
    },

    update: async (id: string, props: Partial<DB_Product>): Promise<boolean> => {
        try {
            const keys = Object.keys(props);

            const [rows] = await db.query<ResultSetHeader>(
                `UPDATE \`p_database\` SET ${keys.map((f) => `${f} = ?`).join(', ')} WHERE id = ?`,
                [...Object.values(props), id]
            );
            return rows.affectedRows > 0;
        } catch (err) {
            console.log(`[DB] Error while updating database: ${err}`);
            return false;
        }
    },

    createPricing: async (databaseId: string, pricing: Partial<DB_Pricing>): Promise<number | null> => {
        try {
            const keys = Object.keys(pricing);
            const values = Object.values(pricing);

            const [rows] = await db.query<ResultSetHeader>(
                `INSERT INTO p_database_pricing (database_id, ${keys.join(', ')}) VALUES (?, ${keys.map(() => '?').join(', ')})`,
                [databaseId, ...values]
            );
            return rows.insertId;
        } catch (err) {
            console.log(`[DB] Error while creating pricing: ${err}`);
            return null;
        }
    }
};

export default DatabaseProducts;
