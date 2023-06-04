import web3ModalSetup from "./../helpers/web3ModalSetup";
import Web3 from "web3";
import web3Config from "../constant/config";

const web3Modal = web3ModalSetup();
const httpProvider = new Web3.providers.HttpProvider(web3Config.RPC_URL);
const web3NoAccount = new Web3(httpProvider);

var web3Object = {
  web3Modal: web3Modal,
  httpProvider: httpProvider,
  web3NoAccount: web3NoAccount,
};

export default web3Object;