import React from "react";
import TicketChatPage from "@/app/supports/ticket/[id]/TicketChatPage";
import { validateRequest } from "@/lib/auth";
import { LoadingSpinner } from "@/components/ui/loader";

export default async function TicketChatPageWrapper() {
    const { user } = await validateRequest();

    if (!user) {
        return   <LoadingSpinner />;
    }

    return <TicketChatPage user={user} />;
}
