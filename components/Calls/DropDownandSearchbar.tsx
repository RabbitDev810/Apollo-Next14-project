import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { ReactSelectStyle } from "../../lib/reactselectstyles";
import marketerChannels from "../../lib/marketerChannels";
import { sortData } from "../../lib/calls/data";
import { ListItem } from "../../types/pages/calls";

const DropDownandSearchbar: React.FC<DropDownandSearchbarProps> = ({
  filter,
  handleChannelSelect,
  handleSubmit,
  parsedData,
  chainFilter,
  setListItems,
}) => {
  const [sortByOrder, setSortByOrder] = useState("desc"); // currently, sorting order has no select control.
  const [sortBy, setSortBy] = useState({ value: "postedRaw", label: "Age" });
  const [currentValue, setCurrentValue] = useState<string>("");
  const channelNames = marketerChannels.map((each) => each.name);
  const [documentation, setDocument] = useState(null);
  const inputRef = useRef(null);

  const sortByOptions = [
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

  function handleSortBySelect(sortByOption) {
    var order = "desc";
    if (
      sortByOption.value === "id" ||
      sortByOption.value === "channel_name_no_emojis"
    )
      order = "asc";
    setSortBy(sortByOption);
    setSortByOrder(order);
  }

  function applySearch() {
    if (inputRef.current) {
      const val = inputRef.current.value;
      setCurrentValue(val);
      handleSubmit(val);
    }
  }

  useEffect(() => {
    setDocument(document.querySelector("body"));
  }, []);

  //Sorting and filtering
  useEffect(() => {
    if (parsedData) {
      const sortedData = sortData(
        parsedData,
        sortBy.value,
        sortByOrder,
        chainFilter,
        filter,
        channelNames
      );
      let realData = [];
      if (currentValue != "" || currentValue !== null) {
        realData = sortedData.filter((item) => {
          if (item.token === null) {
            item.token = "";
          }
          return (
            item.channel_name
              .toLowerCase()
              .includes(currentValue.toLowerCase()) ||
            item.token.toLowerCase().includes(currentValue.toLowerCase())
          );
        });
      } else {
        realData = sortedData;
      }
      setListItems(realData);
    }
  }, [parsedData, sortBy, filter, chainFilter, currentValue]);

  return (
    <div className="flex flex-col lg:flex-row lg:gap-4 lg:mb-4">
      <div
        className="flex justify-between gap-4 mb-[10px] lg:w-1/2"
        style={{ zIndex: 4 }}
      >
        <div className="w-1/2">
          <label
            htmlFor={"countries"}
            className="block mb-2 text-[1rem] sm:text-[1.5rem] lg:text-[1rem] text-[#BEBFC2] dark:text-white"
          >
            Marketing Channel
          </label>
          <Select
            defaultValue={filter}
            value={filter}
            onChange={(v) => handleChannelSelect(v)}
            options={channelNames.map((each) => ({
              value: each,
              label: each,
            }))}
            styles={ReactSelectStyle}
            menuPortalTarget={documentation && documentation}
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor={"sortBy"}
            className="block mb-2 text-[1rem] sm:text-[1.5rem] lg:text-[1rem] text-[#BEBFC2] dark:text-white"
          >
            Sort
          </label>
          <Select
            defaultValue={sortBy}
            value={sortBy}
            onChange={(v) => handleSortBySelect(v)}
            options={sortByOptions.map((each) => {
              return {
                value: each.value,
                label: each.option,
              };
            })}
            styles={ReactSelectStyle}
            menuPortalTarget={documentation && documentation}
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <div
          // onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row gap-4"
        >
          <div className="lg:w-1/2">
            <label
              htmlFor={"search"}
              className="block mb-2 text-[1rem] sm:text-[1.5rem] lg:text-[1rem] text-[#BEBFC2] dark:text-white"
            >
              Search
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search for a specific token"
              ref={inputRef}
              // value={searchValue}
              // onChange={handleChange}
              className="bg-transparent border-gray-300
                                  rounded-[50px] text-regal-white text-[1.25rem] lg:text-[1rem] input input-bordered w-full mb-[10px]"
            />
          </div>
          <button
            className="w-full py-2 bg-[#376996] border-gray-300
                                  rounded-[50px] font-semibold text-regal-white text-[1.25rem] mb-[20px]
                                  lg:w-1/2 lg:mt-[2rem]"
            onClick={() => applySearch()}
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default DropDownandSearchbar;

interface OptionType {
  value: string;
  label: string;
}
interface DropDownandSearchbarProps {
  filter: OptionType;
  handleChannelSelect: (option: OptionType) => void;
  handleSubmit: (value: string) => void;
  chainFilter: string;
  parsedData: ListItem[];
  setListItems: (items: ListItem[]) => void;
}
