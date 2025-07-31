import Header from '../components/header/header';
import Footer from '../components/footer';
import Dashboard from "@/components/dashboard";
import { Suspense } from "react";
import Chatbot from '@/components/chatbot/chatbot';
import { NewtonsCradle } from 'ldrs/react'

export default function Home() {
  const fallBack = <main className="flex items-center justify-center min-h-[60vh]">
        <div role="status" aria-live="polite" className="flex flex-col items-center">
          <NewtonsCradle size="100" speed="1.4" color="black" aria-label="Loading Profile" />
          <span className="mt-4 text-gray-600">Loading Profile</span>
        </div>
      </main>;

  return (
    <div className='bg-slate-100'>
    <Header></Header>
    <Suspense fallback={fallBack}>
      <Dashboard />
    </Suspense>
    <Chatbot></Chatbot>
    <Footer></Footer>
    </div>
  );
}
