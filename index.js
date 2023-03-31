const ethers = require("ethers"); // assuming commonjs
require("dotenv").config();

const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "toChainID",
        type: "uint256",
      },
    ],
    name: "anySwapOutUnderlying",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const env = {
  KEY: process.env.KEY,
};

const config = {
  routerAddress: "0x3f9520d640085b5d2be2b294d6f12786286a2a14",
  toAddress: "0xEFcc454b4b2F4D7F89E8D9aB9Cb2d45630a3EFf0",
  amount: ethers.utils.parseEther("0.15"), // min swap is 0.1
  destChainID: 18,
  homeTokenAddress: "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee",
  homeRPC: "https://data-seed-prebsc-1-s1.binance.org:8545",
};

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(config.homeRPC);
  const wallet = new ethers.Wallet(env.KEY, provider);
  const router = new ethers.Contract(config.routerAddress, ABI, wallet);

  await router
    .anySwapOutUnderlying(
      config.homeTokenAddress,
      config.toAddress,
      config.amount,
      config.destChainID
    )
    .then((tx) => {
      console.log("Transaction hash: " + tx.hash);
    });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
