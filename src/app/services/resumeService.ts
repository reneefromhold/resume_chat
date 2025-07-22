import { json } from "stream/consumers";

export type roleType = "FullTime" | "Volunteer";

export interface Profile {
    languages: string[],
    frameworks: string[],
    dev: string[], 
    infrastructure: string[],
    ai : string[],
	interests : string[],
    roles: Role[]
}

export interface Role {
    title: string,
    startDate: string,
    endDate: string,
    companyName: string,
    companyOverview: string,
    city: string,
    state: string,
    industry: string,
    stack: string[],
    summary: string,
    achievements: string[],    
    roleType: roleType,
    url?: string,
    github?: string
}

export function loadProfile() : Promise<Profile> {

    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resume`, { cache: 'no-store' }).then(response => {
        return response.json();
    }).then((jsonData) => {
        return {
            languages: jsonData.languages,
            frameworks: jsonData.frameworks,
            dev: jsonData.dev,
            infrastructure: jsonData.infrastructure,
            ai : jsonData.ai,
            interests : jsonData.interests,
            roles : jsonData.roles.length <= 0 ? [] : jsonData.roles
        };
    });
}