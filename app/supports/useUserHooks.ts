import { useState, useEffect } from "react";
import axios from "axios";
import { SA_User } from "@/types/schema";

export function useUser() {
    const [user, setUser] = useState<SA_User | null>(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("/api/auth/user");
                setUser(response.data.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading };
}
