/* https://lorwatch.vercel.app/ */

import * as React from 'react'
import '../css/react-base.css'
import '../css/animations.css';
import '../css/second_section.css';
import '../css/roadmap.css';
import '../css/real_roadmap.css';
import { useState, useCallback, useEffect } from 'react';
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';

import web3ModalSetup from "./../helpers/web3ModalSetup";
import Web3 from "web3";
import web3Config from "../constant/config";

const web3Modal = web3ModalSetup();
const httpProvider = new Web3.providers.HttpProvider(web3Config.RPC_URL);
const web3NoAccount = new Web3(httpProvider);

function StakingNFT() {

    const [nftCount, setNftCount] = useState(1);
    const [injectedProvider, setInjectedProvider] = useState();
    const [web3, setWeb3] = useState();
    const [isConnected, setIsConnected] = useState(false);
    const [curAcount, setCurAcount] = useState(null);
    const [nftContract, setNftContract] = useState(null);
    const [stakeNftContract, setStakeNftContract] = useState(null);
    const [stakedNftList, setStakeNftList] = useState(null);
    const [unStakedNftList, setUnStakeNftList] = useState(null);
    const [baseUri, setBaseUri] = useState("https://ipfs.io/ipfs/bafybeidngmtnoiluqfxodyykvs2inaoybktz3r4pt2onnufbqiubpnyv4i");

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
        setStakeNftContract(new web3Provider.eth.Contract(web3Config.nftStakeAbi, web3Config.nftStakeAddress));

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

    const fetchDataForUnstake = async () => {

        // var baseUri = await nftContract.methods.baseUri().call();
        // setBaseUri(baseUri);
        setStakeNftList(null);

        const staked_nft_list = await stakeNftContract.methods.tokensOfOwner(curAcount).call();
        console.log("staked_nft_list", staked_nft_list);
        setStakeNftList(staked_nft_list);
    };
    
    const fetchDataForStake = async () => {

        // var baseUri = await nftContract.methods.baseUri().call();
        // setBaseUri(baseUri);
        setUnStakeNftList(null);

        const nft_balance = await nftContract.methods.balanceOf(curAcount).call();
        console.log("nft_balance", nft_balance);
        var index, nft_list = [];

        for (index = 0; index < nft_balance; index++) {
            var nft_id = await nftContract.methods.tokenOfOwnerByIndex(curAcount, index).call();
            console.log("nft_id", nft_id);
            nft_list.push(nft_id);
        }

        console.log("nft_list", nft_list);

        setUnStakeNftList(nft_list);
    };

    useEffect(() => {

        if (!isConnected) {
            console.log("error!");
            return;
        }

        console.log("getting for stake!");

        fetchDataForStake();
    }, [nftContract]);

    useEffect(() => {

        if (!isConnected) {
            console.log("error!");
            return;
        }

        console.log("getting for unstake!");

        fetchDataForUnstake();
    }, [stakeNftContract]);

    async function stakeNft() {

        if (!isConnected) {
            alert("Please Connect Your Wallet!");
            return;
        }

        if (unStakedNftList == null || unStakedNftList.length == 0) {
            alert("No nft in your wallet!");
            return;
        }

        var index;

        console.log(unStakedNftList.length);

        for (index = 0; index < unStakedNftList.length; index++) {
            await nftContract.methods.approve(web3Config.nftStakeAddress, unStakedNftList[index]).send({ from: curAcount });
        }

        await stakeNftContract.methods.stake(unStakedNftList).send({ from: curAcount });

        fetchDataForStake();
        fetchDataForUnstake();
    }

    async function unStakeNft() {

        if (!isConnected) {
            alert("Please Connect Your Wallet!");
            return;
        }

        if (stakedNftList == null || stakedNftList.length == 0) {
            alert("No nft in your wallet!");
            return;
        }

        await stakeNftContract.methods.unstake(stakedNftList).send({ from: curAcount });

        fetchDataForStake();
        fetchDataForUnstake();
    }

    return (
        <div className="App">
            <Navbar name="NFTstaking" loadWeb3Modal={loadWeb3Modal} isConnected={isConnected} curAcount={curAcount} logoutOfWeb3Modal={logoutOfWeb3Modal} />

            <div className='relative h-full pt-6' style={{ backgroundColor: "#1F2633" }}>
                <div className='mt-6 flex h-full flex-col items-center relative'>
                    <div className='mt-10 relative px-4 sm:px-6 flex justify-center items-center w-full' style={{ height: "550px" }}>

                        {/* Staking */}
                        <div className="roadmap_card rgb pt-8 px-4 flex flex-col" style={{ width: "400px", height: "520px", backgroundColor: "rgba(0,0,0,0.9)" }}>
                            {/* <div className='text-white text-xl font-bold my-5' style={{height: "30px"}}>Pepe Police</div> */}
                            <div className='text-orange-400 text-2xl font-bold'>Stake NFT</div>

                            <div className='my-5 tabcontent overflow-y-auto' style={{ height: "450px" }}>
                                <div className='border border-gray-700 p-4 rounded-xl' style={{ backgroundColor: "rgba(133, 100, 28, 0.3)", height: "350px" }}>
                                    {

                                        unStakedNftList != null ? unStakedNftList.map((v, index) => {
                                            return (
                                                <div key={index} className='grid grid-cols-3 pb-5'>
                                                    <div className='text-gray-400 flex flex-row items-center text-sm'>
                                                        <p style={{ fontSize: "25px" }} className='pr-1 text-orange-400 font-bold'>{v}</p>
                                                    </div>
                                                    <div className='py- col-span-2'>
                                                        <img className='rounded-xl' src={baseUri + "/" + v + ".png"}></img>
                                                    </div>
                                                </div>
                                            )
                                        }) : "NFT Lists"
                                    }
                                </div>

                                <button className='nft_button w-full my-2 py-3 rounded-md text-white lorswap_vote text-center font-bold'
                                    onClick={() => {
                                        stakeNft();
                                    }}
                                >
                                    Stake
                                </button>
                            </div>
                        </div>
                        {/* {Unstaking} */}
                        <div className="roadmap_card rgb pt-8 px-4 flex flex-col" style={{ width: "400px", height: "520px", backgroundColor: "rgba(0,0,0,0.9)" }}>
                            {/* <div className='text-white text-xl font-bold my-5' style={{height: "30px"}}>Pepe Police</div> */}
                            <div className='text-orange-400 text-2xl font-bold'>UnStake NFT</div>

                            <div className='my-5 tabcontent overflow-y-auto' style={{ height: "450px" }}>
                                <div className='border border-gray-700 p-4 rounded-xl' style={{ backgroundColor: "rgba(133, 100, 28, 0.3)", height: "350px" }}>
                                    {

                                        stakedNftList != null ? stakedNftList.map((v, index) => {
                                            return (
                                                <div key={index} className='grid grid-cols-3 pb-5'>
                                                    <div className='text-gray-400 flex flex-row items-center text-sm'>
                                                        <p style={{ fontSize: "25px" }} className='pr-1 text-orange-400 font-bold'>{v}</p>
                                                    </div>
                                                    <div className='py- col-span-2'>
                                                        <img className='rounded-xl' src={baseUri + "/" + v + ".png"}></img>
                                                    </div>
                                                </div>
                                            )
                                        }) : "NFT Lists"
                                    }
                                </div>

                                <button className='nft_button w-full my-2 py-3 rounded-md text-white lorswap_vote text-center font-bold'
                                    onClick={() => {
                                        unStakeNft();
                                    }}
                                >
                                    UnStake
                                </button>
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
