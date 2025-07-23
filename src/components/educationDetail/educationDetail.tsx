import { Education } from "@/app/services/resumeService";

export default function EducationDetail( props: {education: Education} ){
    
    return (
        <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-600">{props.education.school}</h2>
            <p className="text-md text-slate-700 mb-[5px]">{ props.education.degree ? `${props.education.major} - ${props.education.degree}` : props.education.major}</p>
        </div>
    )
}