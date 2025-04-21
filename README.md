# Etherlink NFT DApp

This is a simple NFT minting and management app for the [Etherlink Testnet](https://testnet.explorer.etherlink.com/)

### 📦 Features
- Connect your MetaMask wallet
- Mint NFTs by pasting a metadata JSON URL (hosted on IPFS)
- Transfer owned NFTs to another address
- View your minted NFTs
  
## 🚀 Live Demo
[https://etherlink-nft-dapp.vercel.app
](https://etherlink-nft-dapp.vercel.app)

---

## 🧪 How to Use

### 🔗 Connect Your Wallet
1. Open the [deployed app on Vercel](https://etherlink-nft-dapp.vercel.app)
2. Click **Connect Wallet**
3. Make sure MetaMask is on the **Etherlink Testnet**

### 🧾 Mint NFT
1. Click **Mint NFT**
2. Paste a valid metadata JSON URI from IPFS:
   Example: [https://bafybeibfcc3hutn7ziju6jftvsr3o7vyz6bm5do3a4o4kfzl7x3eicp3ry.ipfs.w3s.link/papi-in-a-box.json](https://bafybeibfcc3hutn7ziju6jftvsr3o7vyz6bm5do3a4o4kfzl7x3eicp3ry.ipfs.w3s.link/papi-in-a-box.json)
3. Confirm the transaction in MetaMask
3. Confirm the transaction in MetaMask

### 🔁 Transfer NFT
1. Click **Transfer NFT**
2. Enter the **recipient address**
3. Enter the **token ID** to transfer

### 👁️ View NFTs
- Click **View My NFTs** to fetch and display tokens you own on the connected address

---

## ⚙️ Etherlink Network Setup (for MetaMask)

Manually add the Etherlink Testnet to MetaMask:

**Network Name:** Etherlink Testnet RPC 

**URL:** [https://node.ghostnet.etherlink.com ](https://node.ghostnet.etherlink.com )

**Chain ID:** 128123 

**Currency Symbol:** ETH 

**Block Explorer:** [https://testnet.explorer.etherlink.com/](https://testnet.explorer.etherlink.com/)


---

## 🐛 Troubleshooting & FAQ

### Q: "Mint failed: network does not support ENS"?
**A:** This is expected — Etherlink doesn't support ENS resolution. It's safe to ignore.

### Q: My NFT minted, but it's not shown in the UI?
**A:** Make sure your metadata JSON uses the correct `image` field and is publicly accessible on IPFS.

### Q: I'm getting a `bad address checksum` error?
**A:** Use lowercase addresses when hardcoding addresses in the code.

### Q: View My NFTs shows nothing?
**A:** Your wallet must match the address that owns the token. Also verify your contract exposes `tokenCounter`, `tokenURI`, and `ownerOf` functions.

---

## 📄 Contract Info
This app interacts with a verified ERC721 contract deployed via Remix.

**Contract address:** [`0x08026ffad41b16ba0028770039cddb53b7b2bb96`](https://testnet.explorer.etherlink.com/address/0x08026ffad41b16ba0028770039cddb53b7b2bb96)

---

## 🛠 Tech Stack
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [ethers.js](https://docs.ethers.org/)
- [IPFS / Web3.Storage](https://web3.storage/)
- [MetaMask](https://metamask.io/)

---

Made with ❤️ by Amy Waliszewska
