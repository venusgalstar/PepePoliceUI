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

import web3Object from "./index";
import Web3 from "web3";
import web3Config from "../constant/config";

function StakingNFT() {

    const [injectedProvider, setInjectedProvider] = useState();
    const [web3, setWeb3] = useState();
    const [isConnected, setIsConnected] = useState(false);
    const [curAcount, setCurAcount] = useState(null);
    const [nftContract, setNftContract] = useState(null);
    const [stakeNftContract, setStakeNftContract] = useState(null);
    const [stakedNftList, setStakeNftList] = useState(null);
    const [stakedNftCount, setStakeNftCount] = useState(null);
    const [unStakedNftList, setUnStakeNftList] = useState(null);
    const [unStakeNftCount, setUnStakeNftCount] = useState(0);
    const [baseUri, setBaseUri] = useState("https://ipfs.io/ipfs/bafybeidngmtnoiluqfxodyykvs2inaoybktz3r4pt2onnufbqiubpnyv4i");
    const [gNftContract, setGNftContract] = useState(null);
    const [gNftStakeContract, setGNftStakeContract] = useState(null);
    const [totalStakedCount, setTotalStakedCount] = useState(0);
    const [totalRewardAmount, setTotalRewardAmount] = useState(0);
    const [pendingTx, setPendingTx] = useState(false);

    const logoutOfWeb3Modal = async () => {
        // alert("logoutOfWeb3Modal");
        web3Object.web3Modal.clearCachedProvider();
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
        const provider = await web3Object.web3Modal.connect();
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

    async function getInfo() {
        const staked_nft_balance = await gNftContract.methods.balanceOf(web3Config.nftStakeAddress).call();
        setTotalStakedCount(staked_nft_balance);
    }

    useEffect(() => {
        if (gNftContract != null && gNftStakeContract != null)
            getInfo();
    }, [gNftContract, gNftStakeContract]);

    useEffect(() => {
        const gNftContractV = new web3Object.web3NoAccount.eth.Contract(web3Config.nftAbi, web3Config.nftAddress);
        setGNftContract(gNftContractV);

        const gNftStakeContractV = new web3Object.web3NoAccount.eth.Contract(web3Config.nftStakeAbi, web3Config.nftStakeAddress);
        setGNftStakeContract(gNftStakeContractV);
    }, []);


    const fetchDataForUnstake = async () => {

        // var baseUri = await nftContract.methods.baseUri().call();
        // setBaseUri(baseUri);
        setStakeNftList(null);

        const staked_nft_list = await stakeNftContract.methods.tokensOfOwner(curAcount).call();
        setStakeNftList(staked_nft_list);
        setStakeNftCount(staked_nft_list.length);

        const total_reward_amount = await stakeNftContract.methods.earningInfo(curAcount, staked_nft_list).call();
        const total_reward_amountv = parseFloat(web3Object.web3NoAccount.utils.fromWei(total_reward_amount.toString(), 'ether'));
        console.log("total_reward_amountv", total_reward_amountv);
        setTotalRewardAmount(total_reward_amountv.toFixed(4));
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

        setUnStakeNftList(nft_list);
        setUnStakeNftCount(nft_balance);
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

        fetchDataForUnstake();
    }, [stakeNftContract]);

    async function stakeNft(nft_id) {

        if (!isConnected) {
            alert("Please Connect Your Wallet!");
            return;
        }

        if (unStakedNftList == null || unStakedNftList.length == 0) {
            alert("No nft in your wallet!");
            return;
        }

        if( pendingTx ){
            alert("Previous transaction hasn't been finished!");
            return;
        }

        setPendingTx(true);

        try{
            if( nft_id == -1)
            {
                await stakeNftContract.methods.stake(unStakedNftList).send({ from: curAcount });
            }   
            else{
                var id_array=[];
                id_array.push(nft_id);
                await stakeNftContract.methods.stake(id_array).send({ from: curAcount });
            }
        } catch(e){
            alert("Error on staking nft!");
        }
        setPendingTx(false);

        fetchDataForStake();
        fetchDataForUnstake();
    }

    async function unStakeNft(nft_id) {

        if (!isConnected) {
            alert("Please Connect Your Wallet!");
            return;
        }

        if (stakedNftList == null || stakedNftList.length == 0) {
            alert("No nft in your wallet!");
            return;
        }

        if( pendingTx ){
            alert("Previous transaction hasn't been finished!");
            return;
        }

        setPendingTx(true);

        try{

            if( nft_id == -1 ){
                await stakeNftContract.methods.unstake(stakedNftList).send({ from: curAcount });
            } else{
                var nft_list = [];
                nft_list.push(nft_id);
                await stakeNftContract.methods.unstake(nft_list).send({ from: curAcount });
            }
            
        } catch(e){
            alert("Error on unstake!");
        }
        setPendingTx(false);

        fetchDataForStake();
        fetchDataForUnstake();
    }

    async function claimReward(nft_id){

        if (!isConnected) {
            alert("Please Connect Your Wallet!");
            return;
        }

        if (stakedNftList == null || stakedNftList.length == 0) {
            alert("No nft in your wallet!");
            return;
        }

        if( pendingTx ){
            alert("Previous transaction hasn't been finished!");
            return;
        }

        setPendingTx(true);

        try{

            if( nft_id == -1 ){
                await stakeNftContract.methods.claim(stakedNftList).send({ from: curAcount });
            } else{
                var nft_list = [];
                nft_list.push(nft_id);
                await stakeNftContract.methods.claim(nft_list).send({ from: curAcount });
            }
            
        } catch(e){
            alert("Error on unstake!");
        }
        setPendingTx(false);

        fetchDataForStake();
        fetchDataForUnstake();
    }

    return (
        <div className="App">
            <Navbar name="NFTstaking" loadWeb3Modal={loadWeb3Modal} isConnected={isConnected} curAcount={curAcount} logoutOfWeb3Modal={logoutOfWeb3Modal} />

            <div className='relative h-full pt-6' style={{ backgroundColor: "#1F2633" }}>
                <div className='mt-6 flex h-full flex-col items-center relative'>
                    <div className='mt-10 relative px-4 sm:px-6 flex justify-center items-center w-full' style={{ height: "650px" }}>
                        <div className='flex flex-col'>
                            <div className='text-orange-400 text-2xl font-bold'>Total Staked Count: {totalStakedCount}</div>
                            <div className='flex'>
                                {/* Staking */}
                                <div className="roadmap_card rgb pt-8 px-4 flex flex-col" style={{ width: "400px", height: "520px", backgroundColor: "rgba(0,0,0,0.9)" }}>
                                    {/* <div className='text-white text-xl font-bold my-5' style={{height: "30px"}}>Pepe Police</div> */}
                                    <div className='text-orange-400 text-2xl font-bold'>Stakable NFT :{ unStakeNftCount }</div>

                                    <div className='my-5 tabcontent ' style={{ height: "450px" }}>
                                        <div className='border border-gray-700 p-4 rounded-xl ' style={{ backgroundColor: "rgba(133, 100, 28, 0.3)", height: "350px", overflowY: "auto" }}>
                                            {

                                                unStakedNftList != null ? unStakedNftList.map((v, index) => {
                                                    return (
                                                        <div key={index} className='grid grid-cols-3 pb-5'>
                                                            <div className='text-gray-400 flex flex-row items-center text-sm'>
                                                                <p style={{ fontSize: "25px" }} className='pr-1 text-orange-400 font-bold'>{v}</p>
                                                            </div>
                                                            <div className='flex items-center'>
                                                                <img className='rounded-xl' style={{ width: "100px" }} src={baseUri + "/" + v + ".png"}></img>
                                                            </div>
                                                            <div className='flex items-center'>
                                                                <button className='nft_button w-full my-2 py-3 rounded-md text-white lorswap_vote text-center font-bold'
                                                                    onClick={() => {
                                                                        stakeNft(v);
                                                                    }}
                                                                > Stake </button>
                                                            </div>
                                                        </div>
                                                    )
                                                }) : "Stakable NFT Lists"
                                            }
                                        </div>

                                        <button className='nft_button w-full my-2 py-3 rounded-md text-white lorswap_vote text-center font-bold'
                                            onClick={() => {
                                                stakeNft(-1);
                                            }}
                                        >
                                            Stake All
                                        </button>
                                    </div>
                                </div>
                                {/* {Unstaking} */}
                                <div className="roadmap_card rgb pt-8 px-4 flex flex-col" style={{ width: "400px", height: "520px", backgroundColor: "rgba(0,0,0,0.9)" }}>
                                    {/* <div className='text-white text-xl font-bold my-5' style={{height: "30px"}}>Pepe Police</div> */}
                                    <div className='text-orange-400 text-2xl font-bold'>TotalReward : {totalRewardAmount}</div>{/*Staked NFT : {stakedNftCount} */}

                                    <div className='my-5 tabcontent ' style={{ height: "450px" }}>
                                        <div className='border border-gray-700 p-4 rounded-xl ' style={{ backgroundColor: "rgba(133, 100, 28, 0.3)", height: "350px", overflowY: "auto" }}>
                                            {

                                                stakedNftList != null ? stakedNftList.map((v, index) => {
                                                    return (
                                                        <div key={index} className='grid grid-cols-3 pb-5'>
                                                            <div className='text-gray-400 flex flex-row items-center text-sm'>
                                                                <p style={{ fontSize: "25px" }} className='pr-1 text-orange-400 font-bold'>{v}</p>
                                                            </div>
                                                            <div className='flex items-center'>
                                                                <img className='rounded-xl' style={{width:"100px"}} src={baseUri + "/" + v + ".png"}></img>
                                                            </div>
                                                            <div className='flex flex-col items-center'>
                                                                <button className='nft_button w-full my-2 py-3 rounded-md text-white lorswap_vote text-center font-bold'
                                                                    onClick={() => {
                                                                        unStakeNft(v);
                                                                    }}
                                                                > Unstake </button>
                                                                <button className='nft_button w-full my-2 py-3 rounded-md text-white lorswap_vote text-center font-bold'
                                                                    onClick={() => {
                                                                        claimReward(v);
                                                                    }}
                                                                > Claim </button>
                                                            </div>
                                                        </div>
                                                    )
                                                }) : "Staked NFT Lists"
                                            }
                                        </div>

                                        <button className='nft_button w-1/2 my-2 py-3 rounded-md text-white text-center font-bold'
                                            onClick={() => {
                                                unStakeNft(-1);
                                            }}
                                        >
                                            Unstake All
                                        </button>
                                        <button className='nft_button w-1/2 my-2 py-3 rounded-md text-white text-center font-bold'
                                            onClick={() => {
                                                claimReward(-1);
                                            }}
                                        >
                                            Claim All
                                        </button>
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
