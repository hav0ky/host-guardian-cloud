import { createPool, Pool } from 'mysql2/promise'

const globalForDb = global as unknown as { db: Pool }

const db = globalForDb.db || createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT || '3306'),
    connectionLimit: 5, // Adjust as needed
})

if (!globalForDb.db) {
    globalForDb.db = db
}

let isReady = false

db.on('connection', async () => {
    if (isReady) return
    isReady = true
})

export default db