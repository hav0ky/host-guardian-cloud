// https://cdn.discordapp.com/avatars/516275109594660867/c545702a9d929f165df6690c41edb618

import Link from "next/link";
import { LayoutGrid, LogOut, User } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
//   TooltipProvider
// } from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { invalidateRequest, validateRequest } from "@/lib/auth";

interface ActionResult {
    error: string | null;
}

export async function UserNav() {

    const { user } = await validateRequest()

    if (!user) {
        return (
            <Link href={`/signin`} className={buttonVariants({ size: "sm" })}>
                SignIn
            </Link>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="relative h-8 w-8 rounded-full"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt="AV" />
                        <AvatarFallback className="bg-transparent">AV</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.email}</p>
                        <p className="text-xs w-fit leading-none text-muted-foreground">
                            {user.username}
                        </p>

                        {/* <a href={`https://steamcommunity.com/profiles/${user.id}`} target="_blank" className="text-xs w-fit leading-none text-muted-foreground">
              {user.name}
            </a> */}
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {/* <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center">
                            <IconLayout2 className="w-4 h-4 mr-2 text-muted-foreground" />
                            Dashboard
                        </Link>
                    </DropdownMenuItem> */}
                    <DropdownMenuItem asChild>
                        <Link href="/settings" className="flex items-center">
                            {/* <IconUser className="w-4 h-4 mr-2 text-muted-foreground" /> */}
                            Account
                        </Link>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem asChild>
                        <Link href="/settings" className="flex items-center">
                            <IconDeviceDesktopAnalytics className="w-4 h-4 mr-2 text-muted-foreground" />
                            Stats
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/settings" className="flex items-center">
                            <IconUsersGroup className="w-4 h-4 mr-2 text-muted-foreground" />
                            Teams
                        </Link>
                    </DropdownMenuItem> */}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <form
                    action={async () => {
                        "use server"
                        await invalidateRequest()
                    }}
                >
                    <Button type="submit" className="w-full flex justify-start h-8 font-normal pl-2.5 cursor-default" variant="ghost" size="sm">
                        {/* <IconLogout className="w-4 h-4 mr-2 text-muted-foreground" /> */}
                        Sign out
                    </Button>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
