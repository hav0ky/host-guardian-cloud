import React from "react";
import { validateRequest } from "@/lib/auth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import CreateTicketForm from "../components/CreateTicketForm";
import { LoadingSpinner } from "@/components/ui/loader";
interface CreateTicketPageWrapperProps {
    fetchTickets: () => Promise<void>;
}
export default async function CreateTicketPageWrapper() {
    const { user } = await validateRequest(); 
    if (!user) {
        return <LoadingSpinner/>;
    }

    return (
        <div className="max-w-4xl w-full mx-auto">
                <CreateTicketForm user={user}  />
        </div>
    );
}
