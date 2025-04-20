const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const NFT = await hre.ethers.getContractFactory("EtherlinkNFT", deployer);

  const nft = await NFT.deploy({ gasLimit: 3_000_000 });
  await nft.waitForDeployment();

  const contractAddress = await nft.getAddress();
  console.log("✅ Contract deployed at:", contractAddress);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
