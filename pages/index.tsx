import { useEffect, useState } from "react";
import { ethers } from "ethers";

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
    <main style={{
      padding: "2rem",
      maxWidth: "600px",
      margin: "0 auto",
      textAlign: "center",
      background: "#000",
      color: "#fff",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>Etherlink NFT DApp</h1>
      {!wallet ? (
        <button onClick={connectWallet} style={{
          background: "#0070f3",
          color: "#fff",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem"
        }}>
          Connect Wallet
        </button>
      ) : (
        <>
          <p style={{ fontSize: "0.875rem", color: "#aaa", marginBottom: "1rem" }}>Connected as: {wallet}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <button onClick={handleMint} style={{ background: "#22c55e", color: "#fff", padding: "0.75rem 1rem", borderRadius: "6px", border: "none", cursor: "pointer" }}>
              Mint NFT
            </button>
            <button onClick={handleTransfer} style={{ background: "#facc15", color: "#000", padding: "0.75rem 1rem", borderRadius: "6px", border: "none", cursor: "pointer" }}>
              Transfer NFT
            </button>
            <button onClick={fetchMyNFTs} style={{ background: "#a855f7", color: "#fff", padding: "0.75rem 1rem", borderRadius: "6px", border: "none", cursor: "pointer" }}>
              View My NFTs
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginTop: "2rem" }}>
            {tokens.map((t) => (
              <div key={t.id} style={{
                border: "1px solid #333",
                borderRadius: "12px",
                padding: "1rem",
                background: "#111"
              }}>
                <p style={{ fontSize: "0.875rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Token #{t.id}</p>
                <img
                  src={t.uri}
                  alt={`Token ${t.id}`}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                    borderRadius: "8px"
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
