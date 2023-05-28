/* https://lorwatch.vercel.app/ */

import * as React from 'react'
import '../css/react-base.css'
import '../css/animations.css';
import '../css/second_section.css';
import '../css/roadmap.css';
import '../css/real_roadmap.css';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function StakingNFT () {

    return (
      <div className="App">
        <Navbar name="NFTstaking"/>

        <div className='relative h-full pt-6' style={{backgroundColor: "#1F2633"}}>
          <div className='mt-6 flex h-full flex-col items-center relative'>
              <div className='first_section relative px-4 sm:px-6 flex flex-col justify-center items-center w-full' style={{height: "1000px"}}>
        
                {/* Staking */}
                <div className="roadmap_card rgb pt-8 px-4 flex flex-col" style={{width: "400px", height: "520px", backgroundColor: "rgba(0,0,0,0.9)"}}>
                    {/* <div className='text-white text-xl font-bold my-5' style={{height: "30px"}}>Pepe Police</div> */}
                    <div className='text-orange-400 text-2xl font-bold'>Stake NFT</div>
                    
                    <div id='devote' className='my-5 tabcontent' style={{height: "350px"}}>
                        <div className='border border-gray-700 p-4 rounded-xl' style={{backgroundColor: "rgba(133, 100, 28, 0.3)"}}>
                            <div className='grid grid-cols-3 pb-5 border-b border-orange-300'>
                                <div className='text-gray-400 flex flex-row items-center text-sm'>
                                    <p style={{ fontSize: "25px" }} className='pr-1 text-orange-400 font-bold'>#00000</p>
                                </div>
                                <div className='py- col-span-2'>
                                    <img className='rounded-xl' src="img/1.jpg"></img>
                                </div>
                            </div>

                            <div className='flex flex-row justify-between pt-7'>
                                <div className='text-gray-400 flex flex-row items-center text-sm'>
                                    <p className='text-left text-xl text-orange-400 font-bold'>APR : 0 %</p>
                                </div>
                            </div>

                            <div className='flex flex-row justify-between py-3'>
                                <div className='text-gray-400 flex flex-row items-center text-sm'>
                                    <p className='text-xl text-left text-orange-400 font-bold'>Reward : 0 PPT</p>
                                </div>
                            </div>

                            <div className='w-full my-2 py-3 rounded-md text-white lorswap_vote text-center font-bold' style={{background: "linear-gradient(271.56deg, rgb(133, 100, 28) 44.99%, rgb(133, 79, 28) 74.63%)"}}>
                                STAKE
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
        </div> 

        <Footer />
        </div>
    );
}

export default StakingNFT;
