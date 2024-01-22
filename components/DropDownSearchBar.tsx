import Select from "react-select";
import {RefObject, MouseEventHandler } from 'react'
 
interface FilterType {
  value: string;
  label: string;
}

interface sortByType {
  value: string;
  order: string;
}

interface SortOption {
  value: string;
  option: string;
}

interface Props {
  filter: FilterType;
  handleChannelSelect:(channelName: FilterType) => void; 
  channelNames: string[];
  ReactSelectStyle: any
  documentation: HTMLElement | null;
  sortBy: sortByType;
  handleSortBySelect: (sortBy: sortByType) => void; 
  sortByOptions: SortOption[]
  inputRef:  RefObject<HTMLInputElement> | null;
  handleSubmit:(event: any) => void;
}


export const DropDownandSearchbar: React.FC<Props> = ({
      filter,
      handleChannelSelect,
      channelNames,
      ReactSelectStyle,
      documentation,
      sortBy,
      handleSortBySelect,
      sortByOptions,
      inputRef,
      handleSubmit
    }) => {
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
              id="countries"
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
              id="sortby"
              defaultValue={sortBy}
              value={sortBy}
              onChange={(v) => handleSortBySelect(v)}
              options={sortByOptions.map((each) => ({
                value: each.value,
                order: each.option,
              }))}
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
              onClick={handleSubmit}
            >
              Filter
            </button>
          </div>
        </div>
      </div>
    );
  };