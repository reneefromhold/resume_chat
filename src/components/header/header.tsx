

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
            </div>
        </div>
/* 
        <div className="bg-white py-10 text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4"><span className="bg-clip-text">Hi, I'm Renee</span>  👋</h1>
            <p className="text-lg text-gray-600 mb-6">I am senior full-stack engineer with a bias for building with purpose.</p>
            <div className="space-x-4">
                <a href="/resume.pdf" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">📄 View Resume</a>
                <button onClick={askMeAnything} className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100">💬 Ask Me Anything</button>
            </div>
            {showQuestion && 
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question">Question</label>
                    <input maxLength={250} onChange={(e) => setQuestion(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="question" type="text" placeholder="Ask me anything"/>
                    <button className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100" onClick={submitQuestion}>Submit</button>
                </div>
            }
            {response && <div>{response}</div>}
        </div> */
    )
};

{/* <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Hi, I'm Renee</span> */}