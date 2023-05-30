import nftAbi from './nft.json';
import nftStakeAbi from './nftStake.json';
import tokenAbi from './token.json';
// import tokenStakeAbi from './tokenStake.json';

var config = {
    nftAddress: "0xAEAed6335EDaBbAa074f6C82910c36Bf7FdA9109",
    nftAbi: nftAbi,
    tokenAddress: "0xBD85c3F31bc20aE79eCc710fF9CbC03bCB1CFA8C",
    tokenAbi: tokenAbi,
    nftStakeAddress: "0xe34e07f8006bf6b090b148d0632b950435e513cc",
    nftStakeAbi: nftStakeAbi,
    RPC_URL: "https://data-seed-prebsc-2-s2.binance.org:8545",
};

export default config;