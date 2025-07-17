import { ReactNode, } from "react";
import Card from "./card/card";
import { Role, loadRoles } from "../app/services/resumeService";
import React from "react";
import RoleDetail from "./roleDetail/roleDetail";

export default async function Dashboard() {
    const roles = await loadRoles('FullTime');

    
    function buildFullTimeRoleCards(ftRoles: Role[]): ReactNode {
        if (ftRoles.length === 0) {
            return <></>;
        }

        return (
            <>
                {ftRoles.map((r, index) => (
                    <div className="px-4 sm:px-6 md:px-8" key={`rf_${index}`}>
                        <RoleDetail key={`rd_${index}`} role={r} />
                    </div>
                ))}
            </>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            {/* <!-- stacks vertically on mobile, switches to row on medium screens and up --> */}
            {buildFullTimeRoleCards(roles ?? [])}
        </div>
    )
};