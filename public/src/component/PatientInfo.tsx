import {Patient} from "../types.tsx";
import { usePatient } from "../contexts/PatientContext";

function calculate_Age(patient: Patient): number | null {
    const now = new Date();
    if (patient.birthyear != null) {
        return now.getFullYear() - patient.birthyear;
    } else {
        return null;
    }
}

export function calculateCalories(patient: Patient) {
    if (!patient.sex || !patient.weightStart || !patient.height || !patient.birthyear) return "Données manquantes";

    const age = calculate_Age(patient);

    if(age!=null){
        const bmr =
            patient.sex == 1
                ? 10 * patient.weightStart + 6.25 * patient.height - 5 * age + 5
                : 10 * patient.weightStart + 6.25 * patient.height - 5 * age - 161;

        const activityFactors: Record<string, number> = {
            "sedentary": 1.2,
            "low active": 1.2,
            "somewhat active": 1.55,
            active: 1.55,
            "highly active": 1.9,
            "": 1.2
        };

        const activityFactor = activityFactors[patient.activityProfile] || 1.2;
        const maintenanceCalories = bmr * activityFactor;

        let finalCalories = maintenanceCalories;
        if (patient.weightStart > patient.weightGoal) {
            finalCalories -= 500; // typical deficit
        } else if (patient.weightStart < patient.weightGoal) {
            finalCalories += 500; // typical surplus
    }
        return Math.round(finalCalories);

    }
    return "Données manquantes";
}

function PatientInfo() {

    const patient = usePatient();

    const bmiTranslation: Record<string, string> = {
        "underweight": "Insuffisance pondérale",
        "normal": "Poids normal",
        "overweight": "Surpoids",
        "moderate obesity": "Obésité modérée",
        "severe obesity": "Obésité sévère",
        "morbid obesity": "Obésité morbide",
    };


    const activityTranslation: Record<string, string> = {
        "sedentary": "Sédentaire",
        "low active": "Activité faible",
        "somewhat active": "Activité modérée",
        "active": "Activité standard",
        "highly active": "Activité importante",
        "": "Pas de données"
    };

    function translateValue<T extends Record<string, string>>(
        dict: T,
        key: string,
        label = "Inconnu"
    ): string {
        if (!dict[key]) {
            console.warn(`Unknown value: ${key}`);
        }
        return dict[key] ?? label;
    }

        function give_gender(patient: Patient): string | null {
            if (patient.sex == 1) {
                return "homme";
            }
            if (patient.sex == null) {
                return null;
            } else {
                return "femme";
            }
        }

        if (patient) {
            return (<div className="info_patient">
                <ul>
                    {patient.birthyear && (
                        <li>
                            <img src="/icons/icon_age_small.png" alt="icon age patient"/>
                            <p>Âge :</p>
                            <p>{calculate_Age(patient)}</p>
                        </li>
                    )}
                    {patient.sex && (
                        <li>
                            <img src="/icons/icon_sex_small.png" alt="icon sexe patient"/>
                            <p>Sexe :</p>
                            <p>{give_gender(patient)}</p>
                        </li>
                    )}
                    {patient.height != null && (
                        <li>
                            <img src="/icons/icon_tape_small.png" alt="icon taille patient"/>
                            <p>Taille :</p>
                            <p>{patient.height} cm</p>
                        </li>
                    )}
                    {patient.weightStart != null && (
                        <li>
                            <img src="/icons/icon_balance_small.png" alt="icon poids patient"/>
                            <p>Poids initial :</p>
                            <p>{patient.weightStart} kg</p>
                        </li>
                    )}
                    {patient.bmiStart && (
                        <li>
                            <img src="/icons/icon_bio_small.png" alt="icon IMC départ patient"/>
                            <p>IMC de départ :</p>
                            <p>{translateValue(bmiTranslation, patient.bmiStart)}</p>
                        </li>
                    )}

                    {patient.activityProfile != null && (
                        <li>
                            <img src="/icons/icon_sports_home.svg" alt="icon activité sportive patient"/>
                            <p>Niveau d'activité :</p>
                            <p>{translateValue(activityTranslation, patient.activityProfile)}</p>
                        </li>
                    )}

                    {(patient.weightGoal != null) && (
                        <li>
                            <img src="/icons/icon_goal_small.png" alt="icon objectif patient"/>
                            <strong>
                                <p>Objectifs :</p>
                                <p>Poids idéal : {patient.weightGoal} kg</p>
                                <p>IMC voulu : {translateValue(bmiTranslation, patient.bmiGoal)}</p>
                            </strong>
                        </li>
                    )}
                    <li>
                        <img src="/icons/icon_calorie_small.png" alt="icon calorie patient"/>
                        <p>Calories recommandées :</p>
                        <p>{calculateCalories(patient)}</p>
                    </li>
                </ul>
            </div>)
        } else {
            return (<div><p>No data</p></div>);
        }
}

export default PatientInfo;