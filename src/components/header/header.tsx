

import "./header.css";

export default function Header(){
    return (
        <div className="gradient-bg text-white py-10">
            <div className="container mx-auto px-6 text-center ">
                <div className="w-32 h-32 bg-white rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-bold text-gray-800">
                    RF
                </div>
                <h1 className="text-3xl font-bold mb-4">Renee Fromhold</h1>
                <p className="text-xl ">Senior Full-Stack Software Engineer</p>
                <p className="text-xl mb-3">Drawn to meaningful work and making an impact</p>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">Welcome to my page 👋</p>
                {/* <p className="text-lg opacity-90 max-w-2xl mx-auto">For a copy of my resume, just ask my ChatBot</p> */}
            </div>
        </div>
    )
};