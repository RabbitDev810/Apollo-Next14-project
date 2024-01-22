import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import { SessionConnect } from "../../lib/auth";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
	const { channel_id } = req.query;
	const { session } = await SessionConnect({ req, res });
	const { user } = session;

	if (req.method === "GET") {
		const { data: results, error: queryError } = await supabase
			.from("marketer_data")
			.select("*")
			.eq("channel_id", channel_id);

		if (queryError) {
			return res
				.status(500)
				.json({ error: true, errorMessage: "Error querying Supabase" });
		}

		if (results.length === 0) {
			return res
				.status(200)
				.json({ error: false, success: true, marketerData: results });
		}

		const { count: followersCountresult, error: countError } = await supabase
			.from("followed_marketers")
			.select("id", { count: "exact" })
			.eq("channel_id", channel_id);

		if (countError) {
			return res
				.status(500)
				.json({
					error: true,
					errorMessage:
						"Error counting followers from Supabase: " + countError.message,
				});
		}

		const { data: follower, error: followerError } = await supabase
			.from("followed_marketers")
			.select("*")
			.eq("user_id", user.id)
			.eq("channel_id", channel_id);

		if (followerError) {
			return res
				.status(500)
				.json({
					error: true,
					errorMessage:
						"Error querying follower data from Supabase: " +
						followerError.message,
				});
		}

		const marketerInfo = results[0];

		const parsedData = {
			...marketerInfo,
			followers: followersCountresult,
			followed: follower.length === 1,
		};

		return res.status(200).json({
			error: false,
			success: true,
			marketerData: parsedData,
		});
	} else {
		return res.status(301).json({
			success: false,
			error: true,
			errorMessage: "No GET request",
		});
	}
};

export default handler;
