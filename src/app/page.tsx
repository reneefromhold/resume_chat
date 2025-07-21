import Header from '../components/header/header';
import Footer from '../components/footer';
import Dashboard from "@/components/dashboard";
import { Suspense } from "react";
import Chatbot from '@/components/chatbot/chatbot';


export default function Home() {
  return (
    <>
    <Header></Header>
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <Dashboard />
    </Suspense>
    <Chatbot></Chatbot>
    <Footer></Footer>
    </>
  );
}
