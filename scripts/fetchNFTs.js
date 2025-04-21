const { ethers } = require("ethers");

const CONTRACT_ADDRESS = "0xa95a773c85eeb999e4ea2839434a7c7e232fd21c"; // Lowercase ✅
const CONTRACT_ABI = [
  "function tokenCounter() public view returns (uint256)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function tokenURI(uint256 tokenId) public view returns (string)"
];

const provider = new ethers.JsonRpcProvider("https://node.ghostnet.etherlink.com");

async function fetchNFTs() {
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  const total = await contract.tokenCounter();
  console.log(`Total NFTs minted: ${total}`);
}

fetchNFTs();
