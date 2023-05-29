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

import web3Config from '../web3/config';
import { Web3Modal } from '@web3modal/react';

//-----------wallet connect modules--------------
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { 
    configureChains, 
    createClient, 
    WagmiConfig, 
    useAccount, 
    useConnect, 
    useDisconnect, 
    useContractWrite,  
    usePrepareContractWrite,  
    useWaitForTransaction, 
    useContractRead } from 'wagmi';

import { bscTestnet, bsc } from 'wagmi/chains';
import { InjectedConnector } from 'wagmi/connectors/injected';

const chains = [bscTestnet, bsc];
const projectId = 'fe62b424c4ab666f47d64744e0b3dca0';

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

function StakingNFT () {

    const [nftID, setNftID] = useState(0);

    // const contractRead = useContractRead({
    //     // storage contract to read out int
    //     address: web3Config.nftStakeAddress,
    //     abi: web3Config.nftStakeAbi,
    //     functionName: "get",
    //     watch: true
    // });

    return (
        <WagmiConfig client={wagmiClient}>
            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
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
                                        <p style={{ fontSize: "25px" }} className='pr-1 text-orange-400 font-bold'>{nftID}</p>
                                    </div>
                                    <div className='py- col-span-2'>
                                        <img className='rounded-xl' src="img/1.jpg"></img>
                                    </div>
                                </div>

                                <div className='flex flex-row justify-between pt-7'>
                                    <div className='text-gray-400 flex flex-row items-center text-sm'>
                                        <p className='text-left text-xl text-orange-400 font-bold'>APR : 10 %</p>
                                    </div>
                                </div>

                                <div className='flex flex-row justify-between py-3'>
                                    <div className='text-gray-400 flex flex-row items-center text-sm'>
                                        <p className='text-xl text-left text-orange-400 font-bold'>Reward : 0 PPT</p>
                                    </div>
                                </div>
                                <button className='nft_button w-full my-2 py-3 rounded-md text-white lorswap_vote text-center font-bold'
                                    // disabled={!write || isLoading}
                                    // onClick={() => {
                                    //     write?.();
                                    //   }}
                                >
                                    {/* {isLoading ? "Minting..." : "Minting NFTs PPN"}*/}
                                    Stake
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div> 

            <Footer />
            </div>
        </WagmiConfig>
    );
}

export default StakingNFT;
