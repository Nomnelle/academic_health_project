import { useState } from "react";
import { signUp_Supabase } from "../service/serviceSupabaseAPI.ts";
import { ServiceDirectusAPI } from "../service/serviceDirectusAPI.ts";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";

interface FormInputs {
    email: string;
    password: string;
    lastname: string;
    firstname: string;
}

function Signup() {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Configuration de React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        const { email, password, lastname, firstname } = data;

        try {
            // Sign up with Directus API
            const service = new ServiceDirectusAPI();
            const responseDirectus = await service.post_admin_user(email, password, lastname, firstname);
            if (!responseDirectus) {
                console.error("Erreur lors de l'inscription avec Directus API");
                return;
            }

            // Sign up with Supabase
            const responseSupabase = await signUp_Supabase(email, password);
            if (!responseSupabase) {
                console.error("Erreur lors de l'inscription avec Supabase");
                return;
            }

            console.log("Inscription réussie avec succès");
            setSuccessMessage("Compte créé avec succès ! Redirection vers la page de connexion...");

            // Redirection vers la page de connexion après 2 secondes
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {
            console.error("Erreur lors de l'inscription:", error);
        }
    };

    return (
        <div className="element p-5">
            <h1>Créer un compte</h1>

            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
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
                </div>

                <div>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        placeholder="Prénom"
                        {...register("firstname", {
                            required: "Le prénom est requis"
                        })}
                    />
                    {errors.firstname && <span className="text-red-500">{errors.firstname.message}</span>}
                </div>

                <div>
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        placeholder="Nom"
                        {...register("lastname", {
                            required: "Le nom est requis"
                        })}
                    />
                    {errors.lastname && <span className="text-red-500">{errors.lastname.message}</span>}
                </div>

                <div>
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
                </div>

                <button
                    type="submit"
                    className="form_button"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Création en cours..." : "Se créer un compte"}
                </button>

                <div className="text-center mt-4">
                    <p>Déjà inscrit ?</p>
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="form_button w-full mt-2"
                    >
                        Se connecter
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Signup;