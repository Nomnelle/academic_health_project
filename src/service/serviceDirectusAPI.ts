import axios from "axios";
import {Patient, physical, physiological} from "../types.tsx";

export class ServiceDirectusAPI {

    private directusURL:string = import.meta.env.VITE_DIRECTUS_URL

// -------------- Post Requests --------------

    async post_admin_user(email: string, password: string, first_name: string, last_name: string) {
        const data = {
            "role" : "16317dcf-1e2f-4fba-969f-6f6b15ba1062",
            "email": email,
            "password": password,
            "first_name": first_name,
            "last_name": last_name
        }
        return await this.post_API(this.directusURL, "users", data);
    }

    async post_normal_user(email: string, password: string, first_name: string, last_name: string) {
        const data = {
            "role" : "0777b505-b6cc-4308-9f17-c47fda65da29",
            "email": email,
            "password": password,
            "first_name": first_name,
            "last_name": last_name
        }
        return await this.post_API(this.directusURL, "users", data);
    }

    async post_auth_user(email: string, password: string) {
        const data = {
            "email": email,
            "password": password
        }
        const response = await this.post_API(this.directusURL, "auth/login", data);
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        return await response;
    }

    async post_refresh_token() {
        const refresh_token = localStorage.getItem("refresh_token");
        const data = {
            "refresh_token": refresh_token,
            "mode": "json"
        }
        const response = await this.post_API(this.directusURL, "auth/refresh", data);
        if (response === undefined) {
            console.log("Refresh token expired, authentification impossible");
            return;
        }
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        return response;
    }

// -------------- End Post Requests --------------

// -------------- Get Requests --------------
    async get_items_people():Promise<Patient[]> {
        return this.get_API<Patient[]>(this.directusURL, "items/people");
    }

    async get_patient_by_id(id: string):Promise<Patient> {
        return this.get_API<Patient>(this.directusURL, `items/people/${id}`);
    }

    async get_patients_by_keyword(keyword:string):Promise<Patient[]> {
        return this.get_API(this.directusURL, `items/people?filter[lastname]=${keyword}`);
    }

    async get_items_physiologicalData(id: string = ""): Promise<physiological[]> {
        if (id !== "") {
            return this.get_API(this.directusURL, `items/physiologicalData?filter[people_id]=${id}&sort=date`);
        } else {
            return this.get_API(this.directusURL, "items/physiologicalData");
        }
    }
    async get_items_physicalActivities(id: string = ""):Promise<physical[]> {
        if (id !== "") {
            return this.get_API(this.directusURL, `items/physicalActivities?filter[people_id]=${id}&sort=date`);
        } else {
            return this.get_API(this.directusURL, "items/physicalActivities");
        }
    }

// With access_token
    async get_psychic_data(user_id: string = "") {
        const access_token = localStorage.getItem("access_token");
        if (access_token === null) {
            console.error("No access token found");
            return "No access token found, authentificate or use refresh token to have access token first";
        }
        const config = {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
        if (user_id !== "") {
            return this.get_API(this.directusURL, `items/psychicData?filter[people_id]=${user_id}&sort=date`, config);
        } else {
            return await this.get_API(this.directusURL, "items/psychicData", config);
        }
    }

// -------------- End Get Requests --------------

// -------------- Intern function to avoid code duplication --------------

    private async get_API<T>(url: string, endpoint: string, config: any = {}):Promise<T> {
        let response = null;
        try {
            if (config) {
                response = await axios.get(`${url}/${endpoint}`, config);
            } else {
                response = await axios.get(`${url}/${endpoint}`);
            }
        } catch (error) {
            console.log(`Request Error (${endpoint}): ${error}`);
            throw error;
        }
        return response.data?.data as T;
    }

    private async post_API(url: string, endpoint: string, data: any) {
        let response = null;
        try {
            response = await axios.post(`${url}/${endpoint}`, data);
        } catch (error) {
            console.log(`Request Error (${endpoint}): ${error}`);
            return ;
        }
        return response.data
    }
    // -------------- End Intern function to avoid code duplication --------------
}


