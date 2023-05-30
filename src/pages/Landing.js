/* https://lorwatch.vercel.app/ */

import * as React from 'react';
import '../css/react-base.css';
import '../css/animations.css';
import '../css/second_section.css';
import '../css/roadmap.css';
import '../css/real_roadmap.css';
import { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import web3Config from '../constant/config';
import web3ModalSetup from "../helpers/web3ModalSetup";
import Web3 from "web3";

const web3Modal = web3ModalSetup();

const httpProvider = new Web3.providers.HttpProvider(web3Config.RPC_URL);
const web3NoAccount = new Web3(httpProvider);

function Landing () {
    // const [web3, setWeb3] = useState();
    // const [curAcount, setCurAcount] = useState(null);
    // const [isConnected, setIsConnected] = useState(false);
    // const [injectedProvider, setInjectedProvider] = useState();
    
    // const logoutOfWeb3Modal = async () => {
    //   web3Modal.clearCachedProvider();
    //   if (
    //     injectedProvider &&
    //     injectedProvider.provider &&
    //     typeof injectedProvider.provider.disconnect === "function"
    //   ) {
    //     await injectedProvider.provider.disconnect();
    //   }
    //   setIsConnected(false);  
    //   window.location.reload();
    // };

    // const loadWeb3Modal = useCallback(async () => {
    //   RUN_MODE("Connecting Wallet...");
    //   const provider = await web3Modal.connect();
    //   const web3Provider = new Web3(provider);
    //   setInjectedProvider(web3Provider);
    //   var acc = null;
    //   try {
    //     acc = provider.selectedAddress
    //       ? provider.selectedAddress
    //       : provider.accounts[0];
    //   } catch (error) {
    //     acc = provider.address
    //   }

    //   setWeb3(web3Provider);
    //   setCurAcount(acc);
    //   setIsConnected(true);

    //   provider.on("chainChanged", (chainId) => {
    //     RUN_MODE(`chain changed to ${chainId}! updating providers`);
    //     setInjectedProvider(web3Provider);
    //     logoutOfWeb3Modal();
    //   });

    //   provider.on("accountsChanged", () => {
    //     RUN_MODE(`curAcount changed!`);
    //     setInjectedProvider(web3Provider);
    //     logoutOfWeb3Modal();
    //   });

    //   // Subscribe to session disconnection
    //   provider.on("disconnect", (code, reason) => {
    //     RUN_MODE(code, reason);
    //     // alert("loadWeb3Modal accountsChanged");
    //     logoutOfWeb3Modal();
    //   });
    //   // eslint-disable-next-line
    // }, [setInjectedProvider]);
   
    return (
      <div className="App">
        <Navbar name="Landing"/>

        <div className='relative h-full' style={{backgroundColor: "#1F2633"}}>
          <div className='flex h-full flex-col items-center relative'>
              <img className='absolute top-0' src="https://raydium.io/backgroundImages/home-bg-element-1.png"></img>
              {/* FirstSection Content */}
              <div className='first_section relative px-4 sm:px-6 flex flex-col justify-center items-center w-full' style={{height: "1000px"}}>
                <div className="absolute inset-0">
                  <video autoPlay loop muted className="absolute h-full w-full object-cover">
                  </video>
                </div>

                {/* Title */}
                <h1 className='relative rounded-lg bg-ebony-clay-500/70 text-4xl text-center only:font-extrabold tracking-tight text-white sm:text-6xl sm:leading-none xl:text-6xl' style={{ color: "#5cce11" }}>
                  PEPE POLICE&nbsp;
                  <div className='flex justify-center bg-gradient-to-r from-primary _sm:text-3xl via-white to-white bg-clip-text text-transparent '>Marketplace NFT & Swap</div>
                </h1>
                {/* SubTitle */}
                
                {/* Buttons */}
                <div className='mt-5 w-full sm:max-w-lg lg:ml-0'>
                  <div className='mt-24 items-center gap-5 flex justify-center text-white'>
                    <a href="#">
                      <div className='focus:ring-4 focus:outline-none focus:ring-spring-green-800 group-hover:from-spring-green-400 group-hover:to-cerulean-600 text-white relative inline-flex items-center justify-center p-0.5 overflow-hidden rounded-lg group bg-gradient-to-br from-primary-500 via-primary-600 to-blue-500  text-white min-w-fit font-bold text-base hover:from-blue-500 hover:via-primary-600 hover:to-primary-500  hover:cursor-pointer '>
                        <span className='bg-opacity-0 hover:bg-opacity-20 relative px-5 py-2.5 transition-all ease-in duration-75 bg-ebony-clay-500 rounded-md flex flex-row font-bold min-w-fit items-center'>
                          Launch APP
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              
               {/* SecondSection Content */}
               <div className='relative flex flex-col justify-center items-center w-full h-full'>
                <img src="https://raydium.io/backgroundImages/home-bg-element-3.png" className='absolute top-0' style={{top: "0%", width: "100%"}}></img>
                <p className='text-white text-4xl font-bold pt-36'>How to Participate</p>
                <div className="second_section">

                  <div className="card">
                    <div className="box">
                      <div className="content">
                        <h2>01</h2>
                        <h3 style={{ color: "#2196f3" }}>Buy / Mint NFT</h3>
                        <p>You can buy / mint the PPN NFT at our partner marketplace or our website, the cost for minting is only 3$, and hold it on your wallet, because we will distribute the token airdrop based on the NFT snapshot holder in the wallet, for the detail please visit our telegram group, and don't hesitate to ask the admin on duty</p>
                        <a href="https://#">Read More</a>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="box">
                      <div className="content">
                        <h2>02</h2>
                        <h3 style={{ color: "#e91e63" }}>Whitelist Private Sale</h3>
                        <p>If you are the first 1000 minters Pepe POLICE NFT ( PPN ) to come ( FCFS ), then you will be on our whitelist to take part in the private sale that we will hold, the whitelisted minters will share 5% PPT Supply ( 5B ), the whitelist will be announced on our official telegram / social media</p>
                        <a href="https://#">Read More</a>
                      </div>
                    </div>
                  </div>
                
                  <div className="card">
                    <div className="box">
                      <div className="content">
                        <h2>03</h2>
                        <h3 style={{ color: "#23c186" }}>Hold NFT and Get Airdrop</h3>
                        <p>Just hold your NFT in your wallet, and we will do a snapshot at the end of the event ( Phase2 ), don't let your NFT leave your wallet, otherwise you won't get a snapshot for the airdrop, the airdrop snapshot announcement will be announced in the our official telegram group / social media</p>
                        <a href="https://#">Read More</a>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="box">
                      <div className="content">
                        <h2>04</h2>
                        <h3 style={{ color: "#ef16fa" }}>Contest / Event</h3>
                        <p>We will hold an event / contest when minting takes place, this contest will start after 1000 NFT mints for private sale, then we will open last mint contest, start the contest with 1 BNB as reward and will continue to increase 20% of the minting price ( 0.01 BNB ) of each NFT minted until finally finding a winner, for the details of this contest please visit our telegram group</p>
                        <a href="https://#">Read More</a>
                      </div>
                    </div>
                  </div>
                
                  <div className="card">
                    <div className="box">
                      <div className="content">
                        <h2>05</h2>
                        <h3 style={{ color: "#EEBC1D" }}>Stake And Earn</h3>
                        <p>You can stake your NFT ( PPN ) and your Tokens ( PPT ) on our website when we launch staking for NFT and tokens to get a pool prize as your rewards</p>
                        <a href="https://#">Read More</a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Title */}
              <section className='relative mb-8 pt-32'>
                <div className='text-4xl text-white font-bold'>Meet The Team</div>
              </section >
              <section id="Developer" className='relative flex flex-col justify-center items-center w-full h-full'>

                <div className="box-container grid grid-cols-4 _lg:grid-cols-1 m-auto">
                  <div className='flex justify-center'>
                  <div className="box-item">
                  <div className="flip-box">
                    <div className="flip-box-front text-center relative">
                      <img src="img/1.jpg" className='absolute top-0 left-0 h-full w-full'></img>
                      <div className="absolute w-full h-1/4 color-white" style={{top:"75%", backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                        <div className='text-white text-base text-right pr-4 flex flex-row justify-between'>
                          <div className='text-white text-base text-left pl-4'>Project Lead</div>
                        </div>
                      </div>
                    </div>
                    <div className="flip-box-back text-center" style={{backgroundImage: "url('https://s25.postimg.cc/frbd9towf/cta-2.png')"}}>
                      <div className="inner color-white">
                        <button className="flip-box-button">Learn More</button>
                        <div className='flex flex-row justify-center pt-3'>
                          <a href="https://#" target="_blank"><img className='pr-5' src="img/twitter.svg" width="45"></img></a>                  
                          <a href="https://#" target="_blank"><img className='pr-5' src="img/telegram.svg" width="45"></img></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  </div>

                  <div className='flex justify-center'>
                  <div className="box-item">
                  <div className="flip-box">
                    <div className="flip-box-front text-center relative">
                     
                      <div className="absolute w-full h-1/4 color-white" style={{top:"75%", backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                        <div className='text-white text-base text-right pr-4 flex flex-row justify-between'>
                          <div className='text-white text-base text-left pl-4'>Community Manager</div>
                        </div>
                      </div>
                    </div>
                    <div className="flip-box-back text-center" style={{backgroundImage: "url('https://s25.postimg.cc/frbd9towf/cta-2.png')"}}>
                      <div className="inner color-white">
                        <button className="flip-box-button">Learn More</button>
                        <div className='flex flex-row justify-center pt-3'>
                          <a href="https://#" target="_blank"><img className='pr-5' src="img/twitter.svg" width="45"></img></a>                  
                          <a href="https://#" target="_blank"><img className='pr-5' src="img/telegram.svg" width="45"></img></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  </div>

                  <div className='flex justify-center'>
                  <div className="box-item">
                  <div className="flip-box">
                    <div className="flip-box-front text-center relative">
                       <div className="absolute w-full h-1/4 color-white" style={{top:"75%", backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                        <div className='text-white text-base text-right pr-4 flex flex-row justify-between'>
                          <div className='text-white text-base text-left pl-4'>Developer Project</div>
                        </div>
                      </div>
                    </div>
                    <div className="flip-box-back text-center" style={{backgroundImage: "url('https://s25.postimg.cc/frbd9towf/cta-2.png')"}}>
                      <div className="inner color-white">
                        <button className="flip-box-button">Learn More</button>
                        <div className='flex flex-row justify-center pt-3'>
                          <a href="https://#" target="_blank"><img className='pr-5' src="img/twitter.svg" width="45"></img></a>                  
                          <a href="https://#" target="_blank"><img className='pr-5' src="img/telegram.svg" width="45"></img></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  </div>
                  
                  <div className='flex justify-center'>
                  <div className="box-item">
                  <div className="flip-box">
                    <div className="flip-box-front text-center relative">
                      
                      <div className="absolute w-full h-1/4 color-white" style={{top:"75%", backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                        <div className='text-white text-base text-right pr-4 flex flex-row justify-between'>
                          <div className='text-white text-base text-left pl-4'>Marketing Manager</div>

                        </div>
                      </div>
                    </div>
                    <div className="flip-box-back text-center" style={{backgroundImage: "url('https://s25.postimg.cc/frbd9towf/cta-2.png')"}}>
                      <div className="inner color-white">
                        <button className="flip-box-button">Learn More</button>
                        <div className='flex flex-row justify-center pt-3'>
                          <a href="https://#" target="_blank"><img className='pr-5' src="img/twitter.svg" width="45"></img></a>                  
                          <a href="https://#" target="_blank"><img className='pr-5' src="img/telegram.svg" width="45"></img></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  </div>
                  
                  <div className='flex justify-center'>
                  <div className="box-item">
                  <div className="flip-box">
                    <div className="flip-box-front text-center relative">
                      <img src="img/5.jpg" className='absolute top-0 left-0 h-full w-full'></img>
                      <div className="absolute w-full h-1/4 color-white" style={{top:"75%", backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                        <div className='text-white text-base text-right pr-4 flex flex-row justify-between'>
                          <div className='text-white text-base text-left pl-4'>Artist</div>
                        </div>
                      </div>
                    </div>
                    <div className="flip-box-back text-center" style={{backgroundImage: "url('https://s25.postimg.cc/frbd9towf/cta-2.png')"}}>
                      <div className="inner color-white">
                        <button className="flip-box-button">Learn More</button>
                        <div className='flex flex-row justify-center pt-3'>
                          <a href="https://#" target="_blank"><img className='pr-5' src="img/twitter.svg" width="45"></img></a>                  
                          <a href="https://#" target="_blank"><img className='pr-5' src="img/telegram.svg" width="45"></img></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  </div>

                  <div className='flex justify-center'>
                  <div className="box-item">
                  <div className="flip-box">
                    <div className="flip-box-front text-center relative">
                      <img src="img/6.jpg" className='absolute top-0 left-0 h-full w-full'></img>
                      <div className="absolute w-full h-1/4 color-white" style={{top:"75%", backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                        <div className='text-white text-base text-right pr-4 flex flex-row justify-between'>
                          <div className='text-white text-base text-left pl-4'>Designer</div>
                        </div>
                      </div>
                    </div>
                    <div className="flip-box-back text-center" style={{backgroundImage: "url('https://s25.postimg.cc/frbd9towf/cta-2.png')"}}>
                      <div className="inner color-white">
                        <button className="flip-box-button">Learn More</button>
                        <div className='flex flex-row justify-center pt-3'>
                          <a href="https://#" target="_blank"><img className='pr-5' src="img/twitter.svg" width="45"></img></a>                  
                          <a href="https://#" target="_blank"><img className='pr-5' src="img/telegram.svg" width="45"></img></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  </div>

              </div>
              </section>
          </div>
        </div>

        {/* FAQ */}
        <section  className='grid grid-cols-2 _md:grid-cols-1 pt-10'>
          <div className='flex flex-col justify-start items-center pt-10'>
            <div className='text-white text-3xl font-bold pb-10'>FAQ</div>
        </div>
          <div className='flex justify-center items-center px-2 _md:py-7'>
            <img src="img/large_logo.png" className='w-2/3'></img>
          </div>
        </section >

        {/* Tokenomics */}
        <section  id="Tokenomics" className='flex flex-col justify-center items-center pt-20 pb-32'>
          <div>
          <div className='relative font-bold text-3xl text-white pb-10'>TOKENOMICS</div>

            <div className='relative font-bold text-1xl text-white pb-3' style={{ color: "#5cce11" }}>TOKENOMICS TOKEN ( PPT )</div>

            <div className='tokenomics' style={{width: "1200px"}}>
              <div className='flex flex-row text-left _lg:flex-col w-full _lg:pl-10'>

                <div className='flex flex-col' style={{width: "20%"}}>
                  <div className='text-gray-600 text-lg font-bold' style={{fontSize: "80%"}}>FairLaunch</div>
                  <div className='text-white text-lg font-bold'>20%</div>
                  <div className='h-14 w-full' style={{backgroundColor: "rgba(109, 74, 254, 0.2)"}}></div>
                </div>

                <div className='flex flex-col' style={{width: "30%"}}>
                  <div className='text-gray-600 text-lg font-bold' style={{fontSize: "80%"}}>Liquidity</div>
                  <div className='text-white text-lg font-bold'>33%</div>
                  <div className='h-14 w-full' style={{backgroundColor: "rgba(109, 74, 254, 0.3)"}}></div>
                </div>

                <div className='flex flex-col' style={{width: "20%"}}>
                  <div className='text-gray-600 text-lg font-bold' style={{fontSize: "80%"}}>Marketing and CEX Listing</div>
                  <div className='text-white text-lg font-bold'>20%</div>
                  <div className='h-14 w-full' style={{backgroundColor: "rgba(109, 74, 254, 0.4)"}}></div>
                </div>

                <div className='flex flex-col' style={{width: "12%"}}>
                  <div className='text-gray-600 text-sm font-bold pt-2' style={{fontSize: "80%"}}>Staking Reward</div>
                  <div className='text-white text-lg font-bold'>10%</div>
                  <div className='h-14 w-full' style={{backgroundColor: "rgba(109, 74, 254, 0.5)"}}></div>
                </div>

                <div className='flex flex-col' style={{width: "9%"}}>
                  <div className='text-gray-600 text-lg font-bold' style={{fontSize: "80%"}}>Team</div>
                  <div className='text-white text-lg font-bold'>7%</div>
                  <div className='h-14 w-full' style={{backgroundColor: "rgba(109, 74, 254, 0.7)"}}></div>
                </div>

                <div className='flex flex-col' style={{width: "7%"}}>
                  <div className='text-gray-600 text-sm font-bold pt-2' style={{fontSize: "80%"}}>Airdrop</div>
                  <div className='text-white text-lg font-bold'>5%</div>
                  <div className='h-14 w-full' style={{backgroundColor: "rgba(109, 74, 254, 0.6)"}}></div>
                </div>

                <div className='flex flex-col' style={{width: "7%"}}>
                  <div className='text-gray-600 text-sm font-bold pt-2' style={{fontSize: "80%"}}>Private Sale</div>
                  <div className='text-white text-lg font-bold'>5%</div>
                  <div className='h-14 w-full' style={{backgroundColor: "rgba(109, 74, 254, 0.6)"}}></div>
                </div>
                
              </div>
            </div>

            <h2 className="pb-10"></h2>

            <div className='relative font-bold text-1xl text-white pb-3' style={{ color: "#5cce11" }}>TOKENOMICS NFT ( PPN )</div>
            <div className='tokenomics' style={{width: "1200px"}}>
              <div className='flex flex-row text-left _lg:flex-col w-full _lg:pl-10'>
                
                <div className='flex flex-col' style={{width: "81%"}}>
                  <div className='text-gray-600 text-lg font-bold' style={{fontSize: "80%"}}>Minting</div>
                  <div className='text-white text-lg font-bold'>90%</div>
                  <div className='h-14 w-full' style={{backgroundColor: "rgba(109, 74, 254, 0.2)"}}></div>
                </div>

                <div className='flex flex-col' style={{width: "15%"}}>
                  <div className='text-gray-600 text-lg font-bold' style={{fontSize: "80%"}}>Marketing</div>
                  <div className='text-white text-lg font-bold'>9%</div>
                  <div className='h-14 w-full' style={{backgroundColor: "rgba(109, 74, 254, 0.3)"}}></div>
                </div>

                <div className='flex flex-col' style={{width: "4%"}}>
                  <div className='text-gray-600 text-lg font-bold' style={{fontSize: "80%"}}>Team</div>
                  <div className='text-white text-lg font-bold'>1%</div>
                  <div className='h-14 w-full' style={{backgroundColor: "rgba(109, 74, 254, 0.4)"}}></div>
                </div>
               
              </div>
            </div>

            <div className='grid grid-cols-4 pt-10 _md:grid-cols-2'>
              <div className='flex flex-col'>
                <p className='text-purple-600 text-2xl font-bold'>0</p>
                <p className='text-white text-lg font-bold'>Funded Projects</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-purple-600 text-2xl font-bold'>0</p>
                <p className='text-white text-lg font-bold'>Unique Participants</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-purple-600 text-2xl font-bold'>$0</p>
                <p className='text-white text-lg font-bold'>Raised Capital</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-purple-600 text-2xl font-bold'>$0</p>
                <p className='text-white text-lg font-bold'>Inital Mark Cap</p>
              </div>
            </div>
          </div>
        </section >

        {/* Roadmap */}
        {/* Title */}
        <section    className='relative mb-8 pt-10'>
          <div className='text-4xl text-white font-bold'>Roadmap</div>
        </section >
        <section id="Roadmap" className='flex flex-row _lg:flex-col justify-center'>
        {/* <div className='flex justify-center'> */}
        <div className="card rgb" style={{width: "20%"}}>
          <div className="card-image" ></div>
          <div className="card-text">
            <h2 className={"text-center mb-4"}>Phase 1</h2>
            <div className='text-gray-500 text-sm md:pl-24 lg:px-2 sm:px-10'>

 
            </div>
          </div>
        {/* </div> */}
        </div>

        {/* <div className='flex justify-center'> */}
        <div className="card">
          <div className="card-image card2"></div>
          <div className="card-text card2">
            <h2 className={"text-center mb-4"}>Phase 2</h2>
            <div className='text-gray-500 text-sm md:pl-24 lg:px-2 sm:px-10'>

            </div>
          </div>
        {/* </div> */}
        </div>

        {/* <div className='flex justify-center'> */}
        <div className="card">
            <div className="card-image card3"></div>
            <div className="card-text card3">
              <h2 className={"text-center mb-4"}>Phase 3</h2>
              <div className='text-gray-500 text-sm md:pl-24 lg:px-2 sm:px-10'>

              </div>
            </div>
        </div>

{/* <div className='flex justify-center'> */}
<div className="card">
            <div className="card-image card4"></div>
            <div className="card-text card4">
              <h2 className={"text-center mb-4"}>Phase 4</h2>
              <div className='text-gray-500 text-sm md:pl-24 lg:px-2 sm:px-10'>
              </div>
            </div>
        </div>

        </section>

        <Footer />
      </div>
    );
}

export default Landing;
