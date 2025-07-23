export type roleType = "FullTime" | "Volunteer";

export interface Profile {
    languages: string[],
    frameworks: string[],
    dev: string[], 
    infrastructure: string[],
    ai : string[],
	interests : string[],
    education: Education[],
    roles: Role[],
    certifications: Certification[]
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

export interface Education {
    school: string,
    major : string,
    degree: string
}

export interface Certification {
    name: string,
    provider: string,
    year: string
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
            education: jsonData.education,
            roles : jsonData.roles.length <= 0 ? [] : jsonData.roles,
            certifications: jsonData.certifications
        };
    });
}