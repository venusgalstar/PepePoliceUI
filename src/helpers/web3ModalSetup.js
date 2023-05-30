import dotenv from "dotenv";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

dotenv.config();

/**
  Web3 modal helps us "connect" external wallets:
**/
const web3ModalSetup = () =>
  new Web3Modal({
    cacheProvider: true,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.REACT_APP_INFURA_ID, // required
          rpc: {
            1: 'https://eth-rpc.gateway.pokt.network', // ETH Mainnet
            10: 'https://mainnet.optimism.io', // Optimism
            25: "https://evm.cronos.org", // Cronos Mainnet Beta
            56: 'https://bsc-dataseed1.binance.org', // BSC Mainnet
            97: 'https://data-seed-prebsc-2-s2.binance.org:8545', // BSC testnet
            122: 'https://fuse-rpc.gateway.pokt.network', // Fuse Mainnet
            137: 'https://matic-mainnet-full-rpc.bwarelabs.com', // POLYGON Mainnet
            250: 'https://rpc3.fantom.network', // Fantom Opera
            1284: 'https://1rpc.io/glmr', // Moonbeam
            1285: 'https://moonriver.api.onfinality.io/public', // Moonriver
            2000: 'https://rpc01-sg.dogechain.dog', // Dogechain Mainnet
            42161: 'https://arb1.arbitrum.io/rpc', // Arbitrum One
            43114: 'https://1rpc.io/avax/c', // Avalanche C Chain
          },
        },
      },
    },
  });

export default web3ModalSetup;
