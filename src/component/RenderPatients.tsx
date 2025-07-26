import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {ServiceDirectusAPI} from "../service/serviceDirectusAPI.ts";
import {Patient, RenderPropsKeywords} from "../types.tsx";
import Carrousel from "./Carrousel.tsx";
import SchedulerComponent from "./SchedulerComponent.tsx";

function RenderPatients(){
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [allPatients, setAllPatients] = useState<Patient[]|null|undefined>(null);
    const [filteredPatients, setFilteredPatients] = useState<Patient[]|null|undefined>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RenderPropsKeywords>({
        defaultValues: {
            keyword: ""
        }
    });

    const filterPatients = (keyword: string) => {
        setSearchTerm(keyword);

        if (!keyword.trim()) {
            setFilteredPatients(allPatients);
            return;
        }

        const lowercaseKeyword = keyword.toLowerCase();
        const filtered = allPatients?.filter(patient =>
            patient.lastname?.toLowerCase().includes(lowercaseKeyword) ||
            patient.firstname?.toLowerCase().includes(lowercaseKeyword)
        );

        setFilteredPatients(filtered);
    };

    const handleReset = () => {
        setFilteredPatients(allPatients);
        setSearchTerm("");
        reset();
    };

    useEffect(() => {
        const service = new ServiceDirectusAPI();
        const fetchPatient = async () => {
            try {
                const result = await service.get_items_people();
                setAllPatients(result);
                setFilteredPatients(result);
            } catch (e) {
                if (e instanceof Error) {
                    setError(e);
                } else {
                    setError(Error("An unknown error occurred."));
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchPatient();
    }, []); // Ajout de la dépendance vide pour n'exécuter qu'une seule fois

    if (isLoading) {
        return (
            <>
                <div className="loader-container">
                    <div className="loader">Loading...</div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                {error.message}
            </>
        );
    }

    return(
        <div className="patient-render">
            <div className="patient_page">
                <div>
                    <div className="patient-search">
                        <h1 className="titre_liste_patient">Patients</h1>
                        <hr/>
                        <form onSubmit={handleSubmit(() => {})}>
                            <label>Rechercher un patient :</label>
                            <Controller
                                name="keyword"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        className="min-w-20"
                                        type="text"
                                        placeholder="Entrer le nom ou prénom"
                                        value={searchTerm}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            filterPatients(e.target.value);
                                        }}
                                    />
                                )}
                            />
                            {errors.keyword && (<div><span className="error-msg">Veuillez entrer une valeur</span></div>)}
                            {searchTerm && (
                                <button
                                    onClick={handleReset}
                                    type="button"
                                    className="form_button ml-2"
                                >
                                    &times;
                                </button>
                            )}
                        </form>
                    </div>
                </div>
                <Carrousel patients={filteredPatients}/>
                <SchedulerComponent/>
            </div>
        </div>
    );
}

export default RenderPatients;