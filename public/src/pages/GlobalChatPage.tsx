import MenuPrincipal from "../component/MenuPrincipal.tsx";
import Background from "../Background.tsx";
import Globalchat from "../component/Globalchat.tsx";

export default function GlobalChatPage() {
    return (
        <>
            <MenuPrincipal/>
            <div className="App">
                <Globalchat></Globalchat>
            </div>
            <Background/>
        </>
    );
}
