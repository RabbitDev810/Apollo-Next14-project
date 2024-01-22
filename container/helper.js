import Select from "react-select";
import { parseMoney } from "../lib/parsers";

export const stripEmojis = (str) =>
  str
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ""
    )
    .replace(/\s+/g, " ")
    .trim();

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
      columnData = listData.toString() + "%";
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
      <div className="col-span-2 flex items-center justify-start">
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

export const SortMyData = (arrayOfParsedData, sort, order) => {
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
  return arrayOfFilteredData;
};

export const sortByOptions = [
  { value: "liquidityValueRaw", option: "Liquidity" },
  { value: "priceHistory5MinValueRaw", option: "5 min" },
  { value: "priceHistory1HrValueRaw", option: "1 hr" },
  { value: "priceHistory12HrValueRaw", option: "12 hr" },
  { value: "priceHistory24HrValueRaw", option: "24 hr" },
  { value: "multiplier", option: "Multiplier" },
  { value: "marketCapValueRaw", option: "Market Cap" },
  { value: "channel_name_no_emojis", option: "Channel Name" },
  { value: "postedRaw", option: "Age" },
];

export const columns = [
  { value: "priceHistory5MinValue", option: "5 min" },
  { value: "priceHistory1HrValue", option: "1 hr" },
  { value: "priceHistory12HrValue", option: "12 hr" },
  { value: "priceHistory24HrValue", option: "24 hr" },
  { value: "marketCap", option: "Market Cap" },
  { value: "multiplier", option: "Multiplier" },
  { value: "liquidity", option: "Liquidity" },
  { value: "channel_name", option: "Channel Name" },
];

export const MobileColumnFixed = ({ name }) => {
  return (
    <div className="rounded-md flex items-center justify-start">{name}</div>
  );
};

export const MobileOptionColumn = ({
  id,
  ReactSelectStyleSm,
  column,
  columns,
  priceHistoryColor,
  listItem,
  setColumn,
}) => {
  let columnData = listItem[column];
  let color = "text-green-400";
  let status = false;

  if (
    column.value === "priceHistory5MinValue" ||
    column.value === "priceHistory1HrValue" ||
    column.value === "priceHistory12HrValue" ||
    column.value === "priceHistory24HrValue"
  ) {
    status = true;
    let listData = listItem[`${column.value}Raw`];
    if (listData !== null) {
      listData = listData.toFixed(2);
      listData = parseMoney(listData, 1)
      columnData = listData.toString()+"%";
    }
    if (listData < 0) {
      color = "text-red-400";
    } else if (listData === 0) {
      color = "text-regal-white";
    }
  }
  return (
    <div className="flex flex-col items-start justify-start pt-4">
      <Select
        id={id}
        value={column}
        onChange={(v) => setColumn(v)}
        options={columns.map((each) => ({
          value: each.value,
          label: each.option.toUpperCase(),
        }))}
        styles={ReactSelectStyleSm}
        // className="bg-transparent text-xs sm:text-md text-regal-white w-full mb-1"
        // className="border-none bg-transparent text-[#BEBFC2] border border-gray-300 text-regal-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />

      {status === false ? (
        <p
          className={`${priceHistoryColor(
            listItem,
            column.value
          )} px-1 text-xl cursor-pointer`}
          onClick={(event) => {
            if (column.value === "channel_name") {
              event.stopPropagation();
              window.open(listItem.channel_link);
            }
          }}
        >
          {listItem[column.value]}
        </p>
      ) : (
        <div className={`px-1 text-xl ${color}`}>
          {columnData === null || columnData === "" ? (
            <div className="w-[30%] bg-gray-400 h-[1px]"></div>
          ) : (
            columnData
          )}
        </div>
      )}
    </div>
  );
};

export const OptionColumn = ({
  id,
  column,
  setColumn,
  columns,
  ReactSelectStyleSm,
}) => {
  return (
    <div className="col-span-2">
      <Select
        id={id}
        defaultValue={column}
        value={column}
        onChange={(v) => setColumn(v)}
        options={columns.map((each) => ({
          value: each.value,
          label: each.option.toUpperCase(),
        }))}
        styles={ReactSelectStyleSm}
        // className="border-none bg-transparent text-regal-white cursor-pointer text-xs block w-full p-2.5 pl-0"
      />
    </div>
  );
};
