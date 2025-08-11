'use client';
import { useEffect, useRef, useState } from "react";
import "./chatbot.css";
import React from "react";
import DOMPurify from 'dompurify';
import { ChatResponse } from "@/app/services/chatService";

export default function Chatbot() {
    const [chatOpen, setChatOpen] = useState<boolean>(true);
    const [question, setQuestion] = useState<string>("");
    const [response, setResponse] = useState<React.ReactNode[]>([]);
    const endRef = useRef<HTMLDivElement>(null);
    const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const suggestedSearches = ['What are her total years working with React?', 
                        'What is this website built with?', 
                        (!isMobileDevice ? 'Download her resume' : 'Tell me about her work with REST APIs?')];

    const thinkingKey: string = `thnk${Date.now()}`;
    const thinkingMessage: React.ReactNode = (
        <div key={thinkingKey}
            className="chat-bubble-bot text-gray-500 p-3 rounded-lg max-w-xs"
        >
            ...
        </div>
    );

    useEffect(() => {
        const defaultChat = [<div key='c1' className='chat-bubble-bot text-gray-800 p-3 rounded-lg max-w-xs'>
            Hi! I&apos;m Renee&apos;s AI assistant. Ask me anything about her experience, skills, or side projects!
        </div>];
        setResponse(defaultChat);
    }, []);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [response]);


    const toggleChat = () => {
        const changeChatOpenTo = !chatOpen;
        setChatOpen(changeChatOpenTo);
    }

    const handleChatKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            submitQuestion();
        }
    }

    function isInputSafe(input : string) {
        const cleaned = DOMPurify.sanitize(input);
        return cleaned === input;
    }

    const openResume = () => {
        const resumeUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/resume.pdf`;
        window.open(resumeUrl, '_blank');
    }

    const submitQuestion = async (suggestion?: string) => {
        const capturedQuestion = suggestion ?? question;
        if (capturedQuestion.trim() === "") {
            return;
        }

        if (!isInputSafe(capturedQuestion)) {
            const warning = "🚨 Malicious or unsafe content detected:";
            const maliceMessage: React.ReactNode = <div key={`warn${response.length + 1}`} className='chat-bubble-user text-white p-3 rounded-lg max-w-xs ml-auto'>{warning}</div>;
            setResponse(prev => [...prev, maliceMessage]);
            return;
        }

        setQuestion('');
        const userMessage: React.ReactNode = <div key={`cu${response.length + 1}`} className='chat-bubble-user text-white p-3 rounded-lg max-w-xs ml-auto'>{capturedQuestion}</div>;
        setResponse(prev => [...prev, userMessage, thinkingMessage]);

        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/openai`;
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: capturedQuestion })
        }).then(response => response.json()
        ).then( (chatResponse : ChatResponse) => {
            const responseText: string = (chatResponse.tools && chatResponse.tools.length > 0) ? 'Resume downloaded' : chatResponse.response;
            const responseNode: React.ReactNode = <div key={`oair${response.length + 1}`} className='chat-bubble-bot text-gray-800 p-3 rounded-lg max-w-xs'>{responseText}</div>;
            if (chatResponse.tools?.includes("OpenResume")) {
                openResume();
            } 
            
            setResponse(prev =>
                prev.map((node) =>
                    React.isValidElement(node) && node.key === thinkingKey ? responseNode : node
                )
            );
        });
    }

    return (<div className="fixed bottom-6 right-6 z-50">
        <button onClick={toggleChat} className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-300">
            {!chatOpen && <span className="text-2xl">💬</span>}
            {chatOpen && <span className="text-2xl">✕</span>}
        </button>

        {chatOpen &&
            <div className="absolute bottom-20 right-0 w-80 bg-white rounded-lg shadow-xl border">
                <div className="bg-blue-600 text-white p-4 rounded-t-lg">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold">Ask me anything!</h3>
                        <button onClick={toggleChat} className="text-white hover:text-gray-200">✕</button>
                    </div>
                </div>

                <div className="overflow-y-auto p-4 space-y-3 max-h-[80vh]">
                    {response}
                    <div ref={endRef} />
                </div>

                <div className="p-4 border-t">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {response.length <= 4 && suggestedSearches.map(pill => (
                        <button key={pill} onClick={() => submitQuestion(pill)}
                            className="text-left px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
                        >{pill}
                        </button>
                        ))}
                    </div>

                    <div className="flex space-x-2">
                        <input value={question} onChange={(e) => { setQuestion(e.target.value) }} type="text" placeholder="Type your question..." className="flex-1 border rounded-lg px-3 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" onKeyPress={handleChatKeyPress}></input>
                        <button onClick={() => submitQuestion()} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">Send</button>
                    </div>
                </div>
            </div>
        }
    </div>);
}