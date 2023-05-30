/* https://lorwatch.vercel.app/ */

import * as React from 'react'
import '../css/react-base.css'
import '../css/animations.css';
import '../css/second_section.css';
import '../css/roadmap.css';
import '../css/real_roadmap.css';
import { useState, useEffect, useCallback } from 'react';
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';
import Pagination from './../components/Pagination';

import web3ModalSetup from "./../helpers/web3ModalSetup";
import Web3 from "web3";
import web3Config from "../constant/config";

const web3Modal = web3ModalSetup();
const httpProvider = new Web3.providers.HttpProvider(web3Config.RPC_URL);
const web3NoAccount = new Web3(httpProvider);

function MintingNFT() {
    const [nftCount, setNftCount] = useState(1);
    const [injectedProvider, setInjectedProvider] = useState();
    const [web3, setWeb3] = useState();
    const [isConnected, setIsConnected] = useState(false);
    const [curAcount, setCurAcount] = useState(null);
    const [nftContract, setNftContract] = useState(null);

    const logoutOfWeb3Modal = async () => {
        // alert("logoutOfWeb3Modal");
        web3Modal.clearCachedProvider();
        if (
            injectedProvider &&
            injectedProvider.provider &&
            typeof injectedProvider.provider.disconnect === "function"
        ) {
            await injectedProvider.provider.disconnect();
        }
        setIsConnected(false);

        window.location.reload();
    };

    const loadWeb3Modal = useCallback(async () => {
        const provider = await web3Modal.connect();
        // alert("loadWeb3Modal1");
        const web3Provider = new Web3(provider);
        // alert("loadWeb3Modal2");
        setInjectedProvider(web3Provider);
        // alert(JSON.stringify(provider));
        var acc = null;
        try {
            acc = provider.selectedAddress
                ? provider.selectedAddress
                : provider.accounts[0];
        } catch (error) {
            acc = provider.address
        }

        setWeb3(web3Provider);
        setCurAcount(acc);
        setIsConnected(true);
        setNftContract(new web3Provider.eth.Contract(web3Config.nftAbi, web3Config.nftAddress));

        provider.on("chainChanged", (chainId) => {
            // alert("loadWeb3Modal chainChanged");
            setInjectedProvider(web3Provider);
            logoutOfWeb3Modal();
        });

        provider.on("accountsChanged", () => {
            // alert("loadWeb3Modal accountsChanged");
            setInjectedProvider(web3Provider);
            logoutOfWeb3Modal();
        });

        // Subscribe to session disconnection
        provider.on("disconnect", (code, reason) => {
            // alert("loadWeb3Modal accountsChanged");
            logoutOfWeb3Modal();
        });
        // eslint-disable-next-line
    }, [setInjectedProvider]);

    async function nftMint(){

        if( !isConnected ){
            alert("Please Connect Your Wallet!");
            return;
        }
        
        var eth_value = 0.01 * nftCount;       

        console.log(nftContract);

        await nftContract.methods.mint(curAcount, nftCount).send({from: curAcount, value: web3.utils.toWei(eth_value.toString(), 'ether')});
    }

    return (
        <div className="App">
            <Navbar name="NFTmint" loadWeb3Modal={loadWeb3Modal} isConnected={isConnected} curAcount={curAcount} logoutOfWeb3Modal={logoutOfWeb3Modal} />

            <div className='relative h-full pt-6' style={{ backgroundColor: "#1F2633" }}>
                <div className='mt-6 flex h-full flex-col items-center relative'>
                    <div className='mt-10 relative px-4 sm:px-6 flex flex-col justify-center items-center w-full' style={{ height: "550px" }}>

                        {/* Staking */}
                        <div className="roadmap_card rgb pt-8 px-4 flex flex-col" style={{ width: "400px", height: "650px", backgroundColor: "rgba(0,0,0,0.9)" }}>

                            <div className='text-orange-400 text-2xl font-bold'>Minting NFT</div>

                            <div id='devote' className='my-5 tabcontent' style={{ height: "350px" }}>
                                <div className='border border-gray-700 p-4 rounded-xl' style={{ backgroundColor: "rgba(133, 100, 28, 0.3)" }}>
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
                                    <Pagination currentIndex={nftCount} onClick={(i) => setNftCount(i)} />
                                    <div className='text-center text-orange-300 text-sm py-4'>Mint an NFT Charges 0.01BNB</div>
                                    <button className='nft_button w-full my-2 py-3 rounded-md text-white lorswap_vote text-center font-bold'
                                        onClick={() => {
                                            nftMint();
                                        }}
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

    );
}

export default MintingNFT;
