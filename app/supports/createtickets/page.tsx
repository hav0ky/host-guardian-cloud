import { LoadingSpinner } from "@/components/ui/loader";
import { validateRequest } from "@/lib/auth";
import CreateTicketForm from "../components/CreateTicketForm";
// interface CreateTicketPageWrapperProps {
//     fetchTickets: () => Promise<void>;
// }
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
