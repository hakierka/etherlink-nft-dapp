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
## 💻 Local Development
```
git clone https://github.com/hakierka/etherlink-nft-dapp.git
cd etherlink-nft-dapp
npm install
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

## ✅ Usage Guide
### Connect Wallet
1. Click Connect Wallet
2. Use Etherlink Testnet on MetaMask
```
Network Name: Etherlink Testnet
RPC URL: https://node.ghostnet.etherlink.com
Chain ID: 128123
Symbol: ETH
```

### Mint NFT
1. Click Mint NFT
2. Paste full JSON URI (e.g. Storacha link)
   
Sample Metadata File:
```
{
  "name": "Cat in a Box",
  "description": "Charming cat NFT",
  "image": "https://bafybeifp2qrmlbkmhtmfsp5bop5hcsuhmiqmuk3vhfpmyjbydszcy7i6jm.ipfs.w3s.link/Papi_in_a_box.jpeg"
}
```
Paste This When Minting:
```
https://bafybeibfcc3hutn7ziju6jftvsr3o7vyz6bm5do3a4o4kfzl7x3eicp3ry.ipfs.w3s.link/papi-in-a-box.json
```

### Transfer NFT
- Enter recipient address
- Provide token ID (from “View My NFTs”)

### View NFTs
- Click **View My NFTs** to fetch and display tokens you own on the connected address

---

## 🐛 Troubleshooting & FAQ

### Q: "Mint failed: network does not support ENS"?
**A:** This is expected — Etherlink doesn't support ENS resolution. It's safe to ignore.

### Q: My NFT minted, but it's not shown in the UI?
**A:** Make sure your metadata JSON uses the correct `image` field and is publicly accessible on IPFS.

### Q: I'm getting a `bad address checksum` error?
**A:** You're likely pasting an address in the wrong case. Always use checksummed or lowercase addresses like:
```
0xfcaf2e74a561578d3709da7d157079dd91b20ff8
```

### Q: View My NFTs shows nothing?
**A:** Your wallet must match the address that owns the token. Also verify your contract exposes `tokenCounter`, `tokenURI`, and `ownerOf` functions.


### Q: I clicked "Mint", but got execution reverted or unknown custom error
**A:** This means the wallet you're using is not the owner of the contract.
Only the deployer (owner) of the contract can mint NFTs.

### Q: I uploaded an image to Web3.Storage — why can’t I mint it directly?
**A:** You need to mint a metadata JSON, not a raw image.
Wrap your image URL in a .json like:
```
{
  "name": "Cool NFT",
  "description": "Minted via Etherlink DApp",
  "image": "https://bafy...ipfs.w3s.link/image.jpg"
}
```
Then paste the full URL to the .json during minting.

### Q: My metadata shows a broken image in UI

**A:** Ensure your JSON `"image"` field points to a direct URL of a valid image.
Test it by opening the image link directly in a browser.

### Q: How do I find my token ID?
**A:** It’s shown on the UI after you click “View My NFTs”.
Look for `Token #X`.

### Q:  I don’t want to use Remix. Can I deploy the contract via Hardhat?
**A:** Yes — there’s a sample `contract-template/EtherlinkNFT.sol` in the repo.
You can deploy it using your private key via Hardhat.

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
