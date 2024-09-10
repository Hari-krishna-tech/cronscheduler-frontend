import { useState } from 'react'
import CronSchedulerLandingPage from './components/CronSchedulerLandingPage'

import './App.css'
import Navbar from './components/NavBar'
import CreateJob from './components/CreateJob'
import UpdateJob from './components/UpdateJob'
import {Routes, Route} from "react-router-dom"

function App() {
  

  return (
    <>
     <Navbar />  {/* Navbar Component */}
      <Routes>
        <Route exact path="/" element={<CronSchedulerLandingPage />} />
        <Route exact path="/create-job" element={<CreateJob />} />
        <Route path="/update-job/:jobId" element={<UpdateJob />} />
      </Routes>
      {/* <Navbar />
      <CronSchedulerLandingPage /> */}
      {/* <CreateJob /> */}
    </>
  )
}

export default App
