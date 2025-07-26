import {ReactNode} from "react";

export type ContextProviderProps = {
    children: ReactNode;
};

export type GraphType = "physical" | "psychological" | "physiological";

export type Patient = {
    id: string;
    firstname: string;
    lastname: string;
    birthyear: number;
    height: number;
    weightStart: number;
    weightGoal: number;
    bmiStart: string;
    bmiGoal: string;
    activityProfile:string;
    sex: number;
    physicalActivities:number[];
    physiologicalData:number[];
}

export interface MenuPatientProps {
    id: string | undefined;
}

export interface RenderPropsKeywords {
    keyword: string;
}

export type PatientsProps = {
    patients: Patient[] | null | undefined;
}

export type GraphProps = {
    graphType: GraphType;
}

export type physiological = {
    id:string;
    date: Date | null;
    weight:number;
    people_id:string;
}

export type physical = {
    id: string;
    type:string;
    duration:number;
    numberOfSteps:number;
    consumedCalories:number;
    weight:number;
    people_id:string;
    date:Date|null;
}