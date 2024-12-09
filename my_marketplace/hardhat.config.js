require("@nomicfoundation/hardhat-toolbox");
const tenderly = require("@tenderly/hardhat-tenderly");

const NEXT_PUBLIC_POLYGON_MUMBAI_RPC = "https://virtual.polygon-amoy.rpc.tenderly.co/66970b94-78e8-4b6f-a3fa-0f46a4ff0e87";
const NEXT_PUBLIC_PRIVATE_KEY = "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

/** @type import('hardhat/config').HardhatUserConfig */

tenderly.setup({ automaticVerifications: true });

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "matic",
  networks: {
    hardhat: {},
    polygon_amoy: {
      url: NEXT_PUBLIC_POLYGON_MUMBAI_RPC,
      accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
    },
  },
  tenderly: {
    // https://docs.tenderly.co/account/projects/account-project-slug
    project: "project",
    username: "OmkarV",
  },
};
