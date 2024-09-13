export type GameServer = {
    id: string;
    name: string;
    description: string;
    background: string;
    image: string;
    price: number;
};

export const gameServers: GameServer[] = [
    {
        id: 'cs2',
        name: 'Counter-Strike 2 Server Hosting',
        description: 'Embark on a gaming journey like never before with our premium Counter-Strike 2 game servers. Designed for unparalleled performance, our servers boast high-performance capabilities and DDoS protection, ensuring a seamless and secure gaming environment. Experience low ping for ultra-responsive gameplay, allowing you to stay ahead of the competition.',
        background: '/img/games/cs2.jpeg',
        image: '/img/games/cs2_img.png',
        price: 12.99,
    },
    {
        id: 'minecraft',
        name: 'Minecraft Server Hosting',
        description: 'Discover the ultimate Minecraft server hosting experience with our powerful and secure servers. Enjoy lag-free performance, automatic backups, and full control over your game environment. Whether you\'re building alone or with friends, our servers are designed to keep your world running smoothly.',
        background: '/img/games/cs2.jpeg',
        image: '/img/games/cs2_img.png',
        price: 9.99,

    },
    {
        id: 'rust',
        name: 'Rust Server Hosting',
        description: 'Survive in the harsh world of Rust with our premium game server hosting. Offering unmatched performance and reliability, our Rust servers feature low latency, powerful hardware, and advanced DDoS protection, ensuring you can focus on surviving without interruptions.',
        background: '/img/games/cs2.jpeg',
        image: '/img/games/cs2.png',
        price: 8.99,

    },
    {
        id: 'ark',
        name: 'ARK: Survival Evolved Server Hosting',
        description: 'Explore the prehistoric world of ARK with our top-tier server hosting. Built for speed and stability, our ARK servers guarantee low ping and high performance. With mod support and easy management tools, you\'ll have full control over your dinosaur-filled adventure.',
        background: '/img/games/cs2.jpeg',
        image: '/img/games/cs2.png',
        price: 5.99,

    },
    {
        id: 'valheim',
        name: 'Valheim Server Hosting',
        description: 'Venture into the Norse wilderness with Valheim server hosting designed for reliability and speed. Our servers provide low latency, easy setup, and mod support, ensuring a smooth multiplayer experience as you build and battle through the Viking realms.',
         background: '/img/games/cs2.jpeg',
        image: '/img/games/cs2.png',
        price: 9.99,
    },
    {
        id: 'valorant',
        name: 'Valorant Server Hosting',
        description: 'Dominate the competition with our high-performance Valorant server hosting. Enjoy low ping, seamless gameplay, and strong DDoS protection, giving you an edge in every round. With 24/7 uptime and superior reliability, our servers ensure you can focus on perfecting your strategies.',
         background: '/img/games/cs2.jpeg',
        image: '/img/games/cs2.png',
        price: 9.99,
    },
    {
        id: 'pubgpc',
        name: 'PUBG PC Server Hosting',
        description: 'Get the best PUBG PC server hosting experience with our state-of-the-art servers designed for speed, stability, and security. Whether you\'re battling it out solo or with a squad, our servers offer low latency and DDoS protection, ensuring smooth and secure gameplay.',
        background: '/img/games/cs2.jpeg',
        image: '/img/games/cs2.png',
        price: 9.99,
    }
]



export function getGameServerById(id: string): GameServer | undefined {
    return gameServers.find(server => server.id === id);
}