export type roleType = "FullTime" | "Volunteer";

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

export function loadRoles(type : roleType) : Promise<Role[]> {

    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/resume`, { cache: 'no-store' }).then(response => {
        return response.json();
    }).then((jsonData) => {
        let roles = jsonData.roles;
        if (roles.length <= 0) {
            return [];
        }

        return roles.filter((r: Role) => r.roleType === type);
    });
}