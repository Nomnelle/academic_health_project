import {Calendar, Event, dayjsLocalizer} from 'react-big-calendar';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import {useState, useEffect} from 'react';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "/src/component/calendarStyle.css";
import {addRendezvous, get_rendezvous} from "../service/serviceSupabaseAPI.ts";
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { useForm, SubmitHandler } from "react-hook-form";

interface FormInputs {
    start_date: string;
    end_date: string;
    adresse: string;
    user_id: string;
}

dayjs.locale('fr');

const localizer = dayjsLocalizer(dayjs);

// Définir les interfaces pour TypeScript
interface CalendarEvent extends Event {
    title: string;
    start: Date;
    end: Date;
}

interface RendezVous {
    id: number;
    start_date: string;
    end_date: string;
    user_id: number;
}

const lang = {
    week: 'Semaine',
    work_week: 'Semaine de travail',
    day: 'Jour',
    month: 'Mois',
    previous: '◀',
    next: '▶',
    today: `Aujourd'hui`,
    agenda: 'Agenda',
};

const DnDCalendar = withDragAndDrop<CalendarEvent>(Calendar);

function SchedulerComponent() {
    const [isAddRdvFormOpen, setIsAddRdvFormOpen] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [events, setEvents] = useState<CalendarEvent[]>([
        {
            start: dayjs().toDate(),
            end: dayjs().add(1, "day").toDate(),
            title: "Rendez-vous",
        },
    ]);

    // Initialisation de React Hook Form
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>({
        defaultValues: {
            start_date: dayjs().format('YYYY-MM-DDTHH:mm'),
            end_date: dayjs().add(1, 'hour').format('YYYY-MM-DDTHH:mm')
        }
    });

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            setIsSubmitting(true);
            console.log("Soumission du formulaire avec les données:", data);

            const result = await addRendezvous(data.user_id, data.adresse, data.start_date, data.end_date);
            console.log("Résultat de l'ajout:", result);

            if (!result) {
                setConfirmationMessage("Rendez-vous ajouté avec succès !");
                setTimeout(() => setConfirmationMessage(null), 3000);
                await fetchRendezvous();
                reset();
                setIsAddRdvFormOpen(false);
            } else {
                setConfirmationMessage("Erreur lors de l'ajout du rendez-vous.");
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout du rendez-vous:", error);
            setConfirmationMessage("Erreur lors de l'ajout du rendez-vous.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchRendezvous = async () => {
        try {
            const dataRdv = await get_rendezvous();
            if (dataRdv && Array.isArray(dataRdv)) {
                const formattedEvents = dataRdv.map((rdv: RendezVous) => ({
                    start: new Date(rdv.start_date),
                    end: new Date(rdv.end_date),
                    title: "Rendez vous de : " + rdv.user_id || "Rendez-vous",
                }));
                setEvents(formattedEvents);
            } else {
                console.log("Aucun rendez-vous trouvé ou format invalide");
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des rendez-vous:", error);
        }
    };

    useEffect(() => {
        fetchRendezvous();
    }, []);

    return (
        <div className="scheduler element">
            <button
                onClick={() => setIsAddRdvFormOpen(true)}
                className="form_button"
            >
                Ajouter un rendez-vous
            </button>

            {isAddRdvFormOpen && (
                <div className="fixed inset-0 flex justify-center items-center z-20">
                    <div className="bg-[#ffffff] rounded-2xl shadow-lg p-6 md:w-2/3 w-4/5 max-w-5xl relative">
                        <div className="text-center text-xl font-bold mb-4">
                            Ajouter un rendez-vous
                        </div>
                        <button
                            onClick={() => setIsAddRdvFormOpen(false)}
                            className="absolute top-2 right-2 rounded-full"
                        >
                            &times;
                        </button>

                        {confirmationMessage && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                                {confirmationMessage}
                            </div>
                        )}

                        <form
                            className="flex flex-col gap-4"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="form-group">
                                <label htmlFor="start_date" className="block mb-2">Date de début :</label>
                                <input
                                    type="datetime-local"
                                    id="start_date"
                                    className="w-full p-2 border rounded"
                                    {...register("start_date", { required: "Ce champ est requis" })}
                                />
                                {errors.start_date && (
                                    <span className="text-red-500">{errors.start_date.message}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="end_date" className="block mb-2">Date de fin :</label>
                                <input
                                    type="datetime-local"
                                    id="end_date"
                                    className="w-full p-2 border rounded"
                                    {...register("end_date", { required: "Ce champ est requis" })}
                                />
                                {errors.end_date && (
                                    <span className="text-red-500">{errors.end_date.message}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="adresse" className="block mb-2">Adresse :</label>
                                <input
                                    type="text"
                                    id="adresse"
                                    className="w-full p-2 border rounded"
                                    placeholder="Adresse du rendez-vous"
                                    {...register("adresse", { required: "Ce champ est requis" })}
                                />
                                {errors.adresse && (
                                    <span className="text-red-500">{errors.adresse.message}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="user_id" className="block mb-2">ID de l'utilisateur :</label>
                                <input
                                    type="text"
                                    id="user_id"
                                    className="w-full p-2 border rounded"
                                    placeholder="ID de l'utilisateur"
                                    {...register("user_id", { required: "Ce champ est requis" })}
                                />
                                {errors.user_id && (
                                    <span className="text-red-500">{errors.user_id.message}</span>
                                )}
                            </div>

                            <div className="flex space-x-4 mt-4">
                                <button
                                    type="submit"
                                    className="form_button w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "En cours..." : "Ajouter"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsAddRdvFormOpen(false)}
                                    className="form_button w-full"
                                    disabled={isSubmitting}
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <DnDCalendar
                defaultDate={dayjs().toDate()}
                defaultView="day"
                events={events}
                localizer={localizer}
                resizable
                style={{ height: "80vh", margin: "20px" }}
                messages={lang}
                culture="fr"
            />
        </div>
    );
}

export default SchedulerComponent;