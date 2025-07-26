import {useContext, useEffect} from "react";
import MenuPrincipal from "./component/MenuPrincipal.tsx";
import Background from "./Background.tsx";
import PatientsMaster from "./pages/PatientsMaster.tsx";
import {IsUserConnectedContext} from "./contexts/UserContext.tsx"
import Home from "./component/Home.tsx";
import {ServiceDirectusAPI} from "./service/serviceDirectusAPI.ts";
import {signIn_Supabase} from "./service/serviceSupabaseAPI.ts";

function App() {
    const context = useContext(IsUserConnectedContext);
    if (!context) {
        throw new Error("SomeComponent must be used within a ContextProvider");
    }
    const {isUserConnected, setIsUserConnected } = context;

    // Connexion automatique à l'API Directus et Supabase le temps du développement de l'application
    // Todo : Delete function
    useEffect(() => {
        async function asyncfunction() {
            const service = new ServiceDirectusAPI();
            await service.post_auth_user(import.meta.env.VITE_ADMIN_TEST_EMAIL, import.meta.env.VITE_ADMIN_TEST_PASSWORD);
            await signIn_Supabase(import.meta.env.VITE_ADMIN_TEST_EMAIL, import.meta.env.VITE_ADMIN_TEST_PASSWORD);
            setIsUserConnected("test");
        }
        asyncfunction()
    },[])

    console.log("App.tsx : isUserConnected", context.isUserConnected);

    return (
        <>
            <MenuPrincipal/>
            <div className="App">
            {isUserConnected !== "not connected" ? (
                <>
                    <h1 className="text-xl">Bienvenue {localStorage.getItem("name")}</h1>
                    <PatientsMaster/>
                </>
            ) : (
                <Home/>
            )}
            </div>
            <Background/>
        </>
    )
}

export default App
