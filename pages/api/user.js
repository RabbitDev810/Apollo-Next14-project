import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.SUPABASE_SECRET_KEY
);

const handler = async function (req, res) {
	if (req.method === "GET") {
		const { wallet_address } = req.query;

		const { data: results, error: queryError } = await supabase
			.from("users")
			.select("*")
			.eq("wallet_address", wallet_address);

		if (queryError) {
			return res
				.status(500)
				.json({ error: true, errorMessage: queryError.message });
		}

		if (!results || results.length === 0) {
			return res
				.status(500)
				.json({ error: true, errorMessage: "no User Found" });
		}

		return res.json({ error: false, userInformation: results });
	} else {
		return res
			.status(301)
			.json({ error: true, errorMessage: "Method not allowed" });
	}
};

export default handler;
