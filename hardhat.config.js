require('dotenv').config();

//yarn add hardhat-waffle 
require("./tasks/deploy_stacked_pupz");
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require('hardhat-abi-exporter');
require('hardhat-docgen');
require('hardhat-gas-reporter');
require('hardhat-spdx-license-identifier');
require('solidity-coverage');
require("@nomiclabs/hardhat-waffle");
/*

require("./tasks/deploy_stacker");
require("./tasks/deploy_staked_pupz");
require("./tasks/deploy_staked_stacked_pups");
require("./tasks/deploy_stack_rewards");
require("./tasks/set_start_stacker");
require("./tasks/stacker");
require("./tasks/set_reward_params");
require("./tasks/deploy_fox_rewards");
require("./tasks/set_fox_rewards");
require("./tasks/deploy_fixed_staking");
require("./tasks/set_whitelist");
require("./tasks/stake_pup");
require("./tasks/unpause");
require("./tasks/calculate_rewards");
require("./tasks/set_bugz_rewards");
require("./tasks/mint_stack");
require("./tasks/set_fixed_fox");
require("./tasks/deploy_anoni");
require("./tasks/test_reclaim");
require("./tasks/deploy_zombie_pupz");
require("./tasks/deploy_berry_staking");
require("./tasks/deploy_bumblebee_rewards");
require("./tasks/deploy_bumblebee_single");
require("./tasks/set_stacked_staked_rewards");
require("./tasks/deploy_default_erc20");
require("./tasks/deploy_lottery");
require("./tasks/deploy_elephant");
require("./tasks/deploy_fud_farm_genesis");
require("./tasks/deploy_cured_meowz");
*/

require("./tasks/deploy_cured_meowz");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 10,
      },
    },
  },

  networks: {
    hardhat: {
      ...(process.env.FORK_MODE
        ? {
            forking: {
              url: `https://eth-${
                process.env.FORK_NETWORK || 'mainnet'
              }.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
            },
          }
        : {}),
    },

    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_MAINNET_KEY}`,
      accounts: [process.env.ETH_MAIN_KEY],
      gas: 2900000,
      gasPrice: 220000000000
    },

    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
      accounts: [process.env.ETH_TEST_KEY],
    },
  },

  abiExporter: {
    clear: true,
    flat: true,
    pretty: true,
  },

  docgen: {
    clear: true,
    runOnCompile: false,
  },

  etherscan: {
    apiKey: process.env.API_KEY,
  },

  gasReporter: {
    enabled: process.env.REPORT_GAS === 'true',
  },

  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: true,
  },
  mocha: {
    timeout: 3000000
  }
};

