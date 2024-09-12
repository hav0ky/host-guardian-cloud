import DatabaseProducts from "./database_products"
import Database from "./dbusers"
import GameServerProducts from "./gameserver"
import Users from "./users"

const query = {
    users: Users,
    database: Database,
    database_products: DatabaseProducts,
    gameservers: GameServerProducts
}

export default query
