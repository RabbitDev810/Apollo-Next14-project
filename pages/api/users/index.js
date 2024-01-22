import { createClient } from "@supabase/supabase-js";
import { SessionConnect } from "../../../lib/auth";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.SUPABASE_SECRET_KEY
);

const handler = async function (req, res) {
	// Create user if they don't already exist
	if (req.method === "POST") {
		const { session } = await SessionConnect({ req, res });
		//console.log({session})

		if (!session || !session["user"]) {
			return res.status(403).json({ error: "Unauthorized" });
		}

		let { wallet_address } = req.body;

		if (wallet_address === undefined) {
			wallet_address = "";
		}

		const { data: userData, error: userError } = await supabase
			.from("users")
			.select("*")
			.eq("wallet_address", wallet_address);

		//console.log(userData, "userData")

		if (userError) {
			res.status(500).json({ success: false, error: userError.message });
		}

		if (userData && userData.length > 0) {
			//console.log("user already exists")
			res.status(200).json(); // User already exists
		} else {
			const { error: insertError } = await supabase.from("users").upsert([
				{
					wallet_address,
					username: "",
					access_level: 0,
					subscription_expires: new Date().toISOString(),
				},
			]);
			// console.log("user inserted")
			if (insertError) {
				res.status(500).json({ success: false, error: e.message || e });
			}

			res.status(200).json({ success: true });
		}
	}
};

export default handler;
