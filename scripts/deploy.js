const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const NFT = await hre.ethers.getContractFactory("EtherlinkNFTv2");
  const nft = await NFT.deploy({ gasLimit: 3_000_000 });

  await nft.deploymentTransaction().wait(); // Wait for TX confirmation
  console.log("✅ Contract deployed at:", await nft.getAddress());
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
