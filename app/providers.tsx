"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { validateRequest } from "@/lib/auth";
import { createContext, useContext } from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

type ContextType = Awaited<ReturnType<typeof validateRequest>>;

const SessionContext = createContext<ContextType>({
    session: null,
    user: null,
});

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children, value }: React.PropsWithChildren<{ value: ContextType }>) => {
    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};