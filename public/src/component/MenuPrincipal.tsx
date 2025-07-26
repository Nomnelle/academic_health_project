import { NavLink, useLocation } from "react-router";
import { useContext } from "react";
import { IsUserConnectedContext } from "../contexts/UserContext.tsx";
import { signOut_Supabase } from "../service/serviceSupabaseAPI.ts";

function MiniMenu() {
    return (
        <NavLink
            to="/"
            className={({ isActive }) =>
                isActive ? "title-link active-link" : "title-link"
            }
        >
            <img src="/icons/logo_small.svg" alt="icon home" />
        </NavLink>
    )
}

function MenuPrincipal() {
    const location = useLocation();
    const userContext = useContext(IsUserConnectedContext);
    if (!userContext) {
        throw new Error("SomeComponent must be used within a ContextProvider");
    }

    const { isUserConnected, setIsUserConnected } = userContext;

    // Hide menu on the login page
    if (location.pathname === "/login" || location.pathname === "/create_account") {
        return (
            <div id='mini-menu'>
                <nav>
                    <MiniMenu />
                </nav>
            </div>
        )
    }

    async function handleLogout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("name");
        setIsUserConnected("not connected");
        await signOut_Supabase()
        console.log("Logout");
    }

    return (
        <div id='menu-principal'>
            <nav>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "menu-link active-link" : "menu-link"
                    }
                >
                    <img src="/icons/logo_small.svg" alt="icon home" />
                </NavLink>

                <NavLink
                    to="/globalchat"
                    className={({ isActive }) =>
                        isActive ? "menu-link active-link" : "menu-link"
                    }
                >
                    <img src="/icons/connect.svg" alt="icon globalchat" />
                </NavLink>

                {
                    isUserConnected !== "not connected" ? (
                        <NavLink to="/" className="menu-link">
                            <img src="/icons/logout_small.svg" alt="icon logout" onClick={handleLogout} />
                        </NavLink>
                    ) : (
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive ? "menu-link active-link" : "menu-link"
                            }
                        >
                            <img src="/icons/login_small.svg" alt="icon login" />
                        </NavLink>
                    )
                }
            </nav>
        </div>
    )
}

export default MenuPrincipal;