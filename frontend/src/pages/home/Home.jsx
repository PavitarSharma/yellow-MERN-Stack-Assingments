import React from 'react'
import Contact from '../../components/Contact'
import Contacts from '../../components/Contacts'
import Navbar from '../../components/Navbar'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Contact />
      <Contacts />
    </div>
  )
}

export default Home