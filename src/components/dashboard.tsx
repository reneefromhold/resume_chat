import { loadProfile } from "../app/services/resumeService";
import React from "react";
import RoleDetail from "./roleDetail/roleDetail";
import EducationDetail from "./educationDetail/educationDetail";
import CertificationDetail from "./certificationDetail/certificationDetail";

export default async function Dashboard() {
    const profile = await loadProfile();
    const roles = profile.roles;
    const resumeUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/resume.pdf`;

    function getRandomBadgeClass(): string {
        const classes = [
            "bg-blue-100 text-blue-800",
            "bg-green-100 text-green-800",
            "bg-purple-100 text-purple-800",
            "bg-yellow-100 text-gray-800",
            "bg-orange-100 text-orange-800",
            "bg-pink-100 text-pink-800"
        ];

        const randomIndex = Math.floor(Math.random() * classes.length);
        return `${classes[randomIndex]} px-3 py-1 rounded-full text-sm`;
    }

    const renderCollection = (title: string, collection: string[], keyPrefix: string) => {
        return (
            <div className="mt-3">
                <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
                <div className="flex flex-wrap gap-2">
                    {collection.map((l : string, index : number) => 
                        <span key={`${keyPrefix}${index}`} className={getRandomBadgeClass()}>{l}</span>
                    )}
                </div>
            </div>
        );
    }
    

    return (
        <>
        <div className="mt-4 ">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-4 md:mx-auto flex flex-col md:flex-row gap-6 justify-between">
                <div className="whitespace-nowrap flex flex-col gap-1">
                    <h3 className="font-semibold text-gray-800 mb-3">Contact Information</h3>
                    <div className="space-y-2 text-gray-600">
                        <p><a href="mailto: reneefromhold@gmail.com">📧 reneefromhold@gmail.com</a></p>
                        <p>📍 Phoenixville, PA</p>
                        <p><a href={resumeUrl}>📄 Download Resume</a></p>
                        <p><a href="https://www.linkedin.com/in/reneefromhold/">💼 linkedin.com/in/reneefromhold</a></p>
                        <p><a href="https://github.com/reneefromhold">🐙 github.com/reneefromhold</a></p>
                    </div>
                </div>
                <div className="ml-4">
                    {renderCollection("Languages", profile.languages, "pl_")}
                    {renderCollection("Frameworks & Libraries", profile.dev, "pd_")}
                    {renderCollection("Cloud & Infrastructure", profile.infrastructure, "pi_")}
                    {renderCollection("Interests", profile.interests, "pint_")}
                </div>
            </div>            
        </div>
        <div className="mt-8">
            <h2 className="text-3xl text-slate-800 text-center font-semibold">Work Experience</h2>
            <div className="max-w-4xl mx-auto space-y-4 mt-5">
                 {roles.map((r, index) => (
                    <RoleDetail key={`rd_${index}`} role={r} />
                ))}
            </div>
        </div>
        <div className="mt-8">
            <h2 className="text-3xl text-slate-800 text-center font-semibold">Education</h2>
            <div className="max-w-4xl mx-4 md:mx-auto space-y-4 mt-5">
                <div className="bg-white text-black rounded-lg shadow-md p-8">
                    {profile.education.map((edu, index) => (
                        <EducationDetail key={`edu_${index}`} education={edu} />
                    ))}
                </div>
            </div>
        </div>
        <div className="mt-8">
            <h2 className="text-3xl text-slate-800 text-center font-semibold">Certifications</h2>
            <div className="max-w-4xl mx-4 md:mx-auto space-y-4 mt-5">
                <div className="bg-white text-black rounded-lg shadow-md p-8">
                    {profile.certifications.map((cert, index) => (
                        <CertificationDetail key={`cert_${index}`} certification={cert} />
                    ))}
                </div>
            </div>
        </div>
        
        </>
    )
};