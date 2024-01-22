import { createClient } from "@supabase/supabase-js";
const marketerChannels = require("../../../lib/marketerChannels");
import { SessionConnect } from "../../../lib/auth";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.SUPABASE_SECRET_KEY
);

const handler = async function (req, res) {
	const { session } = await SessionConnect({ req, res });
	//console.log({session})

	if (!session || !session["user"]) {
		return res.status(403).json({ error: "Unauthorized" });
	}

	if (req.method === "GET") {
		const { searchQuery } = req.query;

		// Retrieve channel names from marketerChannels
		const channelNames = marketerChannels.default.map(
			(channel) => channel.name
		);

		// Fetch data from Supabase
		const { data: telegramTokenData, error: telegramTokenError } =
			await supabase
				.from("TelegramTokenData")
				.select("channel_id, peak_multiplier");
		if (telegramTokenError)
			res
				.status(500)
				.json({ success: false, error: telegramTokenError.message });

		const { data: marketerData, error: marketerError } = await supabase
			.from("marketer_data")
			.select("channel_id");
		if (marketerError)
			res.status(500).json({ success: false, error: marketerError.message });

		// Perform left join and grouping
		const tokenData = telegramTokenData.map((token) => {
			const matchingMarketer = marketerData.find(
				(marketer) => marketer.channel_id === token.channel_id
			);
			return {
				channel_id: token.channel_id,
				peak_multiplier: token.peak_multiplier,
				marketer_data: matchingMarketer ? matchingMarketer : null,
			};
		});

		// Sum peak_multiplier
		const groupResult = calculateSumPeakMultiplier(tokenData);

		// Update marketer_data
		for (const item of groupResult) {
			const { count: countData, error: countError } = await supabase
				.from("TelegramTokenData")
				.select("channel_id")
				.eq("channel_id", item.channel_id);

			if (countError)
				res.status(500).json({ success: false, error: countError.message });

			const { error: marketersError } = await supabase
				.from("marketer_data")
				.update({ average_peak_multiplier: item.sum / countData })
				.eq("channel_id", item.channel_id);
		}

		if (marketersError)
			res.status(500).json({ success: false, error: marketerError.message });

		// Fetch final data
		const { data: telegramTokenDataFinal, error: telegramTokenErrorFinal } =
			await supabase
				.from("TelegramTokenData")
				.select("channel_name, channel_id, channel_link");
		if (telegramTokenErrorFinal)
			res
				.status(500)
				.json({ success: false, error: telegramTokenError.message });

		const { data: marketerDataFinal, error: marketerErrorFinal } =
			await supabase
				.from("marketer_data")
				.select("channel_id, average_peak_multiplier");
		if (marketerErrorFinal)
			res
				.status(500)
				.json({ success: false, error: marketerErrorFinal.message });

		// Filter and process data
		const uniqueChannelIds = new Set();
		const result_1 = telegramTokenDataFinal
			.map((telegramToken) => {
				const matchingChannel = marketerDataFinal.find(
					(marketer) => marketer.channel_id === telegramToken.channel_id
				);

				if (
					matchingChannel &&
					!uniqueChannelIds.has(telegramToken.channel_id)
				) {
					uniqueChannelIds.add(telegramToken.channel_id);
					const { channel_name, channel_id, channel_link } = telegramToken;
					const { average_peak_multiplier: average } = matchingChannel;
					return { channel_name, channel_id, channel_link, average };
				}

				return null;
			})
			.filter((result) => result !== null);

		// Filter based on searchQuery
		const result_2 = result_1.filter((result) => {
			const regex = new RegExp(result.channel_name, "i");
			return regex.test(searchQuery);
		});

		// Retrieve additional information for each marketer
		const marketers = await Promise.all(
			result_2.map(async (marketer) => {
				if (channelNames.includes(marketer.channel_name)) {
					const { count: counter1, error: countError } = await supabase
						.from("followed_marketers")
						.select("channel_id", { count: "exact", head: true })
						.eq("channel_id", marketer.channel_id);

					if (countError)
						res.status(500).json({ success: false, error: countError.message });

					const time = Date.now() / 1000 - 24 * 60 * 60 * 7;
					const int8Value = Math.round(time);
					const { count: counter2, error: callDataError } = await supabase
						.from("TelegramTokenData")
						.select("channel_id", { count: "exact", head: true })
						.eq("channel_id", marketer.channel_id)
						.gte("id", int8Value);

					if (callDataError)
						res
							.status(500)
							.json({ success: false, error: callDataError.message });

					return {
						...marketer,
						count: counter1,
						call: counter2,
					};
				}
				return null;
			})
		);

		// Filter out null values and send the response
		res.status(200).json(marketers.filter(Boolean));
	}
};

function calculateSumPeakMultiplier(arr) {
	const result = [];

	const sumMap = new Map();

	arr.forEach((item) => {
		const { channel_id, peak_multiplier } = item;

		if (sumMap.has(channel_id)) {
			sumMap.set(channel_id, sumMap.get(channel_id) + (peak_multiplier || 0));
		} else {
			sumMap.set(channel_id, peak_multiplier || 0);
		}
	});

	sumMap.forEach((sum, channel_id) => {
		result.push({ channel_id, sum });
	});

	return result;
}

export default handler;
