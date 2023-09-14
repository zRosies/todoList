import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Outlet } from 'react-router-dom'
import Home from './components/Home'
import Navigation from './components/Navigation'
import Footer from './Footer'

function App() {
 
  return (
    <>
      {/* <Navigation></Navigation>   */}
      <Outlet></Outlet>
      <Footer></Footer>
     
    </>
  )
}

export default App;
