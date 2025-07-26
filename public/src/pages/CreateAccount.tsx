import MenuPrincipal from "../component/MenuPrincipal.tsx";
import Background from "../Background.tsx";
import Signup from "../component/Signup.tsx";

export default function CreateAccount() {
    return (
        <div>
            <MenuPrincipal/>
            <div className="App">
                <Signup></Signup>
            </div>
            <Background/>
        </div>
    );
}