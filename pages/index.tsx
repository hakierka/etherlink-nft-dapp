import { useEffect, useState } from "react";
import Head from "next/head";
import { ethers } from "ethers";
import "../styles/globals.css";

declare global {
  interface Window {
    ethereum?: ethers.Eip1193Provider;
  }
}

const CONTRACT_ADDRESS = "<REPLACE_WITH_YOUR_CONTRACT_ADDRESS>";
const CONTRACT_ABI = [
  "function mint(address to, string memory tokenURI) public",
  "function transferNFT(address to, uint256 tokenId) public",
  "function tokenCounter() public view returns (uint256)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function tokenURI(uint256 tokenId) public view returns (string)"
];

export default function Home() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [tokens, setTokens] = useState<{ id: number; uri: string }[]>([]);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const _provider = new ethers.BrowserProvider(window.ethereum as ethers.Eip1193Provider);
      setProvider(_provider);
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) return;
    const accounts = await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner(accounts[0]);
    const address = accounts[0];
    const _contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    setWallet(address);
    setContract(_contract);
  };

  const handleMint = async () => {
    if (!wallet || !provider || !contract) return;
    try {
      const tokenURI = window.prompt("Paste full metadata URI (e.g. https://...)", "https://") || "";
      const tx = await contract.mint(wallet, tokenURI);
      await tx.wait();
      alert("✅ NFT Minted! TX Hash: " + tx.hash);
    } catch (error: unknown) {
      console.error("Mint failed:", (error as Error)?.message || error);
      alert("❌ Mint failed. See console for details.");
    }
  };

  const handleTransfer = async () => {
    if (!contract) return;
    const to = prompt("Enter recipient address") || "";
    const tokenIdStr = prompt("Enter token ID to transfer") || "0";
    const tokenId = parseInt(tokenIdStr);
    const tx = await contract.transferNFT(to, tokenId);
    await tx.wait();
    alert("NFT Transferred!");
  };

  const fetchMyNFTs = async () => {
    if (!contract || !wallet) return;
    const total = await contract.tokenCounter();
    const owned: { id: number; uri: string }[] = [];

    for (let i = 0; i < total; i++) {
      try {
        const owner = await contract.ownerOf(i);
        if (owner.toLowerCase() === wallet.toLowerCase()) {
          const uri = await contract.tokenURI(i);
          owned.push({ id: i, uri });
        }
      } catch {
        // skip
      }
    }

    setTokens(owned);
  };

  return (
    <>
      <Head>
        <title>Etherlink NFT DApp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Mint and manage NFTs on Etherlink Testnet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <h1 className="title">Etherlink NFT DApp</h1>
        {!wallet ? (
          <button onClick={connectWallet} className="button primary">
            Connect Wallet
          </button>
        ) : (
          <>
            <p className="wallet">Connected as: {wallet}</p>
            <div className="button-group">
              <button onClick={handleMint} className="button green">
                Mint NFT
              </button>
              <button onClick={handleTransfer} className="button yellow">
                Transfer NFT
              </button>
              <button onClick={fetchMyNFTs} className="button purple">
                View My NFTs
              </button>
            </div>
            <div className="nft-grid">
              {tokens.map((t) => (
                <div key={t.id} className="nft-card">
                  <p className="token-label">Token #{t.id}</p>
                  <img src={t.uri} alt={`Token ${t.id}`} className="token-image" />
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
