import { IconBrandMysql } from "@tabler/icons-react";

export const databases = [
    {
        id: "mysql",
        name: "Mysql",
        versions: [
            "v5.7",
            "v8.0"
        ],
    },
    {
        id: "postgresql",
        name: "PostgreSQL",
        versions: [
            "v16",
            "v15",
            "v14",
            "v13"
        ],
    },
    {
        id: "mongodb",
        name: "MongoDB",
        versions: [
            "v7.0",
            "v6.0",
            "v5.0"
        ]
    },
    {
        id: "apache_kafka",
        name: "Apache Kafka",
        versions: [
            "v3.7",
        ]
    },
    {
        id: "redis",
        name: "Redis",
        versions: [
            "v3.7",
        ]
    },
]

interface Region {
    id: number;
    city: string;
    name: string;
    flag: string;
    point: [number, number];
}

export const regions: Region[] = [
    {
        id: 1,
        city: 'Mumbai',
        name: 'India',
        flag: 'IN',
        point: [71, 46],
    },
    {
        id: 2,
        city: 'Singapore',
        name: 'Asia Pacific',
        flag: 'SG',
        point: [81.6, 58],
    },
    {
        id: 3,
        city: 'Hong Kong',
        name: 'Asia Pacific',
        flag: 'HK',
        point: [84.6, 41.7],
    },
    {
        id: 4,
        city: 'Tokyo',
        name: 'Asia Pacific',
        flag: 'JP',
        point: [91.7, 28.6],
    },
    {
        id: 5,
        city: 'Sydney',
        name: 'Asia Pacific',
        flag: 'AU',
        point: [96.6, 88],
    },
    {
        id: 6,
        city: 'Dubai',
        name: 'Middle East',
        flag: 'AE',
        point: [64, 42],
    },
    {
        id: 7,
        city: 'London',
        name: 'Europe',
        flag: 'GB',
        point: [44.5, 21.9],
    },
    {
        id: 8,
        city: 'Frankfurt',
        name: 'Europe',
        flag: 'DE',
        point: [47.8, 23.1],
    },
    {
        id: 9,
        city: 'Stockholm',
        name: 'Europe',
        flag: 'SE',
        point: [49.7, 14.5],
    },
    {
        id: 10,
        city: 'Ohio',
        name: 'North America',
        flag: 'US',
        point: [16, 32],
    },
    {
        id: 11,
        city: 'California',
        name: 'North America',
        flag: 'US',
        point: [4.7, 28],
    },
    {
        id: 12,
        city: 'São Paulo',
        name: 'South America',
        flag: 'BR',
        point: [28.5, 76.2],
    },
];


interface Plan {
    id: string;
    title: string;
    description: string;
    discount: number;
}

export const product_plans: Plan[] = [
    {
        id: "1",
        title: "Monthly Plan",
        description: "Flexible month-to-month game server hosting.",
        discount: 0
    },
    {
        id: "3",
        title: "3-Month Plan - 5% Off",
        description: "Save 5% with a three-month commitment.",
        discount: 5
    },
    {
        id: "6",
        title: "6-Month Plan - 10% Off",
        description: "Save 10% with six months of hosting.",
        discount: 10
    },
    {
        id: "12",
        title: "12-Month Plan - 15% Off",
        description: "Save 15% with a full year of hosting.",
        discount: 15
    }
];

export const get_discount_by_plan_id = (id: string): number => {
    const plan = product_plans.find(p => p.id === id);
    return plan ? plan.discount : 0;
};

export const ddos_protection_price = 10