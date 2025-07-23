import { Certification } from "@/app/services/resumeService";

export default function CertificationDetail(props: { certification: Certification }) {

    function formatCertificationDate(certDate: string) : string {
        const dt = new Date(certDate);
        const formattedDate = dt.toLocaleDateString('en-US',
                { year: 'numeric', month: 'short' });
        return formattedDate;
    }

    const certDate : string = formatCertificationDate(props.certification.year);

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-600">{props.certification.name}</h2>
            <p className="text-sm text-slate-700 mb-[5px]">{`Issued ${certDate} through ${props.certification.provider}`}</p>
        </div>
    )
}