import { createStore } from 'vuex'
const Web3 = require('web3')
import {ABI} from '@/contracts/Example.abi.js'
import {bytecode} from '@/contracts/Example.bin.js'

export default createStore({
state: {
    web3Wallet: {},
    wallet: {
        address: '',
        chainId: '',
        chain: ''
    },
    contractAddress: ''
},
getters: {
},
mutations: {
},
actions: {
    async connectionWallet({state}) {
        if (typeof window.ethereum !== 'undefined') {
            console.log("Ethereum client installed!")
            if (ethereum.isMetaMask === true) {
                console.log("Metamask installed!")
                if (ethereum.isConnected() !== true) {
                    console.log("Metamask is not connected!")
                    await ethereum.enable()
                }
                console.log("Metamask connected!")
            } else {
                alert("Metamask is not installed!")
            }
        }
            else{
                alert("Ethereum client is not installed!")
            }
            ethereum.request({method: "eth_requestAccounts"})
            .then(accounts => {
                this.state.wallet.address = accounts[0]
                console.log(`Account ${state.wallet.address} connected`)
            })

            // создаем провайдера
            state.web3Wallet = new Web3(ethereum)
            // получаем параметры сети
            state.wallet.chainId = await state.web3Wallet.eth.net.getId()
            state.wallet.chain = await state.web3Wallet.eth.net.getNetworkType()

            ethereum.on('accountsChanged', (accounts) => {
                state.wallet.address = accounts[0]
                console.log(`accounts changed to ${ state.wallet.address }`)
            })

            ethereum.on('chainChanged', async (chainId) => {
                state.web3Wallet = new Web3(ethereum)
                state.wallet.chainId = await state.web3Wallet.eth.net.getId()
                state.wallet.chain = await state.web3Wallet.eth.net.getNetworkType()
                console.log(`chainId changed to ${ state.wallet.chainId }`)
                console.log(`chain changed to ${ state.wallet.chain }`)
            })
    },
    async sendTransaction({state}, to, value) {

        value = state.web3Wallet.utils.numberToHex(value)

        await ethereum.request({
            method: "eth_sendTransaction",
            params: [{
            from: state.wallet.address,
            to: to,
            value: value, 
            }]
        })
            .then(hash => {
            console.log(`Tx hash ${hash}`)
        })
    },
    async deployContract({state}) {

        await ethereum.request({
            method: "eth_sendTransaction",
            params: [{
                from: state.wallet.address,
                data: bytecode,
                gas: 5000000
            }]
        })
        .then(hash => {
            console.log(`Tx hash ${hash}`)
        })
        .catch(error => {
            console.log(error)
        })
    },
    async setNumber({state}, args ){
        const [contractAddress, number] = args

        let myContract = new state.web3Wallet.eth.Contract(ABI, contractAddress)

        let txData = myContract.methods.setX(number).encodeABI()
    
        ethereum.request({
            method: "eth_sendTransaction",
            params: [{
                from: state.wallet.address,
                to: contractAddress,
                data: txData
            }]
        })
        .then(hash => {
            console.log(`Tx hash ${hash}`)
        })
    },
    async getNumber({state}, contractAddress) {
        let myContract = new state.web3Wallet.eth.Contract(ABI, contractAddress)
        let number = await myContract.methods.getX().call({from: state.wallet.address})
        return number
    }
},
modules: {
}
})
