// import React, { useState, useEffect, useMemo, Fragment } from "react";
// import axios from "axios";
// import {
//   parseChain,
//   parseToken,
//   parsePriceHistory,
//   parseMarketCap,
//   parseLiquidity,
//   calculateTimePosted,
//   calculateMultiplier,
// } from "../lib/parsers";
// import Select from 'react-select';
// import Footer from "../components/Footer";
// import isWhitelisted from "../lib/whitelistedAddresses";
// import AccessDenied from "../components/AccessDenied";
// import marketerChannels from "../lib/marketerChannels";
// import { redirect } from "next/dist/server/api-utils";
// import {
//   generateTableData,
//   SortMyData,
//   stripEmojis,
//   sortByOptions,
//   columns,
//   DropDownandSearchbar,
//   TableTopBar,
//   MobileOptionColumn,
//   OptionColumn,
//   MobileColumnFixed,
// } from "./helper";
// import SpaceBackground from "../public/SPACE-background.svg";
// import Sidebar from "../components/Sidebar";
// import Nav from "../components/Nav";
// import Image from 'next/image';

// function Table() {
//   const [address, setAddress] = useState("");
//   const [whitelisted, setWhitelisted] = useState(false);
//   const [listItems, setListItems] = useState([]);
//   const [channelNames, setChannelNames] = useState(
//     marketerChannels.map((each) => each.name)
//   );
//   const [sortBy, setSortBy] = useState({ value: "postedRaw", label: "Age" });
//   const [sortByOrder, setSortByOrder] = useState({
//     value: "postedRaw",
//     order: "desc",
//   });
//   const [filter, setFilter] = useState({ value: "all", label: "All" });
//   const [chainFilter, setChainFilter] = useState("ETH");
//   const [columnOne, setColumnOne] = useState({
//     value: "liquidity",
//     label: "Liquidity",
//   });
//   const [columnTwo, setColumnTwo] = useState({
//     value: "priceHistory12HrValue",
//     label: "12 hr",
//   });
//   const [columnThree, setColumnThree] = useState({
//     value: "multiplier",
//     label: "Multiplier",
//   });
//   const [columnFour, setColumnFour] = useState({
//     value: "marketCap",
//     label: "Market Cap",
//   });
//   const [columnFive, setColumnFive] = useState({
//     value: "channel_name",
//     label: "Channel Name",
//   });
//   const [columnSix, setColumnSix] = useState({
//     value: "priceHistory24HrValue",
//     label: "24 hr",
//   });
//   const [columnSeven, setColumnSeven] = useState({
//     value: "priceHistory1HrValue",
//     label: "1 hr",
//   });
//   const [searchFilter, setSearchFilter] = useState("");
//   const [searchValue, setSearchValue] = useState("");
//   const [data, setData] = useState([]); // <--- was supposed to passed as a ss prop

//   const ReactSelectStyle = {
//     control: (baseStyles, state) => ({
//       ...baseStyles,
//       border: "1px solid white",
//       borderRadius: 42,
//       backgroundColor: "transparent",
//       height: "3rem",
//     }),
//     singleValue: (baseStyles, state) => ({
//       ...baseStyles,
//       color: "white",
//     }),
//     input: (baseStyles, state) => ({
//       ...baseStyles,
//       color: "white",
//       caretColor: "white",
//     }),
//     placeholder: (baseStyles, state) => ({
//       ...baseStyles,
//       color: "#7E8492",
//     }),
//     menu: (baseStyles, state) => ({
//       ...baseStyles,
//       paddingTop: 10,
//       paddingBottom: 10,
//       backgroundColor: "#131527",
//     }),
//     option: (baseStyles, state) => ({
//       ...baseStyles,
//       color: state.isFocused ? "black" : state.isSelected ? "white" : "#7E8492",
//     }),
//   };

//   const ReactSelectStyleSm = {
//     ...ReactSelectStyle,
//     control: (baseStyles, state) => ({
//       ...baseStyles,
//       borderColor: "transparent",
//       backgroundColor: "transparent",
//     }),
//   };

//   useEffect(() => {
//     async function foo() {
//       const res = await axios.get(
//         `/api/get-calls?chain=${
//           chainFilter == "ETH" ? "ether" : "bsc"
//         }&channel_name=All`
//       );
//       setData(JSON.parse(res.data));
//     }
//     foo();
//     var interval = setInterval(foo, 30000);

//     return () => clearInterval(interval);
//   }, [chainFilter]);

//   const parsedData = useMemo(() => {
//     if (whitelisted) {
//       if (data)
//         return data.map((item) => {
//           const {
//             _id,
//             id: posted, //time in ms
//             channel_name,
//             channel_link,
//             pair_name,
//             chain,
//             multiplier,
//             initialMarketCap,
//             lastUpdated,
//             liquidity,
//             marketCap,
//             priceHistory,
//             contract,
//           } = item;
//           return {
//             _id,
//             id: posted,
//             initialMarketCap: initialMarketCap || null,
//             marketCapValueRaw: marketCap || null,
//             chain: parseChain(chain),
//             token: parseToken(pair_name),
//             liquidityValueRaw: liquidity || null,
//             liquidity: parseLiquidity(liquidity) || null,
//             priceHistory5MinValueRaw:
//               parsePriceHistory(priceHistory).fiveMinValueRaw || null,
//             priceHistory5MinValue:
//               parsePriceHistory(priceHistory).five_min_value || null,
//             priceHistory1HrValueRaw:
//               parsePriceHistory(priceHistory).oneHourValueRaw || null,
//             priceHistory1HrValue:
//               parsePriceHistory(priceHistory).one_hour_value || null,
//             priceHistory12HrValueRaw:
//               parsePriceHistory(priceHistory).twelveHourValueRaw || null,
//             priceHistory12HrValue:
//               parsePriceHistory(priceHistory).twelve_hour_value || null,
//             priceHistory24HrValueRaw:
//               parsePriceHistory(priceHistory).twentyfourHourValueRaw || null,
//             priceHistory24HrValue:
//               parsePriceHistory(priceHistory).twentyfour_hour_value || null,
//             priceHistoryColor: parsePriceHistory(priceHistory).color,
//             multiplier:
//               calculateMultiplier(marketCap, initialMarketCap) || null,
//             marketCap: parseMarketCap(marketCap),
//             channel_link,
//             channel_name,
//             channel_name_no_emojis: stripEmojis(channel_name),
//             posted: calculateTimePosted(posted),
//             postedRaw: posted, // For clear logic
//             contract,
//           };
//         });
//     } else {
//       return [];
//     }
//   }, [data, whitelisted]);

//   function openInDexscreener(item) {
//     if (chainFilter == "ETH") {
//       window.open("https://dexscreener.com/ethereum/" + item.contract);
//     } else {
//       window.open("https://dexscreener.com/bsc/" + item.contract);
//     }
//   }

//   // function sortData(arrayOfParsedData, sort, order) {
//   //   let arrayOfFilteredData = SortMyData(arrayOfParsedData, sort, order);

//   //   if (chainFilter) {
//   //     arrayOfFilteredData = arrayOfParsedData.filter(
//   //       (item) => item.chain === chainFilter
//   //     );
//   //   }

//   //   if (filter.value !== "all")
//   //     arrayOfFilteredData = arrayOfFilteredData.filter(
//   //       (item) => item.channel_name === filter.value
//   //     );
//   //   else {
//   //     arrayOfFilteredData = arrayOfFilteredData.filter((item) =>
//   //       channelNames.includes(item.channel_name)
//   //     );
//   //   }
//   //   if (searchFilter)
//   //     arrayOfFilteredData = arrayOfFilteredData.filter((item) => {
//   //       const { token } = item;
//   //       if (token)
//   //         return item.token
//   //           .toLowerCase()
//   //           .includes(searchFilter.toLocaleLowerCase());
//   //     });

//   //   return arrayOfFilteredData;
//   // }
//   function sortData(arrayOfParsedData, sort, order) {

//     console.log(sort, order, 'sortData Now');

//     arrayOfParsedData.sort((item1, item2) => {
//       if (sort === "channel_name_no_emojis" || sort === "token") {
//         if (item1[sort] && item2[sort]) {
//           if (item1[sort].toUpperCase() < item2[sort].toUpperCase())
//             return order === "asc" ? -1 : 1;
//           if (item1[sort].toUpperCase() > item2[sort].toUpperCase())
//             return order === "asc" ? 1 : -1;
//         }
//       }

//       if (sort === "id") {
//         if (item1[sort] > item2[sort]) return order === "asc" ? -1 : 1;
//         if (item1[sort] < item2[sort]) return order === "asc" ? 1 : -1;
//         return 0;
//       }

//       if ( // for decimal values
//         sort === "priceHistory5MinValueRaw" ||
//         sort === "priceHistory1HrValueRaw" ||
//         sort === "priceHistory12HrValueRaw" ||
//         sort === "priceHistory24HrValueRaw" ||
//         sort === "marketCapValueRaw" ||
//         sort === "liquidityValueRaw"
//       ) {
//         if (item1[sort] == null) return order === "asc" ? -1 : 1;
//         if (item2[sort] == null) return order === "asc" ? 1 : -1;
//       }

//       if(sort === "multiplier") {
//         if (item1[sort] == null || item1[sort] > 50000) return order === "asc" ? -1 : 1;
//         if (item2[sort] == null || item2[sort] > 50000) return order === "asc" ? 1 : -1;
//       }

//       if (item1[sort] < item2[sort]) return order === "asc" ? -1 : 1;
//       if (item1[sort] > item2[sort]) return order === "asc" ? 1 : -1;
//       return 0;
//     });

//     let arrayOfFilteredData = [...arrayOfParsedData];

//     if (chainFilter) {
//       arrayOfFilteredData = arrayOfParsedData.filter(
//         (item) => item.chain === chainFilter
//       );
//     }

//     if (filter !== "all")
//       arrayOfFilteredData = arrayOfFilteredData.filter(
//         (item) => item.channel_name === filter
//       );
//     else {
//       arrayOfFilteredData = arrayOfFilteredData.filter(
//         (item) => channelNames.includes(item.channel_name)
//       );
//     }
//     if (searchFilter)
//       arrayOfFilteredData = arrayOfFilteredData.filter((item) => {
//         const { token } = item;
//         if (token)
//           return item.token
//             .toLowerCase()
//             .includes(searchFilter.toLocaleLowerCase());
//       });
    
//     return arrayOfFilteredData;
//   }
//   useEffect(() => {
//     setWhitelisted(isWhitelisted(address));
//   }, [address]);
//   useEffect(() => {
//     const sortedData = sortData(parsedData, sortBy.value, sortBy.order);
//     setListItems(sortedData);
//     /*eslint-disable */
//   }, [parsedData, sortBy, filter, searchFilter, chainFilter]);

//   function handleChainFilterClick(chain) {
//     setChainFilter(chain);
//   }

//   function handleSortClick(value) {
//     if (sortBy.value === value) {
//       setSortBy({
//         value: sortBy.value,
//         order: sortBy.order === "asc" ? "desc" : "asc",
//       });
//     } else setSortBy({ value, order: "asc" });
//   }

//   function handleChannelSelect(channelName) {
//     setFilter(channelName);
//   }

//   function handleSortBySelect(sortByOption) {
//     var order = "desc";
//     if (
//       sortByOption.value === "id" ||
//       sortByOption.value === "channel_name_no_emojis"
//     )
//       order = "asc";
//     setSortBy(sortByOption);
//     setSortByOrder({ valu: sortByOption.value, order });
//   }

//   function getSortByOption(value) {
//     for (let i = 0; i < sortByOptions.length; i++)
//       if (sortByOptions[i].value == value) return sortByOptions[i];
//   }

//   function handleChange(e) {
//     setSearchValue(e.target.value);
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//     setSearchFilter(searchValue);
//   }

//   function priceHistoryColor(listItem, column) {
//     if (
//       column === "priceHistory5MinValue" ||
//       column === "priceHistory1HrValue" ||
//       column === "priceHistory12HrValue" ||
//       column === "priceHistory24HrValue"
//     )
//       return listItem[`${column}Raw`] > 0
//         ? "text-green-600"
//         : listItem[`${column}Raw`] < 0
//         ? "text-red-600"
//         : "text-regal-white";
//   }

//   return (
//     <div className="overflow-x-clip">
//       <section className="w-full flex justify-center relative">
//         <Image
//           src={SpaceBackground}
//           alt="space"
//           className="absolute top-0 left-0 min-h-[75vh] max-w-[100vw] object-cover opacity-75 z-0"
//         />
//         <Sidebar key={process.env.API_KEY} address={address} setAddress={setAddress}/>
//         <Nav table={true} />
//         <div className="flex items-center flex-col w-full mt-28">
//           <h3 className="fade-in-text text-5xl text-center font-extrabold text-regal-white mb-[0.75rem] xl:mb-[2rem] 2xl:mb-[2rem] ">
//             Welcome to Apollo
//           </h3>
//           <p className="fade-in-text sm:w-4/5 md:w-3/5 text-2xl text-center leading-[150%] text-regal-white mb-[1.5rem] xl:mb-[2.25rem] 2xl:mb-[2.25rem] ">
//             Here you can follow the latest calls and metrics from across all of
//             our tracked channels
//           </p>
//           <p className="fade-in-text text-2xl text-center leading-[150%] text-regal-white mb-[2rem] xl:mb-[3.25rem] 2xl:mb-[3.25rem]">
//             Select one of the chains below
//           </p>
//           {/* Cards */}
//           <div
//             id="cards"
//             className="flex flex-row gap-[1.25rem] md:gap-[2.5rem] mb-[2rem] md:mb-[4rem]"
//           >
//             <div
//               onClick={() => handleChainFilterClick("BSC")}
//               className={`card ${
//                 chainFilter === "BSC"
//                   ? "bg-[#E2AA1A]/[0.4]"
//                   : "bg-[#E2AA1A]/[0.2]"
//               } w-[108px] h-[108px] md:w-[234px] md:h-[80px] flex flex-col md:flex-row justify-center items-center cursor-pointer backdrop-blur-sm`}
//             >
//               <Image
//                 src="/binance.png"
//                 alt="binance"
//                 width={100}
//                 height={100}
//                 className="w-[40px] h-[40px] md:w-[54px] md:h-[54px] mb-[12px] md:mb-0"
//               />
//               <p className="fade-in-text sm:w-4/5 md:w-3/5 text-2xl md:text-xl text-center leading-[150%] font-[600] text-regal-white">
//                 Smart Chain
//               </p>
//             </div>
//             <div
//               onClick={() => handleChainFilterClick("ETH")}
//               className={`card ${
//                 chainFilter === "ETH"
//                   ? "bg-[#376996]/[0.4]"
//                   : "bg-[#376996]/[0.2]"
//               } w-[108px] h-[108px] md:w-[234px] md:h-[80px] flex flex-col md:flex-row justify-center font-[600] items-center backdrop-blur-sm cursor-pointer`}
//             >
//               <Image
//                 src="/ethereum.png"
//                 alt="eth"
//                 width={100}
//                 height={100}
//                 className="w-[25px] h-[42px] md:w-[41px] md:h-[67px] mb-[12px] md:mb-0"
//               />
//               <p className="fade-in-text sm:w-4/5 md:w-3/5 text-2xl md:text-xl text-center leading-[150%] font-[600] text-regal-white">
//                 Ethereum
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/*table*/}

//       {
//         <div className="bg-[#131527] mx-4 mb-[27px] md:mb-[74px] p-[1.5rem] md:p-[2rem] rounded-3xl">
//           <div
//             id="topbar"
//             className="flex justify-start items-center mb-[1.25rem]"
//           >
//             <h4 className="fade-in-text text-3xl text-center font-extrabold text-regal-white">
//               Latest Calls
//             </h4>
//           </div>
//           {/* dropdowns and search */}
//           <div className="flex flex-col lg:flex-row lg:gap-4 lg:mb-4">
//             <div className="flex justify-between gap-4 mb-[10px] lg:w-1/2" style={{zIndex:4}}>
//               <div className="w-1/2">
//                 <label
//                   htmlFor={"countries"}
//                   className="block mb-2 text-[1rem] sm:text-[1.5rem] lg:text-[1rem] text-[#BEBFC2] dark:text-white"
//                 >
//                   Marketing Channel
//                 </label>
//                 <Select
//                   id="countries"
//                   defaultValue={filter}
//                   value={filter}
//                   onChange={(v) => handleChannelSelect(v)}
//                   options={channelNames.map(each => ({value: each, label: each}))}
//                   styles={ReactSelectStyle}
//                 />
//               </div>
//               <div className="w-1/2">
//                 <label
//                   htmlFor={"sortBy"}
//                   className="block mb-2 text-[1rem] sm:text-[1.5rem] lg:text-[1rem] text-[#BEBFC2] dark:text-white"
//                 >
//                   Sort
//                 </label>
//                 <Select
//                   id="sortby"
//                   defaultValue={sortBy}
//                   value={sortBy}
//                   onChange={(v) => handleSortBySelect(v)}
//                   options={sortByOptions.map(each => ({value: each.value, label: each.option}))}
//                   styles={ReactSelectStyle}
//                 />
//               </div>
//             </div>
//             <div className="w-full lg:w-1/2" style={{zIndex:4}}>
//               <form
//                 onSubmit={handleSubmit}
//                 className="flex flex-col lg:flex-row gap-4"
//               >
//                 <div className="lg:w-1/2">
//                   <label
//                     htmlFor={"search"}
//                     className="block mb-2 text-[1rem] sm:text-[1.5rem] lg:text-[1rem] text-[#BEBFC2] dark:text-white"
//                   >
//                     Search
//                   </label>
//                   <input
//                     id="search"
//                     type="text"
//                     placeholder="Search for a specific token"
//                     value={searchValue}
//                     onChange={handleChange}
//                     className="bg-transparent border-gray-300
//                             rounded-[50px] text-regal-white text-[1.25rem] lg:text-[1rem] input input-bordered w-full mb-[10px]"
//                   />
//                 </div>
//                 <button
//                   className="w-full py-2 bg-[#376996] border-gray-300
//                             rounded-[50px] font-semibold text-regal-white text-[1.25rem] mb-[20px]
//                             lg:w-1/2 lg:mt-[2rem]"
//                   onClick={handleSubmit}
//                 >
//                   Filter
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* list start mobile */}
//           <div className="p-4 w-full text-regal-white rounded-lg lg:hidden">
//             <div className="grid grid-cols-4 mb-1 gap-4 text-sm">
//               <div className="rounded-md flex items-center justify-start">
//                 CHAIN
//               </div>
//               <div className="rounded-md flex items-center justify-start">
//                 TOKEN
//               </div>
//             </div>
//             {/* list start */}
//             <div className="overflow-y-scroll overflow-scroller h-[60vh]">
//               {listItems.map((listItem, index) => {
//                 const {
//                   _id,
//                   chain,
//                   token,
//                   liquidity,
//                   priceHistory12HrValueRaw,
//                   priceHistory12HrValue,
//                   multiplier,
//                   marketCap,
//                   channel_link,
//                   channel_name,
//                   posted,
//                 } = listItem;
//                 return (
//                   <div
//                     key={index}
//                     className="collapse collapse-plus py-1 calls-items-border"
//                   >
//                     <input type="checkbox" />
//                     <div className="grid grid-cols-4 px-0 gap-4 collapse-title text-base">
//                       <div className="rounded-md flex items-center justify-start">
//                         {chain}
//                       </div>
//                       <div className="rounded-md flex items-center justify-start">
//                         {token}
//                       </div>
//                     </div>
//                     <div className="rounded-lg collapse-content grid grid-cols-2 gap-4 mb-2 bg-[#2A2F50]">
//                       <div className="flex flex-col items-start justify-start pt-4">
//                         <Select
//                           id="column_one"
//                           value={columnOne}
//                           onChange={(v) => setColumnOne(v)}
//                           options={columns.map(each => ({value: each.value, label: each.option.toUpperCase()}))}
//                           styles={ReactSelectStyleSm}
//                           // className="bg-transparent text-xs sm:text-md text-regal-white w-full mb-1"
//                           // className="border-none bg-transparent text-[#BEBFC2] border border-gray-300 text-regal-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         />
//                         <p
//                           className={`${priceHistoryColor(
//                             listItem,
//                             columnOne.value
//                           )} px-1 text-xl`}
//                         >
//                           listItem[columnOne.value]
//                         </p>
//                       </div>
//                       {/* new task open */}

//                       {/* new task end */}
//                       <div className="flex flex-col items-start justify-start pt-4">
//                         <Select
//                           id="column_two"
//                           defaultValue={columnTwo}
//                           value={columnTwo}
//                           onChange={(v) => setColumnTwo(v)}
//                           options={columns.map(each => ({value: each.value, label: each.option.toUpperCase()}))}
//                           styles={ReactSelectStyleSm}
//                           className="bg-transparent text-xs sm:text-md text-regal-white w-full mb-1"
//                           // className="border-none bg-transparent text-[#BEBFC2] border border-gray-300 text-regal-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         />
//                         <p
//                           className={`${priceHistoryColor(
//                             listItem,
//                             columnTwo.value
//                           )} px-1 text-xl`}
//                         >
//                           listItem[columnTwo.value]
//                         </p>
//                       </div>
//                       <div className="flex flex-col items-start justify-start pt-4">
//                         <Select
//                           id="column_three"
//                           defaultValue={columnThree}
//                           value={columnThree}
//                           onChange={(v) =>
//                             setColumnThree(v)
//                           }
//                           options={columns.map(each => ({value: each.value, label: each.option.toUpperCase()}))}
//                           styles={ReactSelectStyleSm}
//                           className="bg-transparent text-xs sm:text-md text-regal-white w-full mb-1"
//                           // className="border-none bg-transparent text-[#BEBFC2] border border-gray-300 text-regal-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         />
//                         <p
//                           className={`${priceHistoryColor(
//                             listItem,
//                             columnThree.value
//                           )} px-1 text-xl`}
//                         >
//                           listItem[columnThree.value]
//                         </p>
//                       </div>
//                       <div className="flex flex-col items-start justify-start pt-4">
//                         <Select
//                           id="column_four"
//                           defaultValue={columnFour}
//                           value={columnFour}
//                           onChange={(v) =>
//                             setColumnFour(v)
//                           }
//                           options={columns.map(each => ({value: each.value, label: each.option.toUpperCase()}))}
//                           styles={ReactSelectStyleSm}
//                           className="bg-transparent text-xs sm:text-md text-regal-white w-full mb-1"
//                           // className="border-none bg-transparent text-[#BEBFC2] border border-gray-300 text-regal-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         />
//                         <p
//                           className={`${priceHistoryColor(
//                             listItem,
//                             columnFour.value
//                           )} px-1 text-xl`}
//                         >
//                           listItem[columnFour.value]
//                         </p>
//                       </div>
//                       <div className="flex flex-col items-start justify-start pt-4">
//                         <Select
//                           id="column_five"
//                           defaultValue={columnFive}
//                           value={columnFive}
//                           onChange={(v) =>
//                             setColumnFive(v)
//                           }
//                           options={columns.map(each => ({value: each.value, label: each.option.toUpperCase()}))}
//                           styles={ReactSelectStyleSm}
//                           className="bg-transparent text-xs sm:text-md text-regal-white w-full mb-1"
//                           // className="border-none bg-transparent text-[#BEBFC2] border border-gray-300 text-regal-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         />
//                         <p
//                           className={`${priceHistoryColor(
//                             listItem,
//                             columnFive.value
//                           )} px-1 text-xl`}
//                         >
//                           {listItem[columnFive.value]}
//                         </p>
//                       </div>
//                       <div className="flex flex-col items-start justify-start pt-4">
//                         <p className="px-1 w-full mb-1 text-xs sm:text-md">
//                           POSTED
//                         </p>
//                         <p className="px-1 text-xl">{posted}</p>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//               {!whitelisted && (
//                 <AccessDenied header="Not Whitelisted" message="Please connect a whitelisted wallet. If you are not on the whitelist, you can access this page on Friday, November 25th."></AccessDenied>
//               )}
//             </div>
//             {/* list end */}
//           </div>

//           {/* list start desktop */}
//           <div className="text-left w-full text-regal-white hidden lg:block">
//             <div className="grid grid-flow-col auto-cols-fr mb-1 gap-4 text-xs">
//               <div className="rounded-md flex items-center justify-start cursor-pointer">
//                 CHAIN
//               </div>
//               <div className="rounded-md flex items-center justify-start cursor-pointer">
//                 TOKEN
//               </div>
//               <div className="col-span-2">
//                 <Select
//                   id="column_one"
//                   defaultValue={columnOne}
//                   value={columnOne}
//                   onChange={(v) => setColumnOne(v)}
//                   options={columns.map(each => ({value: each.value, label: each.option.toUpperCase()}))}
//                   styles={ReactSelectStyleSm}
//                   // className="border-none bg-transparent text-regal-white cursor-pointer text-xs block w-full p-2.5 pl-0"
//                 />
//               </div>
//               <div className="col-span-2">
//                 <Select
//                   id="column_seven"
//                   defaultValue={columnSeven}
//                   value={columnSeven}
//                   onChange={(v) => setColumnSeven(v)}
//                   options={columns.map(each => ({value: each.value, label: each.option.toUpperCase()}))}
//                   styles={ReactSelectStyleSm}
//                   // className="border-none bg-transparent text-regal-white cursor-pointer text-xs block w-full p-2.5  pl-0"
//                 />
//               </div>
//               <div className="col-span-2">
//                 <Select
//                   id="column_two"
//                   defaultValue={columnTwo}
//                   value={columnTwo}
//                   onChange={(v) => setColumnTwo(v)}
//                   options={columns.map(each => ({value: each.value, label: each.option.toUpperCase()}))}
//                   styles={ReactSelectStyleSm}
//                   // className="border-none bg-transparent text-regal-white cursor-pointer text-xs block w-full p-2.5  pl-0"
//                 />
//               </div>
//               {/* new task started */}
//               <div className="col-span-2">
//                 <Select
//                   id="column_six"
//                   defaultValue={columnSix}
//                   value={columnSix}
//                   onChange={(v) => setColumnSix(v)}
//                   options={columns.map(each => ({value: each.value, label: each.option.toUpperCase()}))}
//                   styles={ReactSelectStyleSm}
//                   // className="border-none bg-transparent text-regal-white cursor-pointer text-xs block w-full p-2.5  pl-0"
//                 />
//               </div>

//               {/* new task end */}
//               <div className="col-span-2">
//                 <Select
//                   id="column_three"
//                   defaultValue={columnThree}
//                   value={columnThree}
//                   onChange={(v) => setColumnThree(v)}
//                   options={columns.map(each => ({value: each.value, label: each.option.toUpperCase()}))}
//                   styles={ReactSelectStyleSm}
//                   // className="border-none bg-transparent text-[#BEBFC2] cursor-pointer text-xs block w-full p-2.5 pl-0"
//                 />
//               </div>
//               <div className="col-span-2">
//                 <Select
//                   id="column_four"
//                   defaultValue={columnFour}
//                   value={columnFour}
//                   onChange={(v) => setColumnFour(v)}
//                   options={columns.map(each => ({value: each.value, label: each.option.toUpperCase()}))}
//                   styles={ReactSelectStyleSm}
//                   // className="border-none bg-transparent text-regal-white cursor-pointer text-xs block w-full p-2.5  pl-0"
//                 />
//               </div>
//               <div className="col-span-2">
//                 <Select
//                   id="column_five"
//                   defaultValue={columnFive}
//                   value={columnFive}
//                   onChange={(v) => setColumnFive(v)}
//                   options={columns.map(each => ({value: each.value, label: each.option.toUpperCase()}))}
//                   styles={ReactSelectStyleSm}
//                   // className="border-none bg-transparent text-regal-white cursor-pointer text-xs block w-full p-2.5  pl-0"
//                 />
//               </div>
//               <div className="rounded-md flex items-center justify-start">
//                 POSTED
//               </div>
//             </div>
//             <div className="overflow-y-scroll overflow-scroller h-[60vh]">
//               {listItems.length !== 0 && 
//                 listItems.map((listItem) => {
//                   const {
//                     _id,
//                     chain,
//                     token,
//                     liquidity,
//                     priceHistory12HrValueRaw,
//                     priceHistory12HrValue,
//                     multiplier,
//                     marketCap,
//                     channel_link,
//                     channel_name,
//                     posted,
//                   } = listItem;

//                   return (
//                     <div
//                       key={_id}
//                       className="grid grid-flow-col auto-cols-fr py-3 gap-4 text-[15px] cursor-pointer hover:bg-[#191c32] transition-all px-2"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         openInDexscreener(listItem);
//                       }}
//                     >
//                       <div className="rounded-md flex items-center justify-start">
//                         {chain}
//                       </div>
//                       <div className="rounded-md flex items-center justify-start overflow-hidden">
//                         {token}
//                       </div>
//                       {generateTableData(listItem, columnOne.value)}
//                       {generateTableData(listItem, columnTwo.value)}
//                       {generateTableData(listItem, columnSix.value)}
//                       {generateTableData(listItem, columnSeven.value)}
//                       {generateTableData(listItem, columnThree.value)}
//                       {generateTableData(listItem, columnFour.value)}
//                       {generateTableData(listItem, columnFive.value)}
//                       <div className="rounded-md flex items-center justify-start">
//                         {posted}
//                       </div>
//                     </div>
//                   );
//                 })}
                
//                 {!whitelisted && (
//                   <AccessDenied header="Not Whitelisted" message="Please connect a whitelisted wallet using the sidebar. If you are not on the whitelist, you can access this page on Friday, November 25th."></AccessDenied>
//                 )}
//             </div>
//           </div>
//         </div>
//       }
//       <Footer />
//     </div>
//   );
// }

// export default Table;
