import React from 'react'
import Navbar from "../components/Navbaar"
import { Toaster } from "sonner"
import Footer from "../components/Footer"
import Renthouse from '@/components/Renthouse'

const Landing = () => {
    return (
      <>
        <Toaster />
        <main className="min-h-screen">
          <Navbar />
         <Renthouse/>
          <Footer/>
        </main>
      </>
    )  
}

export default Landing