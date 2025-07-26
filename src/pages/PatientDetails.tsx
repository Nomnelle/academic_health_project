import MenuPrincipal from "../component/MenuPrincipal.tsx";
import {Navigate, useLocation, useParams} from "react-router";
import MenuPatient from "../component/MenuPatient.tsx";
import {useEffect, useState} from "react";
import {Patient} from "../types.tsx";
import {ServiceDirectusAPI} from "../service/serviceDirectusAPI.ts";
import { PatientContext } from "../contexts/PatientContext.ts";
import Background from "../Background.tsx";
import Chatbot from "../component/Chatbot.tsx";

function PatientDetails() {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null)
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false); // Modal state

    const location = useLocation();

    const match = location.pathname.match(
        /^\/patients\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    );

    useEffect(() => {
        const service = new ServiceDirectusAPI();
        const fetchPatient = async () => {
            try {
                if(id){
                    const result = await service.get_patient_by_id(id);
                    setPatient(result);
                }else{
                    setError(Error('No ID found'));
                }

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
    }, [id]);

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

    return (
        <>
            <MenuPrincipal/>
            <PatientContext.Provider value={patient}>
                <div className="App">
                        <div className="patient-details">
                                <div className="patient-name flex items-center align-items-center">
                                    <img
                                        src={patient?.sex === 1 ? "/icons/user-masculin.svg" : "/icons/user-feminin.svg"}
                                        alt="Patient Icon"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <h2>{patient?.firstname} {patient?.lastname}</h2>

                                </div>
                                <MenuPatient id={id}/>
                        </div>
                </div>
                <button
                    onClick={() => setIsChatbotOpen(true)}
                    className="fixed top-3/4 right-4 z-10 lg:top-5/6 rounded-full w-20 h-20"
                >
                    <img src="/icons/chat.png" alt="Chatbot" className="w-15 h-15"/>
                </button>

                {/* Modal */}
                {isChatbotOpen && (
                    <div className="fixed inset-0 flex justify-center items-center z-20">
                        <div className="bg-[#ffffff] rounded-2xl shadow-lg p-6 md:w-2/3 w-4/5 max-w-5xl relative">
                            <div className={ "text-center text-xl font-bold mb-4"}>
                                HealtBot : Votre assistant virtuel
                            </div>
                            <button
                                onClick={() => setIsChatbotOpen(false)}
                                className="absolute top-2 right-2 rounded-full"
                            >
                                {/*Caractère spécial*/}
                                &times;
                            </button>
                            <Chatbot patient={patient} />
                        </div>
                    </div>
                )}
            </PatientContext.Provider>
            <Background/>
            {match ? <Navigate replace to="patientInfos" /> : null}
        </>

    )
}

export default PatientDetails;



