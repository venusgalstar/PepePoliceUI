import * as React from 'react'
import '../css/react-base.css'
import '../css/animations.css';
import '../css/second_section.css';
import '../css/roadmap.css';
import '../css/real_roadmap.css';

export default function Example() {
  return (
    <div>
        <div className='footer pt-12 _md:pt-4 flex justify-center  relative'>
           <video autoPlay loop muted className="myVideo absolute w-full border border-gray-600" style={{ objectFit: 'cover', height: "80%"}}>
              {/* <source src="https://belaunch.io/assets/bg.206574b5.mp4" type="video/mp4"></source> */}
              <source src="img/hero.webm" type="video/webm"></source>
          </video> 

          <div className='text-left grid grid-cols-3 _lg:grid-cols-1 _md:grid-cols-1 _sm:grid-cols-1 relative'  style={{width: "1440px"}}>
            <div className='footer_email flex justify-center items-center _md:m-auto'>
              <div className='footerLogo flex flex-col pb-5 py-5'>
                <div className='flex flex-row'>
                  {/* <img className='items-start footer_logo' src="img/head_logo.png" style={{width: "100px", height:"100px"}}></img> */}
                  <div className='flex items-end'>
                    
                  </div>
                </div>
                <div className='flex flex-row footer_email pt-5'>
                  <input type="text" placeholder='Enter Email' className='footer_input mr-2' style={{width: "270px", backgroundColor: "#1F2633", height: "40px"}}></input>
                  <div className='footer_subscirbe focus:ring-4 focus:outline-none focus:ring-spring-green-800 group-hover:from-spring-green-400 group-hover:to-cerulean-600 hover:text-white relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-[#1FD992] to-[#249CD2]  text-white min-w-fit hover:cursor-pointer leading-6'>
                    <span className='group-hover:bg-opacity-0 relative px-5 py-1 transition-all ease-in duration-75 bg-ebony-clay-500 rounded-md flex flex-row font-bold min-w-fit items-center'>Subscribe</span>
                  </div>
                </div>
                <a href="#" className='text-center text-gray-300 px-1 py-1 mt-4 rounded-md mx-1 border border-gray-600 text-sm' style={{backgroundColor: "#1F2633", width: "117px"}}>English (US)&nbsp;˅</a>
              </div>
            </div>
            
            <div className='flex flex-row justify-center _md:text-center'>
              <div className='footerLink pr-24 py-5'>
                <p className='text-sm text-gray-100 font-bold py-2'>General</p>
                <p className='text-sm text-yellow-400 py-1'>About</p>
                <p className='text-sm text-yellow-400 py-1'>Blog</p>
                <p className='text-sm text-yellow-400 py-1'>Contact Us</p>
                <p className='text-sm text-yellow-400 py-1'>Support</p>
                <p className='text-sm text-yellow-400 py-1'>Community</p>
              </div>

              <div className='footerLink py-5'>
                <p className='text-sm text-gray-100 font-bold py-2'>Legal</p>
                <p className='text-sm text-yellow-400 py-1'>Terms & Conditions</p>
                <p className='text-sm text-yellow-400 py-1'>Privacy Policy</p>
                <p className='text-sm text-yellow-400 py-1'>Cookie Policy</p>
              </div>
            </div>

            <div className='flex justify-center flex-col items-center pt-5'>
              <p className='text-lg text-gray-300 font-bold py-2' style={{marginLeft: "-10px"}}>Follow Us</p>
              <div className='flex flex-row py-1 justify-start'>
                  <a href="https://#" target="_blank"><img className='pr-5' src="img/twitter.svg" width="50"></img></a>                  
                  <a href="https://#" target="_blank"><img className='pr-5' src="img/telegram.svg" width="50"></img></a>
                  <a href="https://#" target="_blank"><img className='pr-5' src="img/medium.svg" width="50"></img></a>
              </div>
            </div>
          </div>
        </div>
        <div className='text-sm text-gray-400 py-2'> Copyright 2023 Pepe Police All Rights Reserved </div>
    </div>
  )
}
