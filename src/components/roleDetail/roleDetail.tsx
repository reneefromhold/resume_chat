import { Role } from "@/app/services/resumeService";

export default function RoleDetail( props: { role: Role}){

    console.log(`start date is ${props.role.startDate}`);
    console.log(`end date is ${props.role.endDate}`);
    const formattedStart = formatResumeDate(props.role.startDate);
    const formattedEnd = formatResumeDate(props.role.endDate);
    const formattedDuration : string = `${props.role.companyName} • ${formattedStart} - ${formattedEnd}`;
    
    function formatResumeDate(strDate : string) : string {
        const dt = new Date(strDate);
        console.log(dt);
        const formattedDate = dt.toLocaleDateString('en-US',
                { year: 'numeric', month: 'long' });
        return formattedDate;
    }    

    return (
        <section className="bg-zinc-100 rounded-2xl shadow-md px-4 py-6 sm:px-6 sm:py-8 max-w-full sm:max-w-2xl mx-auto space-y-4 sm:space-y-6">
            <div>
                <h2 className="text-2xl font-semibold text-slate-600">{props.role.title}</h2>
                <p className="text-sm text-slate-700 mb-[5px]">{formattedDuration}</p>
                <>
                    {props.role.summary.split('\n\n').map((pd, idx) => 
                        <p className="text-gray-600 text-md mb-4" key={`sum${idx}`}>{pd}</p>)}
                </>
            </div>
        </section>
    );
}