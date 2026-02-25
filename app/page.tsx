import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import HeroSection from './components/landing/HeroSection'
import ProblemSection from './components/landing/ProblemSection'
import SolutionSection from './components/landing/SolutionSection'
import FeaturesSection from './components/landing/FeaturesSection'
import HowItWorksSection from './components/landing/HowItsWorkSection'
import WhoItsForSection from './components/landing/WhoIsItFor'
import CTASection from './components/landing/CTAsection'
import Navbar from './components/landing/Navbar'

const page = async() => {
  const session = await auth()

  if(session?.user){
    redirect('/dashboard')
  }
  return (
    <div >
      <Navbar/>
      <HeroSection/>
      <ProblemSection/>
      <SolutionSection/>
      <FeaturesSection/>
      <HowItWorksSection/>
      <WhoItsForSection/>
      <CTASection/>
    </div>
  )
}

export default page