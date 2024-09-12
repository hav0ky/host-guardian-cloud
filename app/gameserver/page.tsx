import WidthWrapper from "@/components/ui/width-wrapper";
import query from "@/lib/db";
import Link from "next/link";

export default async function GameServersPage() {
    const gameservers = await query.gameservers.getAll();

    return (
        <WidthWrapper>
            {gameservers.map(gameServer =>
                <Link href={`/gameserver/${gameServer.id}`} key={gameServer.id}>
                    {gameServer.name}
                </Link>
            )}
        </WidthWrapper>
    )
}