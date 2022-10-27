import Web3 from 'web3';
import { parseUnits, formatUnits } from '@ethersproject/units';
import { DateTime } from 'luxon';
import TokenABI from '../contracts/HIFIToken.json';
import FactoryABI from '../contracts/GameFactory.json';
import NFTStakingABI from '../contracts/NFTStaking.json';
import { TokenAddress, FactoryAddress, NFTStakingAddress } from '../constants';
const {
  ethereum
} = window;
const web3 = new Web3(ethereum);
export function shortenHex(hex, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(hex.length - length)}`;
}
const pad = num => `0${num}`.slice(-2);
export function ddhhmmss(secs) {
  const minutes = Math.floor(secs / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  return `${pad(days)}:${pad(hours % 24)}:${pad(minutes % 60)}:${pad(secs % 60)}`;
}
const BSCSCAN_PREFIXES = {
  56: '',
  97: 'testnet.'
};

/**
 *
 * @param {("Account"|"Transaction")} type
 * @param {[number, string]} data
 */
export const formatBscscanLink = (type, data) => {
  if (type === 'Account') {
    const [chainId, address] = data;
    return `https://${BSCSCAN_PREFIXES[chainId]}bscscan.com/address/${address}`;
  }
  const [chainId, hash] = data;
  return `https://${BSCSCAN_PREFIXES[chainId]}bscscan.com/tx/${hash}`;
};

/**
 * @name parseBalance
 *
 * @param {import("@ethersproject/bignumber").BigNumberish} balance
 * @param {number} decimals
 * @param {number} decimalsToDisplay
 *
 * @returns {string}
 */
export const parseBalance = (balance, decimalsToDisplay = 3) => Number(formatUnits(balance)).toFixed(decimalsToDisplay);
export const _objToArray = obj => {
  const tempArr = [];
  // eslint-disable-next-line
  Object.keys(obj).map(key => {
    tempArr.push(obj[key]);
  });
  return tempArr;
};
export const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export const nFormatter = (num, digits) => {
  const si = [{
    value: 1,
    symbol: ''
  }, {
    value: 1e3,
    symbol: 'k'
  }, {
    value: 1e6,
    symbol: 'M'
  }, {
    value: 1e9,
    symbol: 'G'
  }, {
    value: 1e12,
    symbol: 'T'
  }, {
    value: 1e15,
    symbol: 'P'
  }, {
    value: 1e18,
    symbol: 'E'
  }];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i -= 1) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
};

// Check if the metamas is installed
export const _isWeb3Defined = () => {
  // Have to check the ethereum binding on the window object to see if it's installed
  return Boolean(ethereum);
};

// Check current chain is valid or not
export const _isValidChainId = async () => {
  // Have to check the ethereum binding on the window object to see if it's installed
  if (_isWeb3Defined()) {
    const chainID = await web3.eth.net.getId();
    if (chainID === 56) {
      return true;
    }
    return false;
  }
  return false;
};

// Get Game Factory Contract Instanse
export const getGameFactoryContractInstance = () => {
  if (_isWeb3Defined()) {
    const newFactoryContract = new web3.eth.Contract(FactoryABI, FactoryAddress);
    return newFactoryContract;
  }
  return null;
};

// Get Token Contract Instance
export const getTokenContractInstance = () => {
  if (_isWeb3Defined()) {
    const newTokenContract = new web3.eth.Contract(TokenABI, TokenAddress);
    return newTokenContract;
  }
  return null;
};

// Get user default wallet address
export const getDefaultAddres = async () => {
  if (_isWeb3Defined()) {
    const defaultAccount = await web3.eth.getAccounts();
    return defaultAccount[0];
  }
  return null;
};

// get current user's BNB Balance
export const getBNBBalance = async () => {
  const userAddress = await getDefaultAddres();
  if (_isWeb3Defined() && userAddress) {
    const defaultBalance = await web3.eth.getBalance(userAddress);
    return Number(web3.utils.fromWei(defaultBalance, 'ether')).toFixed(3);
  }
  return 0;
};

// Get current user's Token balance
export const getTokenBalance = async () => {
  const tokenContract = getTokenContractInstance();
  const userAddress = await getDefaultAddres();
  if (tokenContract && userAddress) {
    const temp = await tokenContract.methods.balanceOf(userAddress).call();
    return parseBalance(temp);
  }
  return 0;
};
const subtractDate = (start, end) => {
  const second = DateTime.fromISO(end).toSeconds() - DateTime.fromISO(start).toSeconds();
  return Math.round(second / 86400);
};

// Get user boost item expiry
export const getUserBoostExpiryTimestamp = async (userAddress, boostItemId) => {
  const gameFactory = getGameFactoryContractInstance();
  if (gameFactory && userAddress) {
    const expiryBlock = await gameFactory.methods.boostItemExpireTime(userAddress, boostItemId).call();
    return expiryBlock;
  }
  return 0;
};
export const getBoostItemStatus = async (userAddress, boostLevel) => {
  const expiryTimeStamp = await getUserBoostExpiryTimestamp(userAddress, boostLevel);
  const expiryDate = Number.parseInt(expiryTimeStamp, 10) === 0 ? null : new Date(expiryTimeStamp * 1000);
  const showDate = DateTime.local().setZone('UTC').toISO();
  const activeStatus = expiryDate != null ? subtractDate(showDate, expiryDate.toISOString()) > 0 : false;
  return {
    expiryDate,
    activeStatus
  };
};

// Get user Staking amount
export const getUserStakingAmount = async () => {
  const gameFactory = getGameFactoryContractInstance();
  const userAddress = await getDefaultAddres();
  if (gameFactory && userAddress) {
    const staked = await gameFactory.methods.getStakedAmountByUser(userAddress).call();
    const bronzeItemStatus = await getBoostItemStatus(userAddress, 3);
    const silverItemStatus = await getBoostItemStatus(userAddress, 2);
    const goldItemStatus = await getBoostItemStatus(userAddress, 1);
    // console.log('staked', staked);
    return [parseBalance(staked[0]), parseBalance(staked[1]), bronzeItemStatus.activeStatus ? 1 : 0, silverItemStatus.activeStatus ? 1 : 0, goldItemStatus.activeStatus ? 1 : 0];
  }
  return [0, 0, 0, 0, 0];
};
export const getGameStatisticData = async () => {
  const gameFactory = getGameFactoryContractInstance();
  const userAddress = await getDefaultAddres();
  if (gameFactory && userAddress) {
    const statisticData = await gameFactory.methods.getStatistic().call();
    return {
      totalApproved: parseBalance(statisticData.totalApproved),
      totalRewarded: parseBalance(statisticData.totalApproved),
      totalFrozen: Number(parseBalance(statisticData.totalStakedForPlay)) + Number(parseBalance(statisticData.totalStakedForEarn)) + Number(parseBalance(statisticData.totalStakedForBoost)),
      totalWithdrawn: parseBalance(statisticData.totalWithdrawn)
    };
  }
  return {
    totalApproved: 0,
    totalRewarded: 0,
    totalFrozen: 0,
    totalWithdrawn: 0
  };
};
export const getThawingPeriod = async () => {
  const gameFactory = getGameFactoryContractInstance();
  const userAddress = await getDefaultAddres();
  if (gameFactory && userAddress) {
    const thawingPeriod = await gameFactory.methods.getThawingLockingPeriod().call({
      from: userAddress
    });
    return thawingPeriod;
  }
  return [];
};
export const getUserThawing = async () => {
  const gameFactory = getGameFactoryContractInstance();
  const userAddress = await getDefaultAddres();
  if (gameFactory && userAddress) {
    const userThawingData = await gameFactory.methods.getThawingStateByUser().call({
      from: userAddress
    });
    return {
      approvedAmount: web3.utils.fromWei(userThawingData.approvedAmount, 'ether'),
      startTime: userThawingData.startTime,
      endTime: userThawingData.endTime
    };
  }
  return [];
};

// Get User Reward Status
export const getUserReward = async () => {
  const gameFactory = getGameFactoryContractInstance();
  const userAddress = await getDefaultAddres();
  if (gameFactory && userAddress) {
    const userRewardData = await gameFactory.methods.getRewardStateByUser().call({
      from: userAddress
    });
    return {
      approvedAmount: web3.utils.fromWei(userRewardData.approvedAmount, 'ether'),
      status: userRewardData.status
    };
  }
  return [];
};

// Get User NFT Balance
export const getUserNFTBalance = async userAddress => {
  const gameFactory = getGameFactoryContractInstance();
  if (gameFactory && userAddress) {
    const ntfBalance = await gameFactory.methods.balanceOf(userAddress).call();
    return ntfBalance;
  }
  return 0;
};

// Get Minimum Stake Amount for EARN
export const getBaseStakeAmountForEarn = async () => {
  const gameFactory = getGameFactoryContractInstance();
  if (gameFactory) {
    const amount = await gameFactory.methods.getBaseStakeAmountForEarn().call();
    return formatUnits(amount);
  }
  return 0;
};

// Get Minimum Stake Amount for EARN
export const getWithdrawFee = async () => {
  const gameFactory = getGameFactoryContractInstance();
  if (gameFactory) {
    const amount = await gameFactory.methods.getWithdrawFee().call();
    return amount;
  }
  return 0;
};

// Get Gold Item Price
export const getGoldItemPrice = async () => {
  const gameFactory = getGameFactoryContractInstance();
  if (gameFactory) {
    const amount = await gameFactory.methods.getGoldItemPrice().call();
    return formatUnits(amount);
  }
  return 0;
};

// Get User NFT Balance
export const getSilverItemPrice = async () => {
  const gameFactory = getGameFactoryContractInstance();
  if (gameFactory) {
    const amount = await gameFactory.methods.getSilverItemPrice().call();
    return formatUnits(amount);
  }
  return 0;
};

// Get User NFT Balance
export const getBronzeItemPrice = async () => {
  const gameFactory = getGameFactoryContractInstance();
  if (gameFactory) {
    const amount = await gameFactory.methods.getBronzeItemPrice().call();
    return formatUnits(amount);
  }
  return 0;
};

// Approve Token
export const approveTokenToContract = async (balance, userAddress) => {
  const calculatedApproveValue = parseUnits('10000000000000000000000000000000000000');
  const tokenContract = getTokenContractInstance();
  const allowance = await tokenContract.methods.allowance(userAddress, FactoryAddress).call();
  if (allowance < balance) {
    await tokenContract.methods.approve(FactoryAddress, calculatedApproveValue).send({
      from: userAddress
    });
  }
};

// Get Random Number
export const getRandomInt = (min, max) => {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  return Math.floor(Math.random() * (maxValue - minValue) + minValue); // The maximum is exclusive and the minimum is inclusive
};

export const displayFormatTime = time => {
  let tValue = time;
  if (Number.isNaN(Number(time))) tValue = 0;
  const hours = Math.floor(Number(tValue / 3600)) > 9 ? Math.floor(Number(tValue / 3600)) : `0${Math.floor(Number(tValue / 3600))}`;
  const minutes = Math.floor(Number(tValue % 3600) / 60) > 9 ? Math.floor(Number(tValue % 3600) / 60) : `0${Math.floor(Number(tValue % 3600) / 60)}`;
  const seconds = Number(tValue % 60).toFixed(0) > 9 ? Number(tValue % 60).toFixed(0) : `0${Number(tValue % 60).toFixed(0)}`;
  return `${hours}:${minutes}:${seconds}`;
};
export const getCookie = name => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return undefined;
};
export const setCookie = (name, value, options) => {
  let cookie = `${name}=${value};`;
  if (options) {
    if (options.path) {
      cookie += `path=${options.path};`;
    }
    if (options.sameSite) {
      cookie += `SameSite=${options.sameSite};`;
    }
    if (options.secure) {
      cookie += `secure;`;
    }
    if (options.domain) {
      cookie += `domain=${options.domain};`;
    }
  } else {
    cookie += `path=/; max-age=604800; SameSite=Strict; secure;`;
  }
  document.cookie = cookie;
};
function get_cookie(name) {
  return document.cookie.split(';').some(c => {
    return c.trim().startsWith(`${name}=`);
  });
}
export const removeCookie = (name, path, domain) => {
  if (get_cookie(name)) {
    document.cookie = `${name}=${path ? `;path=${path}` : ';path=/'}${domain ? `;domain=${domain}` : ''};expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  }
};

// ************************** NFT STAKING ******************************

// Get NFT Staking Contract Instance
export const getNFTStakingContractInstance = () => {
  if (_isWeb3Defined()) {
    const nftStakingContract = new web3.eth.Contract(NFTStakingABI, NFTStakingAddress);
    return nftStakingContract;
  }
  return null;
};
export const approveTokenToNFTStakeContract = async (balance, userAddress) => {
  const calculatedApproveValue = parseUnits('10000000000000000000000000000000000000');
  const tokenContract = getTokenContractInstance();
  const allowance = await tokenContract.methods.allowance(userAddress, NFTStakingAddress).call();
  if (allowance < balance) {
    await tokenContract.methods.approve(NFTStakingAddress, calculatedApproveValue).send({
      from: userAddress
    });
  }
};

// Get Minimum Stake Amount for NFT staking
export const getMinimumNFTStakeAmount = async () => {
  const nftStaking = getNFTStakingContractInstance();
  if (nftStaking) {
    const amount = await nftStaking.methods.minStakingAmount().call();
    return formatUnits(amount);
  }
  return 0;
};