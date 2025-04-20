require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    etherlink: {
      url: "https://node.ghostnet.etherlink.com",
      accounts: ["7af750accc71f2d41c9ba65b3a50b75fa673df2ecf25214176f7fa60a9d02736"]
    }
  }
};
