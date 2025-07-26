import { useEffect, useState, createContext } from "react";
import { get_is_user_connected } from "../service/serviceSupabaseAPI";
import { ServiceDirectusAPI } from "../service/serviceDirectusAPI";
import { ContextProviderProps } from "../types";

// Define the shape of the context
interface IsUserConnectedContextType {
    isUserConnected: string;
    setIsUserConnected: React.Dispatch<React.SetStateAction<string>>;
}

// Create context with default value
export const IsUserConnectedContext = createContext<IsUserConnectedContextType | undefined>(undefined);

export default function UserContextProvider({ children }: ContextProviderProps) {
    const [isUserConnected, setIsUserConnected] = useState("not connected");

    useEffect(() => {
        async function checkUserConnection() {
            const hasRefreshToken = localStorage.getItem("refresh_token");
            const hasAccessToken = localStorage.getItem("access_token");

            const user_connected_supabase = await get_is_user_connected();
            if (hasRefreshToken && hasAccessToken && user_connected_supabase) {
                const service = new ServiceDirectusAPI();
                const test_data_directusAPI = await service.post_refresh_token();
                if (test_data_directusAPI) {
                    setIsUserConnected("connected");
                } else {
                    setIsUserConnected("not connected");
                }
            } else {
                setIsUserConnected("not connected");
            }
        }

        checkUserConnection();
    }, []);

    return (
        <IsUserConnectedContext.Provider value={{ isUserConnected, setIsUserConnected }}>
            {children}
        </IsUserConnectedContext.Provider>
    );
}
