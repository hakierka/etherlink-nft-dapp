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
    <main className="p-6 max-w-xl mx-auto text-center space-y-6">
      <h1 className="text-3xl font-bold">Etherlink NFT DApp</h1>
      {!wallet ? (
        <button onClick={connectWallet} className="bg-blue-600 text-white px-4 py-2 rounded">
          Connect Wallet
        </button>
      ) : (
        <>
          <p className="text-sm text-gray-600">Connected as: {wallet}</p>
          <div className="space-x-4">
            <button onClick={handleMint} className="bg-green-600 text-white px-4 py-2 rounded">
              Mint NFT
            </button>
            <button onClick={handleTransfer} className="bg-yellow-500 text-black px-4 py-2 rounded">
              Transfer NFT
            </button>
            <button onClick={fetchMyNFTs} className="bg-purple-600 text-white px-4 py-2 rounded">
              View My NFTs
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {tokens.map((t) => (
              <div key={t.id} className="border rounded-xl p-4 shadow">
                <p className="text-sm font-semibold mb-2">Token #{t.id}</p>
                <img /* eslint-disable-next-line @next/next/no-img-element */
                  src={t.uri}
                  alt={`Token ${t.id}`}
                  className="w-full h-48 object-contain rounded"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
