"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { ethers } from "ethers";
import Image from "next/image";

declare global {
  interface Window {
    ethereum?: ethers.Eip1193Provider;
  }
}

const CONTRACT_ADDRESS = "0x349145BF727455Fd4fc8E547067960de07AB920e";
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
  const [tokens, setTokens] = useState<{ id: number; image: string }[]>([]);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const _provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(_provider);
    }
  }, []);

  const connectWallet = async () => {
    if (!provider) return;
    const accounts: string[] = await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const _contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    setWallet(accounts[0]);
    setContract(_contract);
  };

  const switchAccount = async () => {
    try {
      await window.ethereum?.request({ method: "wallet_requestPermissions", params: [{ eth_accounts: {} }] });
      await connectWallet();
    } catch (err) {
      console.error("Account switch failed:", err);
    }
  };

  const handleMint = async () => {
    if (!wallet || !contract) return;
    try {
      const tokenURI = window.prompt("Paste full image URI (e.g. https://...)", "https://") || "";
      const tx = await contract.mint(wallet, tokenURI);
      await tx.wait();
      alert("✅ NFT Minted! TX Hash: " + tx.hash);
      fetchMyNFTs();
    } catch (error: unknown) {
      const message = (error as { message?: string })?.message || "Unknown error";
      console.error("Mint failed:", message);
      alert("❌ Mint failed: " + message);
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
    fetchMyNFTs();
  };

  const fetchMyNFTs = async () => {
    if (!contract || !wallet) return;
    const total = await contract.tokenCounter();
    const owned: { id: number; image: string }[] = [];

    for (let i = 0; i < total; i++) {
      try {
        const owner = await contract.ownerOf(i);
        if (owner.toLowerCase() === wallet.toLowerCase()) {
          const uri = await contract.tokenURI(i);
          let image = uri;
          try {
            const res = await fetch(uri);
            const json = await res.json();
            if (json.image) image = json.image;
          } catch {
            // not JSON, fallback to uri as image
          }
          owned.push({ id: i, image });
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
        <p className="subtitle">DevRel Technical Challenge for Trilitech by Amy Waliszewska</p>
        {!wallet ? (
          <button onClick={connectWallet} className="button primary">
            Connect Wallet
          </button>
        ) : (
          <>
            <p className="wallet">Connected as: {wallet}</p>
            <button onClick={switchAccount} className="button">Switch Account</button>
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
              {tokens.length === 0 ? (
                <p>No NFTs found.</p>
              ) : (
                tokens.map((t) => (
                  <div key={t.id} className="nft-card">
                    <p className="token-label">Token #{t.id}</p>
                    <Image
                      src={t.image}
                      alt={`Token ${t.id}`}
                      className="token-image"
                      width={200}
                      height={200}
                      unoptimized={true}
                    />
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}