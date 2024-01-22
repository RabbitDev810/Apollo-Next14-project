import axios from "axios";

export async function getAndSetData(setData: any, chainFilter: string, channelName: string, filter: any, searchValue: string, callback: Function) {
    const res = await axios.get(`/api/get-calls?chain=${chainFilter == "ETH" ? "ether" : "bsc"}&channel_name=${channelName ? channelName : filter.value}&search=${searchValue}`);
    if (channelName) {
        callback(res.data);
    }
    setData(res.data);
}

export function sortData(arrayOfParsedData, sort, order, chainFilter: string, filter, channelNames: Array<string>) {
    arrayOfParsedData.sort((item1, item2) => {
      if (sort === "channel_name_no_emojis" || sort === "token") {
        if (item1[sort] && item2[sort]) {
          if (item1[sort].toUpperCase() < item2[sort].toUpperCase())
            return order === "asc" ? -1 : 1;
          if (item1[sort].toUpperCase() > item2[sort].toUpperCase())
            return order === "asc" ? 1 : -1;
        }
      }

      if (sort === "id") {
        if (item1[sort] > item2[sort]) return order === "asc" ? -1 : 1;
        if (item1[sort] < item2[sort]) return order === "asc" ? 1 : -1;
        return 0;
      }

      if (
        // for decimal values
        sort === "priceHistory5MinValueRaw" ||
        sort === "priceHistory1HrValueRaw" ||
        sort === "priceHistory12HrValueRaw" ||
        sort === "priceHistory24HrValueRaw" ||
        sort === "marketCapValueRaw" ||
        sort === "liquidityValueRaw"
      ) {
        if (item1[sort] == null) return order === "asc" ? -1 : 1;
        if (item2[sort] == null) return order === "asc" ? 1 : -1;
      }

      if (sort === "multiplier") {
        if (item1[sort] == null || item1[sort] > 50000)
          return order === "asc" ? -1 : 1;
        if (item2[sort] == null || item2[sort] > 50000)
          return order === "asc" ? 1 : -1;
      }

      if (item1[sort] < item2[sort]) return order === "asc" ? -1 : 1;
      if (item1[sort] > item2[sort]) return order === "asc" ? 1 : -1;
      return 0;
    });

    let arrayOfFilteredData = [...arrayOfParsedData];

    if (chainFilter) {
      arrayOfFilteredData = arrayOfParsedData.filter(
        (item) => item.chain === chainFilter
      );
    }

    if (filter.value !== "all")
      arrayOfFilteredData = arrayOfFilteredData.filter(
        (item) => item.channel_name === filter.value
      );
    else {
      arrayOfFilteredData = arrayOfFilteredData.filter((item) =>
        channelNames.includes(item.channel_name)
      );
    }

    return arrayOfFilteredData;
  }