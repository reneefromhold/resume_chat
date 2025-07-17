import Header from '../components/header';
import Footer from '../components/footer';
import Dashboard from "@/components/dashboard";
import { Suspense } from "react";


export default function Home() {
  return (
    <>
    <Header></Header>
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <Dashboard />
    </Suspense>
    <Footer></Footer>
    </>
  );
}
