require('log-timestamp');
const coinUtils = require('./utils.js').utils;
const axios = require('axios');

var getCoinGeckoPrice = async (marketID) => {
  try {
    var url = coinUtils.loadCoinGeckoQuery(marketID);
  } catch (e) {
    console.log(e);
    console.log(`could not fetch ${marketID} price from coin-gecko`);
    return;
  }
  try {
    var priceFetch = await axios.get(url);
  } catch (e) {
    console.log(e);
    console.log(`could not fetch ${marketID} price from coin-gecko`);
    return;
  }
  try {
    const proposedPrice = coinUtils.postProcessCoinGeckoPrice(
      marketID,
      priceFetch.data
    );
    if (!proposedPrice) {
      console.log(`could not fetch ${marketID} price from coin-gecko`);
      return;
    }
    return proposedPrice;
  } catch (e) {
    console.log(e);
    console.log(`failure to post-process coin-gecko price request for ${marketID}
    data: ${priceFetch.data}`);
    return;
  }
};

var getBinancePrice = async (marketID) => {
  try {
    var url = coinUtils.loadBinanceQuery(marketID);
  } catch (e) {
    console.log(e);
    console.log(`could not fetch ${marketID} price from binance`);
  }
  try {
    var priceFetch = await axios.get(url);
  } catch (e) {
    console.log(e);
    console.log(`could not fetch ${marketID} price from binance`);
    return;
  }
  try {
    const proposedPrice = coinUtils.postProcessBinancePrice(
      marketID,
      priceFetch.data
    );
    if (!proposedPrice) {
      console.log(`could not fetch ${marketID} price from binance`);
      return;
    }
    return proposedPrice;
  } catch (e) {
    console.log(e);
    console.log(`failure to post-process binance price request for ${marketID}
    data: ${priceFetch.data}`);
  }
  // return priceFetch.data.lastPrice
};

module.exports.prices = {
  getBinancePrice,
  getCoinGeckoPrice,
};
