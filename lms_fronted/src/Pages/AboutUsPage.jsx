import React from 'react'
import HomeLayout from '../Layouts/HomeLayout.jsx'
import aboutImage from '../assets/Images/about.svg'
import carousel from '../assets/Images/carousel.jpg'
import carousel1 from '../assets/Images/carousel1.jpg'
import carousel2 from '../assets/Images/carousel2.jpg'
// import carousel1 from '../assets/Images/carousel3.jpg'


const AboutUsPage = () => {
  return (
    <>
      <HomeLayout>
        <div className="pl-20 pt-20 flex flex-col text-white p-10">
          <div className='flex items-center gap-5 mx-10'>
            <section className='w-1/2 space-y-10'>
              <h1 className='text-yellow-500 text-4xl font-semibold'>Affordable and Quality Education</h1>
              <p className='text-xl text-gray-200'>Our goal is to provide affordable and quality education to the world. We are providing the platform for the aspiring teachers to share their skills, creativity and knowledge to each other to empower and contribute in the growth and wellness of mankind.</p>
            </section>
            <div className="w-1/3">
              <img
                src={aboutImage}
                alt="aboutus image"
                className='drop-shadow-2xl'
                id='test1'
                style={{ filter: "drop-shadow(0 10px 10px (rgb(0,0,0)))" }}
              />
            </div>
          </div>
          <h1 className='text-yellow-500 text-3xl text-center mt-20' >Testimonials</h1>

          <div className="carousel w-1/2 m-auto mt-14">
            <div id="slide1" className="carousel-item relative w-full">
              <div className='flex flex-col justify-center items-center gap-4 px-[15%]'>
              <img src={carousel} className="w-full" />
              <h1 className='text-center text-gray-200'>dafsdghgkjhkj</h1>
              <p className='text-center text-gray-200 text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, reprehenderit et repellat nemo dignissimos minima?</p>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle">❮</a>
                <a href="#slide2" className="btn btn-circle">❯</a>
              </div>
              </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
              <img src={carousel1} className="w-full" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle">❮</a>
                <a href="#slide3" className="btn btn-circle">❯</a>
              </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
              <img src={carousel2} className="w-full" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle">❮</a>
                <a href="#slide4" className="btn btn-circle">❯</a>
              </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
              <img src={carousel1} className="w-full" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-circle">❮</a>
                <a href="#slide1" className="btn btn-circle">❯</a>
              </div>
            </div>
          </div>

        </div>
      </HomeLayout>
    </>
  )
}

export default AboutUsPage
