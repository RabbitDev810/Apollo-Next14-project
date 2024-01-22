import { createClient } from "@supabase/supabase-js";
import { SessionConnect } from "../../lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.SUPABASE_SECRET_KEY
);

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
	const { session } = await SessionConnect({ req, res });
	//console.log({session})

	if (!session || !session["user"]) {
		return res.status(403).json({ error: "Unauthorized" });
	}

	const { marketerQuery } = req.query;

	const { data: channels, error } = await supabase
		.from("TelegramTokenData")
		.select()
		.ilike("channel_name", `%${marketerQuery}%`);

	//console.log(channels, "channels")

	if (error) {
		res.status(500).json({ success: false, error: error.message });
	}

	res.status(200).json(channels);
};

//console.log(channels, "channels")

export default handler;
