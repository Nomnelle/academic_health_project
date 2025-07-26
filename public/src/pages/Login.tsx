import MenuPrincipal from "../component/MenuPrincipal.tsx";
import Background from "../Background.tsx";
import Signin from "../component/Signin.tsx";

function Login() {
    return (
        <>
            <MenuPrincipal/>
            <div className="App">
                <Signin></Signin>
            </div>
            <Background/>
        </>
    );
}

export default Login;
