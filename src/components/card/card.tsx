import './card.css';

export interface CardProps {
    children: React.ReactNode;
}

export default function Card({children}: CardProps){
    return (
        <div className="bg-[#F3F4F6] shadow-sm max-w-sm card_div border border-gray-200 rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
            {/* <img src="https://via.placeholder.com/400x200" alt="Preview" className="w-full h-48 object-cover" /> */}
            {children}
        </div>
    );
}
