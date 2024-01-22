import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.SUPABASE_SECRET_KEY
);

const handler = async function (req, res) {
	const { count, error } = await supabase
		.from("TelegramTokenData")
		.select("*", { count: "exact", head: true });

	if (error) {
		res.status(500).json({ success: false, error: error.message });
	}

	res.status(200).json(count);
};

export default handler;
