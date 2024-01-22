import { parseMoney } from "../parsers";

export const stripEmojis = (str: string) =>
    str
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ""
      )
      .replace(/\s+/g, " ")
      .trim();

export function openInDexscreener(item, chainFilter: string) {
    if (chainFilter == "ETH") {
        window.open("https://dexscreener.com/ethereum/" + item.contract);
    } else {
        window.open("https://dexscreener.com/bsc/" + item.contract);
    }
}

export function priceHistoryColor(listItem, column) {
    if (
      column === "priceHistory5MinValue" ||
      column === "priceHistory1HrValue" ||
      column === "priceHistory12HrValue" ||
      column === "priceHistory24HrValue"
    )
      return listItem[`${column}Raw`] > 0
        ? "text-green-600"
        : listItem[`${column}Raw`] < 0
        ? "text-red-600"
        : "text-regal-white";
}

export function generateTableData(listItem, column) {
    if (
      column === "priceHistory5MinValue" ||
      column === "priceHistory1HrValue" ||
      column === "priceHistory12HrValue" ||
      column === "priceHistory24HrValue"
    ) {
      let listData = listItem[`${column}Raw`];
      let columnData = null;
      if (listData !== null) {
        listData = listData.toFixed(2);
        listData = parseMoney(listData, 1)
        columnData = listData.toString()+"%";
      }
      let color = "text-green-400";
      if (listData < 0) {
        color = "text-red-400";
      } else if (listData === 0) {
        color = "text-regal-white";
      }
      return (
        <div className={`col-span-2 flex items-center justify-start ${color}`}>
          {columnData === null ? (
            <div className="w-[30%] bg-gray-400 h-[1px]"></div>
          ) : (
            columnData
          )}
        </div>
      );
    }
    if (column === "channel_name") {
      // <div className="col-span-2 flex items-center justify-start">
      //   <a href={listItem["channel_link"]}>{listItem[column]}</a>
      // </div>;
      return (
        <div className="col-span-2 flex items-center justify-start" onClick={(event) => {
          event.stopPropagation();
          window.open(listItem.channel_link)
        }}>
          {stripEmojis(listItem[column])}
        </div>
      );
    }
    if (column === "multiplier") {
      const value =
        listItem[column] < 0 ? 0 : listItem[column] ? listItem[column] : 0;

      return (
        <div className={`col-span-2 flex items-center justify-start`}>
          {value > 50000 ? (
            <div className="w-[30%] bg-gray-400 h-[1px]"></div>
          ) : (
            value + "X"
          )}
        </div>
      );
    }

    return (
      <div className="col-span-2 flex items-center justify-start">
        {listItem[column] === null || listItem[column] === undefined ? (
          <div className="w-[30%] bg-gray-400 h-[1px]"></div>
        ) : (
          listItem[column]
        )}
      </div>
    );
  }