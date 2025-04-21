require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    etherlink: {
      url: "https://node.ghostnet.etherlink.com",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
