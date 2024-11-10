const { ethers } = require('ethers');
const fs = require('fs');

const privateKey = 'my private key';

const apiKey = "117d5f330312436bab754ae1618a7840"

const url = `https://mantle-mainnet.infura.io/v3/${apiKey}`

const provider = new ethers.JsonRpcProvider(url)


const mETHContract = "0xcDA86A272531e8640cD7F1a92c01839911B90bb0"

const address_datas = fs.readFileSync('address.txt', 'utf8');

const walletArr = address_datas.split(/\r?\n|\r|\n/g).filter(e => e.length > 0)


async function sendmETHonetomulti() {
    const wallet = new ethers.Wallet(privateKey, provider);

    const mETHToken = new ethers.Contract(mETHContract, require("./mETHTokenABI.json"), wallet)

    const mETH = await mETHToken.balanceOf(wallet.address)

    console.log(mETH)

    const numTrans = 0.000004
    const weiAmount = ethers.parseEther(numTrans.toString())
    for (let i = 0; i < walletArr.length; i++) {
        try {
            //Transfer mETH

            // const mETHTransaction = await mETHToken.transfer(walletArr[i], weiAmount);

            // const receipt = await mETHTransaction.wait();

            // console.log(receipt)


        } catch (error) {
            console.error('Error sending transaction:', error);
        }
    }

}

sendmETHonetomulti()





