import Web3 from "web3"
import Vote from '../contract/Vote.json'



const useWeb3 = async () => {


    const web3 = new Web3(window.ethereum)

    

    const voteContract = await new web3.eth.Contract(Vote.abi, "0x83EB9aC8452aFdB2eed4Cb1Fc00873E4fDD49e9C");

    const getAccount = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        return accounts[0];
    }
    return {
        web3,
        voteContract,
        getAccount
    }


}

export default useWeb3