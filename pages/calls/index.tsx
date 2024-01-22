import MobileTable from '../../components/Calls/MobileTable';
import DesktopTable from '../../components/Calls/DesktopTable';
import TableTopBar from '../../components/Calls/TableTopBar';
import DropDownandSearchbar from '../../components/Calls/DropDownandSearchbar';

import React, { useState, useEffect, useMemo } from "react";
import {
	parseChain,
	parseToken,
	parsePriceHistory,
	parseMarketCap,
	parseLiquidity,
	calculateTimePosted,
} from "../../lib/parsers";
import Footer from "../../components/Footer";
import { TopSection } from "../../components/callsComponent/topSection";
import AuthModal from "../../components/Auth/auth-modal";
import { priceHistoryColor } from "../../lib/calls/helpers";
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
//import VoteButton from "../../components/UpvoteButton";
import { ListItem } from "../../types/pages/calls";
import { TelegramCallsManager, TokenData } from '../../lib/calls/TelegramCallsManager';

interface DropdownItem {
	value: string;
	label: string;
}

const Calls = ({ session, channelName, callback }) => {
  const [address, setAddress] = useState("");
  const [whitelisted, setWhitelisted] = useState(false);

  const user = session?.user || null
  
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [filter, setFilter] = useState<DropdownItem>({ value: "all", label: "All" });
  const [chainFilter, setChainFilter] = useState("ETH");
  const [columnOne, setColumnOne] = useState({
    value: "liquidity",
    label: "Liquidity",
  });
  const [columnTwo, setColumnTwo] = useState({
    value: "priceHistory1HrValue",
    label: "1 hr",
  });
  const [columnThree, setColumnThree] = useState({
    value: "priceHistory12HrValue",
    label: "12 hr",
  });
  const [columnFour, setColumnFour] = useState({
    value: "priceHistory24HrValue",
    label: "24 hr",
  });
  const [columnFive, setColumnFive] = useState({
    value: "multiplier",
    label: "Multiplier",
  });
  const [columnSix, setColumnSix] = useState({
    value: "marketCap",
    label: "Market Cap",
  });
  const [columnSeven, setColumnSeven] = useState({
    value: "channel_name",
    label: "Channel Name",
  });
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState<TokenData[]>(); // <--- was supposed to passed as a ss prop

  const ReactSelectStyle = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      border: "1px solid white",
      borderRadius: 42,
      backgroundColor: "transparent",
      height: "3rem",
    }),
    singleValue: (baseStyles, state) => ({
      ...baseStyles,
      color: "white",
    }),
    input: (baseStyles, state) => ({
      ...baseStyles,
      color: "white",
      caretColor: "white",
    }),
    placeholder: (baseStyles, state) => ({
      ...baseStyles,
      color: "#7E8492",
    }),
    menu: (baseStyles, state) => ({
      ...baseStyles,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: "#131527",
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      color: state.isFocused ? "black" : state.isSelected ? "white" : "#7E8492",
    }),

    menuPortal: provided => ({ ...provided, zIndex: 9999, backgroundColor: "#131527" }),
    //menu: provided => ({ ...provided, zIndex: 9999, backgroundColor: "#131527" })
  };

  const ReactSelectStyleSm = {
    ...ReactSelectStyle,
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: "transparent",
      backgroundColor: "transparent",
    }),
  };

	useEffect(() => {
		if (user) {
			console.log("User found")
			console.log(user)
			TelegramCallsManager.getCalls(filter.value, searchValue, 100)
			.then((result) => {
				setData(result)
			})
		} else {
			console.log("Please sign in")
		}
		var interval = setInterval(() => {
			TelegramCallsManager.getCalls(filter.value, searchValue, 100)
			.then((result) => {
				setData(result)
			})
		}, 30000);

		return () => clearInterval(interval);
	}, [chainFilter, filter, searchValue, user]);

	const parsedData: ListItem[] = useMemo(() => {
		if (whitelisted) {
			console.log(data)
			if (data && data.length > 0) {
				return data.map((item) => {
					console.log(item)
					const {
						id: posted, //time in secs
						channel_name,
						channel_link,
						pair_name,
						chain,
						initialMarketCap,
						lastUpdated,
						liquidity,
						marketCap,
						priceHistory,
						contract,
						votes,
						upvotes,
						downvotes,
						peak_multiplier
					} = item;

					return {
						_id: item.id,
						id: posted,
						initialMarketCap: initialMarketCap.toString() || null,
						marketCapValueRaw: marketCap.toString() || null,
						chain: parseChain(chain),
						token: parseToken(pair_name),
						liquidityValueRaw: liquidity.toString() || null,
						liquidity: parseLiquidity(liquidity) || null,
						priceHistory5MinValueRaw:
							parsePriceHistory(priceHistory).fiveMinValueRaw || null,
						priceHistory5MinValue:
							parsePriceHistory(priceHistory).five_min_value || null,
						priceHistory1HrValueRaw:
							parsePriceHistory(priceHistory).oneHourValueRaw || null,
						priceHistory1HrValue:
							parsePriceHistory(priceHistory).one_hour_value || null,
						priceHistory12HrValueRaw:
							parsePriceHistory(priceHistory).twelveHourValueRaw || null,
						priceHistory12HrValue:
							parsePriceHistory(priceHistory).twelve_hour_value || null,
						priceHistory24HrValueRaw:
							parsePriceHistory(priceHistory).twentyfourHourValueRaw || null,
						priceHistory24HrValue:
							parsePriceHistory(priceHistory).twentyfour_hour_value || null,
						priceHistoryColor: parsePriceHistory(priceHistory).color,
						multiplier: peak_multiplier.toString() || null,
						marketCap: parseMarketCap(marketCap),
						channel_link,
						channel_name,
						channel_name_no_emojis: channel_name,
						posted: calculateTimePosted(posted),
						postedRaw: posted, // For clear logic
						contract,
						votes: votes.toString(),
						upvote_status: upvotes == 1,
						downvote_status: downvotes == 1,
					};
				});
			}
		} else {
			return [];
		}
	}, [data, whitelisted]);

	useEffect(() => {
		// setWhitelisted(isWhitelisted(address));
		setWhitelisted(true);
	}, [address]);

	function handleChainFilterClick(chain) {
		setChainFilter(chain);
	}

	/*
	function handleSortClick(value) {
		if (sortBy.value === value) {
			setSortBy({
				value: sortBy.value,
				order: sortByOrder === "asc" ? "desc" : "asc",
			});
		} else setSortBy({ value, order: "asc" });
	}
	*/

	function handleChannelSelect(channelName) {
		setFilter(channelName);
	}

  /*
	const upvote = (index) => {
		handleVote(index, !listItems[index].upvote_status, true);
		const dummy = [...listItems];
		dummy[index].upvote_status = !dummy[index].upvote_status;
		dummy[index].upvote_status ? dummy[index].votes++ : dummy[index].votes--;
		if (
			dummy[index].upvote_status === true &&
			dummy[index].downvote_status === true
		) {
			dummy[index].downvote_status = false;
			dummy[index].votes++;
		}
		setListItems(dummy);
	};

	const downvote = (index) => {
		{
			handleVote(index, !listItems[index].downvote_status, false);
			const dummy = [...listItems];
			dummy[index].downvote_status = !dummy[index].downvote_status;
			dummy[index].downvote_status
				? dummy[index].votes--
				: dummy[index].votes++;
			if (
				dummy[index].upvote_status === true &&
				dummy[index].downvote_status === true
			) {
				dummy[index].upvote_status = false;
				dummy[index].votes--;
			}
			setListItems(dummy);
		}
	};

	const handleVote = async (index, add, upvote) => {
		const result = await axios.post("/api/vote", {
			address: listItems[index].contract,
			vote: upvote,
			add: add,
		});
		try {
		} catch (error) {
		}
	};
  */

	const columnSettings = {
		columnOne,
		columnTwo,
		columnThree,
		columnFour,
		columnFive,
		columnSix,
		columnSeven,
		setColumnOne,
		setColumnTwo,
		setColumnThree,
		setColumnFour,
		setColumnFive,
		setColumnSix,
		setColumnSeven,
	};

	return (
		<div className="overflow-x-clip">
			{typeof session == "undefined" && channelName === undefined && (
				<AuthModal></AuthModal>
			)}
			{!channelName && (
				<TopSection
					setAddress={setAddress}
					address={address}
					handleChainFilterClick={handleChainFilterClick}
					chainFilter={chainFilter}
					user={user}
				/>
			)}
			<div
				className={`bg-[#131527] z-10 relative mx-4 mb-[27px] md:mb-[${channelName ? "2px" : "74px"
					}] p-[1.5rem] md:p-[2rem] rounded-3xl`}
			>
				{!channelName && (
					<>
						<TableTopBar />
						<DropDownandSearchbar
							filter={filter}
							handleChannelSelect={handleChannelSelect}
							handleSubmit={setSearchValue}
							chainFilter={chainFilter}
							parsedData={parsedData}
							setListItems={setListItems}
						/>
					</>
				)}

				<MobileTable
					listItems={parsedData}
					columnSettings={columnSettings}
					priceHistoryColor={priceHistoryColor}
				/>
				<DesktopTable
					listItems={parsedData}
					columnSettings={columnSettings}
					chainFilter={chainFilter}
					channelName={channelName}
				/>
			</div>
			{channelName ? null : <Footer />}
		</div>
	);
};

export default Calls;

export const getServerSideProps = async ({ req, res }) => {
	const supabase = createPagesServerClient({ req, res })
	const {
		data: { session },
	} = await supabase.auth.getSession()


	if (session) {
		console.log("User found")
		const user = await supabase.from("users").select("*").eq("id", session.user.id).single()
		return {
			props: {
				session: {
					...session,
					user
				}
			}
		}
	} else {
		console.log("User not found")
		return {
			props: {}
		}
	}
}