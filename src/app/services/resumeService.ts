import data from "../../data/resume.json";
import textResume from "../../data/resume";

const PAUSED_FOR_FAMILY = "Paused for family";

export type roleType = "FullTime" | "Volunteer";

export interface Profile {
    thisWebsite: string,
    languages: string[],
    frameworks: string[],
    dev: string[],
    infrastructure: string[],
    ai: string[],
    interests: string[],
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
    major: string,
    degree: string
}

export interface Certification {
    name: string,
    provider: string,
    year: string
}

export function loadProfile(): Profile {
    return data as Profile;
}

export function formatResume() {

    const roles = data.roles.map(role => {
        const dates = `${role.startDate} – ${role.endDate}`;
        const stack = role.stack.join(', ');
        const achievements = role.achievements.map(a => `- ${a}`).join('\n');

        return `
        ${role.title} at ${role.companyName} (${dates}) — ${role.city}, ${role.state}
        Industry: ${role.industry}
        Stack: ${stack}

        ${role.summary || ''}

        Achievements:
        ${achievements}
            `.trim();
    }).join('\n\n');

    const education = `Education: ${data.education.map(e => {
        const degreeDetails = e.degree !== '' ? `Earned a ${e.degree}` : PAUSED_FOR_FAMILY;
        return `Majored in ${e.major} at ${e.school} ${degreeDetails}`;
    }).join(', ')}`;

    const certifications = `Certifications: ${data.certifications.map(c =>
        `Earned a ${c.name} from ${c.provider} in ${c.year}`).join(', ')}`;

    const interests = `Interests and hobbies include ${data.interests.join(", ")}`;

    return `${interests} ${education} ${certifications} ${roles}`;
}

export function formatResumeFromText() {
    const interests = `Interests and hobbies include ${data.interests.join(", ")}`;
    return `${textResume} ${interests}`;
}

