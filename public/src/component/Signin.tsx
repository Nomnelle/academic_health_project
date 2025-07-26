import { useContext } from "react";
import { signIn_Supabase } from "../service/serviceSupabaseAPI.ts";
import { ServiceDirectusAPI } from "../service/serviceDirectusAPI.ts";
import { IsUserConnectedContext } from "../contexts/UserContext.tsx";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";


interface FormInputs {
    email: string;
    password: string;
}

function Signin() {
    const context = useContext(IsUserConnectedContext);
    const navigate = useNavigate();

    if (!context) {
        throw new Error("SomeComponent must be used within a ContextProvider");
    }

    const { setIsUserConnected } = context;

    // Configuration de React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        const { email, password } = data;

        if (email.trim() === '' || password.trim() === '') {
            console.error("Email et mot de passe sont requis");
            return;
        }

        const serviceDirectus = new ServiceDirectusAPI();

        try {
            // Sign in with Directus API
            const response = await serviceDirectus.post_auth_user(email, password);
            if (response) {
                console.log("Connexion réussie avec Directus API");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion avec Directus API :", error);
            return;
        }

        try {
            // Sign in with Supabase
            const response = await signIn_Supabase(email, password);
            if (response) {
                console.log("Connexion réussie avec Supabase");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion avec Supabase :", error);
            return;
        }

        const cutemail = email.split("@")[0];
        setIsUserConnected(cutemail);
        localStorage.setItem("name", cutemail);
        console.log("Utilisateur connecté");

        navigate("/");
    };

    return (
        <div className="element p-5">
            <h1>Se connecter : </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <label className="flex flex-col">
                    <input
                        type="email"
                        className="w-full p-2 border rounded"
                        placeholder="Email"
                        {...register("email", {
                            required: "L'email est requis",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email invalide"
                            }
                        })}
                    />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </label>
                <label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded"
                        placeholder="Mot de passe"
                        {...register("password", {
                            required: "Le mot de passe est requis",
                            minLength: {
                                value: 6,
                                message: "Le mot de passe doit contenir au moins 6 caractères"
                            }
                        })}
                    />
                    {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                </label>

                <button
                    type="submit"
                    className="form_button"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Connexion..." : "Se connecter"}
                </button>

                <div className="text-center mt-4">
                    <p>Pas encore de compte ?</p>
                    <button
                        type="button"
                        onClick={() => navigate("/create_account")}
                        className="form_button w-full mt-2"
                    >
                        Inscrivez-vous !
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Signin;