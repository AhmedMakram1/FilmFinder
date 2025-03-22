import React from 'react'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

function Main() {
  return (
    <>
    
    <NavBar/>
    <Outlet/>
    <Footer></Footer>
    
    </>

  )
}

export default Main