import React from 'react'
import Hero from '../../components/Hero/Hero'
import EventSlider from '../../components/Main/EventSlider/EventSlider'
import Body from '../../components/Main/Body/Body'
import Footer from '../../components/Footer/Footer'
import Writeup from '../../components/Main/Writeup/Writeup'

const Home = () => {
  return (
    <>
    <Hero />
    <Body />
    <Writeup />
    <EventSlider />
    <Footer />
    </>
  )
}

export default Home