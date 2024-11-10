import { useState, useEffect } from "react";
import axios from "axios";

export function useUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("/api/auth/user");
                console.log(user,"not getting")
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
