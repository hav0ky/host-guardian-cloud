const server_options: { title: string; href: string; description: string }[] = [
    {
        title: "Counter-Strike 2",
        href: "/servers/cs2",
        description:
            "Boost your Counter-Strike 2 game with our high-performance servers.",
    },
    {
        title: "Counter-Strike GO",
        href: "/servers/csgo",
        description:
            "Take your CS:GO skills to new heights on our elite servers.",
    },
    {
        title: "Minecraft",
        href: "/servers/minecraft",
        description:
            "Enhance your Minecraft world with our high-performance servers.",
    },
    {
        title: "GTA V Role Play",
        href: "/servers/gta5",
        description: "Immerse yourself in GTA5 roleplay with our top-tier servers.",
    },
    {
        title: "Rust",
        href: "/servers/rust",
        description:
            "Elevate your Rust adventure with our high-performance servers.",
    },
    {
        title: "Team Fortress 2",
        href: "/servers/tf2",
        description:
            "Maximize your Team Fortress 2 gameplay with our high-performance servers.",
    },
]

export interface Region {
    id: number;
    city: string;
    name: string;
    region: string;
    flag: string;
    point: [number, number];
}

const regions: Region[] = [
    {
        id: 1,
        city: "Mumbai",
        name: "India",
        region: "Asia",
        flag: "IN",
        point: [71, 46]
    },
    {
        id: 2,
        city: "Singapore",
        name: "Singapore",
        region: "Asia",
        flag: "SG",
        point: [81.6, 58]
    },
    {
        id: 3,
        city: "Hong Kong",
        name: "Hong Kong",
        region: "Asia",
        flag: "HK",
        point: [84.6, 41.7]
    },
    {
        id: 4,
        city: "Tokyo",
        name: "Japan",
        region: "Asia",
        flag: "JP",
        point: [91.7, 28.6]
    },
    {
        id: 5,
        city: "Sydney",
        name: "Australia",
        region: "Oceania",
        flag: "AU",
        point: [96.6, 88]
    },
    {
        id: 6,
        city: "Dubai",
        name: "United Arab Emirates",
        region: "Middle East",
        flag: "AE",
        point: [64, 42]
    },
    {
        id: 7,
        city: "London",
        name: "United Kingdom",
        region: "Europe",
        flag: "GB",
        point: [44.5, 21.9]
    },
    {
        id: 8,
        city: "Frankfurt",
        name: "Germany",
        region: "Europe",
        flag: "DE",
        point: [47.8, 23.1]
    },
    {
        id: 9,
        city: "Stockholm",
        name: "Sweden",
        region: "Europe",
        flag: "SE",
        point: [49.7, 14.5]
    },
    {
        id: 10,
        city: "Ohio",
        name: "United States",
        region: "North America",
        flag: "US",
        point: [16, 32]
    },
    {
        id: 11,
        city: "California",
        name: "United States",
        region: "North America",
        flag: "US",
        point: [4.7, 28]
    },
    {
        id: 12,
        city: "São Paulo",
        name: "Brazil",
        region: "South America",
        flag: "BR",
        point: [28.5, 76.2]
    }
];

interface Pricing {
    basic: string;
    performance: string;
    extreme: string;
}

const prices: Pricing = {
    basic: "14.99",
    performance: "29.99",
    extreme: "49.99"
};

const plans: Pricing = {
    basic: "Basic plan",
    performance: "High Performance",
    extreme: "Extreme Performance"
};

export { server_options, regions, prices, plans }