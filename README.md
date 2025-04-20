# Etherlink NFT DApp

A minimal web-based DApp for minting and managing ERC-721 NFTs on the Etherlink Testnet.

## ✨Features
- Connect wallet (MetaMask)
- MintNFT by providing a tokenURI (e.g. IPFS metadata URL)
- View all NFTs owned by connected wallet
- Transfer NFTs to other addresses

## 🔧 Tech Stack

- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- Web3: Ethers.js v6

## 🚀 Getting Started
### 📦 Deploy Your Contract to Etherlink
1. Create contract:
```shell
npx hardhat init
```
2. Add your ERC-721 contract in `contracts/MyNFT.sol`
3. Configure Hardhat for Etherlink:
```shell
networks: {
  etherlink: {
    url: "https://node.ghostnet.etherlink.com",
    accounts: ["<YOUR_PRIVATE_KEY>"]
  }
}
```
4. Deploy:
```shell
npx hardhat run scripts/deploy.js --network etherlink
```
Copy the deployed address and paste it into the frontend:

### Install Dependencies
```shell
yarn install  # or npm install
```
### Configure Contract Address
Update `CONTRACT_ADDRESS` in `page.tsx`:
```shell
const CONTRACT_ADDRESS = "<REPLACE_WITH_YOUR_CONTRACT_ADDRESS>";
```
### Run Locally
```shell
yarn dev  # or npm run dev
```
Visit http://localhost:3000


## 🧪 Etherlink Testnet Resources

- **Faucet**: [https://faucet.etherlink.com](https://faucet.etherlink.com)

- **RPC**: [https://node.ghostnet.etherlink.com](https://node.ghostnet.etherlink.com)

- **Explorer**: [https://testnet.explorer.etherlink.com](https://testnet.explorer.etherlink.com)

## 📝 Metadata Example (IPFS)
```shell
{
  "name": "Example NFT",
  "description": "This is an Etherlink NFT",
  "image": "https://your-ipfs-link/image.png"
}
```

## ❓ FAQ
### Why do I need to paste a metadata URL?
The DApp uses off-chain storage (IPFS) for NFT metadata. You must first upload your metadata.json file to IPFS using services like [web3.storage](https://web3.storage/) or [Pinata](https://pinata.cloud/).
### MetaMask shows 'internal transactions cannot include data'
You're trying to send from a contract address. Always use an EOA (Externally Owned Account) with MetaMask.
