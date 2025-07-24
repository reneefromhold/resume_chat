import { Role } from "@/app/services/resumeService";

export default function RoleDetail( props: { role: Role}){

    const formattedStart = formatResumeDate(props.role.startDate);
    const formattedEnd = formatResumeDate(props.role.endDate);
    const formattedDuration : string = `${props.role.companyName} • ${formattedStart} - ${formattedEnd}`;
    
    function formatResumeDate(strDate : string) : string {
        const dt = new Date(strDate);
        const formattedDate = dt.toLocaleDateString('en-US',
                { year: 'numeric', month: 'short' });
        return formattedDate;
    }    

    return (
        <div className="bg-white rounded-lg shadow-md p-8 mx-4 md:mx-auto">
            <div>
                <h2 className="text-2xl font-semibold text-slate-600">{props.role.title}</h2>
                <p className="text-md text-slate-700 mb-[5px]">{formattedDuration}</p>
                <>
                    {props.role.summary.split('\n\n').map((pd, idx) => 
                        <p className="text-gray-600 text-md mb-4" key={`sum${idx}`}>{pd}</p>)}
                </>
            </div>
        </div>
    );
}