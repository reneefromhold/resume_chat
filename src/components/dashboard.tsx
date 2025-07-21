import { ReactNode, } from "react";
import { Role, loadRoles } from "../app/services/resumeService";
import React from "react";
import RoleDetail from "./roleDetail/roleDetail";
import Chatbot from "./chatbot/chatbot";

export default async function Dashboard() {
    const roles = await loadRoles('FullTime');

    
    function buildRoleDetails(ftRoles: Role[]): ReactNode {
        if (ftRoles.length === 0) {
            return <></>;
        }

        return (
            <>
                {ftRoles.map((r, index) => (
                    <RoleDetail key={`rd_${index}`} role={r} />
                ))}
            </>
        )
    }

    return (
        <>
        <div className="mt-4">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto flex justify-between w-full">
                <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Contact Information</h3>
                    <div className="space-y-2 text-gray-600">
                        <p>📧 reneefromhold@gmail.com</p>
                        <p>📍 Philadelphia, PA</p>
                        <p>💼 linkedin.com/in/reneefromhold</p>
                        <p>🐙 github.com/reneefromhold</p>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">AI Tooling</span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Open Source</span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">FullStack</span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Frontend</span>
                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Running</span>
                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Coaching</span>
                    </div>
                </div>
            </div>            
        </div>
        <div className="mt-4">
            <h2 className="text-3xl text-slate-800 text-center font-semibold">Work Experience</h2>
            <div className="max-w-4xl mx-auto space-y-8">
                {/* <!-- stacks vertically on mobile, switches to row on medium screens and up --> */}
                {buildRoleDetails(roles ?? [])}
            </div>
        </div>
        </>
    )
};