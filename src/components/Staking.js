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

function Staking () {

    return (
      <div className="App">
        <Navbar name="Staking" />

        <div className='relative h-full pt-6' style={{backgroundColor: "#1F2633"}}>
          <div className='mt-6 flex h-full flex-col items-center relative'>
              <div className='first_section relative px-4 sm:px-6 flex flex-col justify-center items-center w-full' style={{height: "1000px"}}>
        
                {/* Staking */}
                <div className="roadmap_card rgb justify-center px-4 flex flex-col" style={{width: "400px", height: "600px", backgroundColor: "rgba(0,0,0,0.9)"}}>
        
                    <div><img src="img/pepe_text.png" style={{width: "150px", height:"50px"}}></img></div>
                    
                    <div id='devote' className='my-5 flex justify-center tabcontent' style={{height: "350px"}}>
                        <div className='border border-gray-700 p-4 rounded-xl' style={{backgroundColor: "#1A1530"}}>
                            <div className='flex flex-row justify-between'>
                                <div className='text-gray-400 flex flex-row items-center text-sm'>
                                    <p className='pr-1'>Locked Amount</p>
                                </div>
                                <div className='text-gray-400 text-sm'>
                                    MIN
                                </div>
                            </div>
                            <div className='py-2'>
                                <input className='bg-white text-gray-700 rounded-md w-full text-sm px-3 py-3' type='text' placeholder='0'></input>
                            </div>
                            <div className='py-3 flex flex-row'>
                                <div className='flex flex-col w-1/2 mr-2'>
                                    <p className='text-gray-400 text-sm pb-2 text-left'>Lock Date</p>
                                    <input className='bg-white text-gray-700 rounded-md w-full text-sm px-3 py-3' type='text' placeholder='0/00/0000'></input>
                                </div>
                                <div className='flex flex-col w-1/2'>
                                    <p className='text-gray-400 text-sm pb-2 text-left'>Unlock Date</p>
                                    <input className='bg-white text-gray-700 rounded-md w-full text-sm px-3 py-3' type='text' placeholder='0/00/0000'></input>
                                </div>
                            </div>
                            <div className='flex flex-row items-center py-3'>
                                <p className='text-gray-400 text-sm pr-1'>Claim</p>
                                <input className='bg-white text-gray-700 rounded-md w-full text-sm px-3 py-3' type='text' placeholder='0'></input>
                            </div>
                            <div className='w-full my-2 py-3 rounded-md text-white lorswap_vote text-center'>
                                STAKE
                            </div>
                        </div>
                    </div>

                    <div>Total Staked Pepe Police: 0</div>
                    <div>Deposit Fee: 0 %</div>
                </div>
              </div>
            </div>
        </div> 

        {/* footer */}
        <Footer />
      </div>
    );
}

export default Staking;
