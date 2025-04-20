# Etherlink NFT DApp

A minimalist Ethereum-compatible decentralized application (DApp) that allows users to:

- Connect their wallet

- Mint NFTs using IPFS metadata

- Transfer owned NFTs to others

- View NFTs owned by the connected wallet

Built with **Next.js**, **Ethers.js**, and custom **CSS**, deployed on **Vercel**.

## 🚀 Live Demo

[https://etherlink-nft-dapp.vercel.app
](https://etherlink-nft-dapp.vercel.app
)


## 🛠 Tech Stack

- [Next.js
](https://nextjs.org/)
- [Ethers.js
](https://docs.ethers.org/v5/)
- [IPFS](https://ipfs.tech/) + [Storacha](https://storacha.network/) (metadata hosting)
-[Vercel](https://vercel.com/) (deployment)

## 📦 Getting Started
```bash
git clone https://github.com/hakierka/etherlink-nft-dapp
cd etherlink-nft-dapp
npm install
npm run dev
```

## 🔐 Smart Contract

Deployed separately via Hardhat. Update your `CONTRACT_ADDRESS` in `pages/index.tsx`.

**ABI Assumes the contract exposes:**
```bash
function mint(address to, string memory tokenURI) public;
function transferNFT(address to, uint256 tokenId) public;
function tokenCounter() public view returns (uint256);
function ownerOf(uint256 tokenId) public view returns (address);
function tokenURI(uint256 tokenId) public view returns (string);
```

📁 Project Structure
```bash
├── contracts
├── pages
│   └── index.tsx
├── public
│   └── favicon.ico
├── scripts
├── styles
│   └── globals.css
├── hardhat.config.js
└── README.md
```
## 🧼 Notes
- You must manually fund your wallet using the Etherlink faucet.

- You need at least one funded account to mint.

- This version uses prompt() to input recipient and metadata URI.
