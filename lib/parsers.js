export function parseChain(chain) {
  switch (chain) {
    case "ether":
      return "ETH";
      break;
    case "bsc":
      return "BSC";
      break;
  }
}

export function parseToken(token) {
  console.log(token)
  if (!token || token == null || token == "null") return null;
  if (token === '{"message":"Internal Server Error"}') return null;
  //if(token == null || token == "null") return null
  const tokenArray = token.split("/");
  if (
    tokenArray[0] == "WETH" ||
    tokenArray[0] == "USDC" ||
    tokenArray[0] == "USDT" ||
    tokenArray[0] == "MATIC" ||
    tokenArray[0] == "WBNB"
  )
    return tokenArray[1];
  if (
    tokenArray[1] == "WETH" ||
    tokenArray[1] == "USDC" ||
    tokenArray[1] == "USDT" ||
    tokenArray[1] == "MATIC" ||
    tokenArray[1] == "WBNB"
  )
    return tokenArray[0];
}

export function parsePriceHistory(priceHistory) {
  if (priceHistory) {
    //can remove this later when we are sure that every item in the db has a price history attr
    const five_min_value = priceHistory["5min"];
    const one_hour_value = priceHistory["1hr"];
    const twelve_hour_value = priceHistory["12hr"];
    const twentyfour_hour_value = priceHistory["24hr"];

    const five_min_rounded =
      Math.round((five_min_value + Number.EPSILON) * 100) / 100;
    const one_hour_rounded =
      Math.round((one_hour_value + Number.EPSILON) * 100) / 100;
    const twelve_hour_rounded =
      Math.round((twelve_hour_value + Number.EPSILON) * 100) / 100;
    const twentyfour_hour_rounded =
      Math.round((twentyfour_hour_value + Number.EPSILON) * 100) / 100;

    return {
      fiveMinValueRaw: five_min_value,
      oneHourValueRaw: one_hour_value,
      twelveHourValueRaw: twelve_hour_value,
      twentyfourHourValueRaw: twentyfour_hour_value,

      five_min_value: `${
        parseMoney(five_min_rounded, 1)
      }%`,
      one_hour_value: `${
        parseMoney(one_hour_rounded, 1)
      }%`,
      twelve_hour_value: `${
        parseMoney(twelve_hour_rounded, 1)
      }%`,
      twentyfour_hour_value: `${
        parseMoney(twentyfour_hour_rounded, 1)
      }%`,
    };
  } else
    return {
      fiveMinValueRaw: null,
      oneHourValueRaw: null,
      twelveHourValueRaw: null,
      twentyfourHourValueRaw: null,
      five_min_value: null,
      one_hour_value: null,
      twelve_hour_value: null,
      twentyfour_hour_value: null,
      color: "text-regal-white",
    };
}

export function parseMarketCap(marketCap) {
  if (marketCap)
    // can remove once confirmed that each item in db has this attr
    return `$${parseMoney(
      Math.round((marketCap + Number.EPSILON) * 100) / 100, 2
    )}`;
}

export function parseMoney(amount, fixed) {
  if(isNaN(Number(amount))) return
  if (amount < 1000) return amount.toString();
  if (amount < 0.0000001) return 0;
  if (amount > 1.0e12 || amount < -1.0e12) {
    try {
      return amount.toExponential(0)
    } catch {
      return 0
    }
  }
  return Math.abs(Number(amount)) >= 1.0e9
    ? (Math.abs(Number(amount)) / 1.0e9).toFixed(fixed) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(amount)) >= 1.0e6
    ? (Math.abs(Number(amount)) / 1.0e6).toFixed(fixed) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(amount)) >= 1.0e3
    ? (Math.abs(Number(amount)) / 1.0e3).toFixed(fixed) + "K"
    : Math.abs(Number(amount)).toFixed(2);
}

export function parseLiquidity(liquidity) {
  if (liquidity) {
    // can remove once confirmed that each item in db has value for this attr
    return `$${parseMoney(liquidity, 2)}`;
  }
}

export function calculateTimePosted(postedTime) {
  console.log("Posted Time: " + postedTime)
  let timeInSeconds = (Date.now() / 1000) - postedTime;
  if (timeInSeconds < 60) return `${timeInSeconds.toFixed(2)} seconds`;

  const timeInMinutes = Math.floor(timeInSeconds / 60);
  if (timeInMinutes < 60) return `${timeInMinutes} mins`;

  const timeInHours = Math.floor(timeInMinutes / 60);
  if (timeInHours < 24) return `${timeInHours} hrs`;

  const timeInDays = Math.floor(timeInHours / 24);
  if (timeInDays < 31) return `${timeInDays} days`;

  const timeInMonths = Math.floor(timeInDays / 30);
  if (timeInMonths < 12) return `${timeInMonths} months`;

  const timeInYears = Math.floor(timeInMonths / 12);
  return `${timeInYears} year${timeInYears === 1 ? "" : "s"} `;
}

export function calculateMultiplier(marketCap, initialMarketCap) {
  if (initialMarketCap && marketCap) {
    return (
      Math.round((marketCap / initialMarketCap + Number.EPSILON) * 100) / 100
    );
  }
}
