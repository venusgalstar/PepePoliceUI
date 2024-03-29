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

import web3Object from "./index";
import Web3 from "web3";
import web3Config from "../constant/config";

function Staking() {
    const [injectedProvider, setInjectedProvider] = useState();
    const [web3, setWeb3] = useState();
    const [isConnected, setIsConnected] = useState(false);
    const [curAcount, setCurAcount] = useState(null);

    const [tokenStakeContract, setTokenStakeContract] = useState(null);
    const [tokenContract, setTokenContract] = useState(null);

    const [totalStakedAmount, setTotalStakedAmount] = useState(0);
    const [balanceAmount, setBalanceAmount] = useState(0);
    const [totalRewardAmount, setTotalRewardAmount] = useState(0);
    const [stakedAmount, setStakedAmount] = useState(0);
    const [rewardAmount, setRewardAmount] = useState(0);
    const [stakingAmount, setStakingAmount] = useState(0);

    const [gTokenContract, setGTokenContract] = useState(null);
    const [gTokenStakeContract, setGTokenStakeContract] = useState(null);
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
        setTokenStakeContract(new web3Provider.eth.Contract(web3Config.tokenStakeAbi, web3Config.tokenStakeAddress));
        setTokenContract(new web3Provider.eth.Contract(web3Config.tokenAbi, web3Config.tokenAddress));

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

    const fetchDataForStake = async () => {

        if (curAcount != null) {
            const stakedAmount = await tokenStakeContract.methods.balanceOf(curAcount).call();
            console.log("stakedAmount", stakedAmount);
            setStakedAmount(web3.utils.fromWei(stakedAmount, 'ether'));

            const rewardAmount = await tokenStakeContract.methods.earned(curAcount).call();
            console.log("rewardAmount", rewardAmount);
            setRewardAmount(web3.utils.fromWei(rewardAmount, 'ether'));

            const balanceAmount = await tokenContract.methods.balanceOf(curAcount).call();
            console.log("balanceAmount", balanceAmount);
            setBalanceAmount(web3.utils.fromWei(balanceAmount, 'ether'));
        }
    };

    function handleChange(event) {
        setStakingAmount(event.target.value);
    }

    async function getInfo() {
        const totalStakedAmount = await gTokenStakeContract.methods.totalSupply().call();
        setTotalStakedAmount(web3Object.web3NoAccount.utils.fromWei(totalStakedAmount, 'ether'));

        const rewardPerToken = await gTokenStakeContract.methods.rewardPerToken().call();
        setTotalRewardAmount(web3Object.web3NoAccount.utils.fromWei(rewardPerToken, 'ether'));
    }

    async function unStakeToken() {
        if (!isConnected) {
            alert("Please Connect Your Wallets!");
            return;
        }

        if (pendingTx) {
            alert("Previous transaction hasn't been finished!");
            return;
        }

        setPendingTx(true);

        try {
            const stakedAmountBalance = web3.utils.toWei(stakedAmount, 'ether');
            await tokenStakeContract.methods.withdraw(stakedAmountBalance).send({ from: curAcount });
            await tokenStakeContract.methods.getReward().send({ from: curAcount });
        } catch (e) {
            alert("Error on unstaking!");
        }
        setPendingTx(false);

        getInfo();
        fetchDataForStake();
    }

    async function claimToken() {
        if (!isConnected) {
            alert("Please Connect Your Wallets!");
            return;
        }

        if (pendingTx) {
            alert("Previous transaction hasn't been finished!");
            return;
        }

        setPendingTx(true);

        try {
            await tokenStakeContract.methods.getReward().send({ from: curAcount });
        } catch (e) {
            alert("Error on claim!");
        }
        setPendingTx(false);

        getInfo();
        fetchDataForStake();
    }

    async function stakeToken() {
        if (!isConnected) {
            alert("Please Connect Your Wallets!");
            return;
        }

        if (pendingTx) {
            alert("Previous transaction hasn't been finished!");
            return;
        }

        setPendingTx(true);

        try {
            const stakingAmountBalance = web3.utils.toWei(stakingAmount, 'ether');
            await tokenContract.methods.approve(web3Config.tokenStakeAddress, stakingAmountBalance).send({ from: curAcount });
            await tokenStakeContract.methods.stake(stakingAmountBalance).send({ from: curAcount });
        } catch (e) {
            alert("Error on staking!");
        }

        setPendingTx(false);

        getInfo();
        fetchDataForStake();
    }

    useEffect(() => {

        if (!isConnected) {
            console.log("error!");
            return;
        }

        if (tokenContract != null && tokenStakeContract != null)
            fetchDataForStake();
    }, [tokenContract, tokenStakeContract]);

    useEffect(() => {
        if (gTokenContract != null && gTokenStakeContract != null)
            getInfo();
    }, [gTokenContract, gTokenStakeContract]);

    useEffect(() => {
        setGTokenStakeContract(new web3Object.web3NoAccount.eth.Contract(web3Config.tokenStakeAbi, web3Config.tokenStakeAddress));
        setGTokenContract(new web3Object.web3NoAccount.eth.Contract(web3Config.tokenAbi, web3Config.tokenAddress));
    }, []);

    return (
        <div className="App">
            <Navbar name="Staking" loadWeb3Modal={loadWeb3Modal} isConnected={isConnected} curAcount={curAcount} logoutOfWeb3Modal={logoutOfWeb3Modal} />

            <div className='relative h-full pt-6' style={{ backgroundColor: "#1F2633" }}>
                <div className='mt-6 flex h-full flex-col items-center relative'>
                    <div className='first_section relative px-4 sm:px-6 flex flex-col justify-center items-center w-full' style={{ height: "800px" }}>

                        {/* Staking */}
                        <div className="roadmap_card rgb justify-center px-4 flex flex-col" style={{ width: "400px", height: "600px", backgroundColor: "rgba(0,0,0,0.9)" }}>

                            {/* <div><img src="img/pepe_text.png" style={{width: "150px", height:"50px"}}></img></div> */}

                            <div id='devote' className='my-5 flex justify-center tabcontent' style={{ height: "480px" }}>
                                <div className='border border-gray-700 p-4 rounded-xl w-full' style={{ backgroundColor: "#1A1530" }}>
                                    <div className='flex flex-row justify-between'>
                                        <div className='text-gray-400 flex flex-row items-center text-sm'>
                                            <p className='pr-1'>Staked Amount</p>
                                        </div>
                                    </div>
                                    <div className='py-2'>
                                        <input className='bg-white text-gray-700 rounded-md w-full text-sm px-3 py-3 '
                                            type='text' placeholder='0' disabled value={stakedAmount}></input>
                                    </div>
                                    <div className='flex flex-row justify-between'>
                                        <div className='text-gray-400 flex flex-row items-center text-sm'>
                                            <p className='pr-1'>Reward Amount</p>
                                        </div>
                                    </div>
                                    <div className='py-2'>
                                        <input className='bg-white text-gray-700 rounded-md w-full text-sm px-3 py-3 '
                                            type='text' placeholder='0' disabled value={rewardAmount}></input>
                                    </div>
                                    {/* <div className='py-3 flex flex-row'>
                                <div className='flex flex-col w-1/2 mr-2'>
                                    <p className='text-gray-400 text-sm pb-2 text-left'>Lock Date</p>
                                    <input className='bg-white text-gray-700 rounded-md w-full text-sm px-3 py-3' type='text' placeholder='0/00/0000'></input>
                                </div>
                                <div className='flex flex-col w-1/2'>
                                    <p className='text-gray-400 text-sm pb-2 text-left'>Unlock Date</p>
                                    <input className='bg-white text-gray-700 rounded-md w-full text-sm px-3 py-3' type='text' placeholder='0/00/0000'></input>
                                </div>
                            </div> */}
                                    <button className='nft_button w-full my-2 py-3 rounded-md text-white lorswap_vote text-center font-bold'
                                        onClick={() => {
                                            claimToken();
                                        }}
                                    >
                                        CLAIM
                                    </button>
                                    <button className='nft_button w-full my-2 py-3 rounded-md text-white lorswap_vote text-center font-bold'
                                        onClick={() => {
                                            unStakeToken();
                                        }}
                                    >
                                        UNSTAKE
                                    </button>
                                    {/* <div className='flex flex-row items-center py-3'>
                                <p className='text-gray-400 text-sm pr-1'>Claim</p>
                                <input className='bg-white text-gray-700 rounded-md w-full text-sm px-3 py-3' type='text' placeholder='0'></input>
                            </div> */}
                                    <div className='flex flex-row justify-between'>
                                        <div className='text-gray-400 flex flex-row items-center text-sm'>
                                            <p className='pr-1'>Staking Amount</p>
                                        </div>
                                        <div className='text-gray-400 flex flex-row items-center text-sm'>
                                            <p className='pr-1'>Balance {balanceAmount}</p>
                                        </div>
                                    </div>
                                    <div className='py-2'>
                                        <input className='bg-white text-gray-700 rounded-md w-full text-sm px-3 py-3 '
                                            type='text' placeholder='0' onChange={handleChange} value={stakingAmount}>
                                        </input>
                                    </div>
                                    <button className='nft_button w-full my-2 py-3 rounded-md text-white lorswap_vote text-center font-bold'
                                        onClick={() => {
                                            stakeToken();
                                        }}
                                    >
                                        STAKE
                                    </button>
                                </div>
                            </div>

                            <div className='flex justify-center'>Total Staked Pepe Born: {totalStakedAmount}</div>
                            <div className='flex justify-center'>Deposit Fee: 0 %</div>
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
