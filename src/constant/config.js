import nftAbi from './nft.json';
import nftStakeAbi from './nftStake.json';
import tokenAbi from './token.json';
// import tokenStakeAbi from './tokenStake.json';

var config = {
    nftAddress: "0xAEAed6335EDaBbAa074f6C82910c36Bf7FdA9109",
    nftAbi: nftAbi,
    tokenAddress: "0xBD85c3F31bc20aE79eCc710fF9CbC03bCB1CFA8C",
    tokenAbi: tokenAbi,
    nftStakeAddress: "0xef542e9b8bD3Cee766c03e7Ab1C57EDA295Fd0f1",
    nftStakeAbi: nftStakeAbi,
    RPC_URL: "https://data-seed-prebsc-2-s2.binance.org:8545",
};

export default config;