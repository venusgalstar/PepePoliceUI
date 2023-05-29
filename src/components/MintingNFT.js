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
import Pagination from './Pagination';

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
//----------------------------------------------------


function MintingNFT () {

    const [nftCount, setNftCount] = useState(1);
    const { address, isConnected } = useAccount();
    
    const {
        mintConfig,
        error: prepareError,
        isError: isPrepareError
    } = usePrepareContractWrite({
        address: web3Config.nftAddress,
        abi: web3Config.nftAbi,
        functionName: "mint",
        args: [address, parseInt(nftCount, 10)], //argument to write
        enabled: Boolean(nftCount) //possible to write if there is a value in number
    });
    // const { data, error, isError, write } = useContractWrite(mintConfig);
    // const { isLoading, isSuccess } = useWaitForTransaction({
    //     hash: data?.hash
    // });
   
    
    return (
        <WagmiConfig client={wagmiClient}>
            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
            <div className="App">
            <Navbar name="NFTmint" projectId={projectId} ethereumClient={ethereumClient}/>

            <div className='relative h-full pt-6' style={{backgroundColor: "#1F2633"}}>
            <div className='mt-6 flex h-full flex-col items-center relative'>
                <div className='mt-10 relative px-4 sm:px-6 flex flex-col justify-center items-center w-full' style={{height: "550px"}}>
            
                    {/* Staking */}
                    <div className="roadmap_card rgb pt-8 px-4 flex flex-col" style={{width: "400px", height: "650px", backgroundColor: "rgba(0,0,0,0.9)"}}>

                        <div className='text-orange-400 text-2xl font-bold'>Minting NFT</div>
                        
                        <div id='devote' className='my-5 tabcontent' style={{height: "350px"}}>
                            <div className='border border-gray-700 p-4 rounded-xl' style={{backgroundColor: "rgba(133, 100, 28, 0.3)"}}>
                                <div className='flex flex-row justify-between'>
                                    <div className='text-gray-400 flex flex-row items-center text-2xl py-2'>
                                        <p className='pr-1 text-orange-400 font-bold'>0 / 10000</p>
                                    </div>
                                </div>

                                <div className='flex flex-row justify-between'>
                                    <div className='text-gray-400 flex flex-row items-center text-base py-2'>
                                        <p className='pr-1 text-gray-300 font-bold'>Wallet Address</p>
                                    </div>
                                </div>

                                <div className='flex flex-row justify-between'>
                                    <div className='text-gray-400 flex flex-row items-center text-sm'>
                                        <p className='pr-1 text-green-600 font-bold'>Please Connect Wallet</p>
                                    </div>
                                </div>

                                <div className='flex flex-row justify-between'>
                                    <div className='text-gray-400 flex flex-row items-center text-sm py-7'>
                                        <p className='pr-1 text-orange-400 font-bold'>Select The Amount</p>
                                    </div>
                                </div>
                                <Pagination currentIndex={nftCount} onClick={(i) => setNftCount(i)}/>
                                <div className='text-center text-orange-300 text-sm py-4'>Mint an NFT Charges 0.01BNB</div>
                                <button className='nft_button w-full my-2 py-3 rounded-md text-white lorswap_vote text-center font-bold'
                                    // disabled={!write || isLoading}
                                    // onClick={() => {
                                    //     write?.();
                                    //   }}
                                >
                                    {/* {isLoading ? "Minting..." : "Minting NFTs PPN"}*/}
                                    Minting NFTs PPN
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

export default MintingNFT;
