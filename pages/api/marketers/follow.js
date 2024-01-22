import { createClient } from "@supabase/supabase-js";
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
	//const user = {'id': 'e4a12740-1312-4fb6-8df5-9e923e27f7ac' }
	const { user } = session;
	const user_id = user.id;

	// BEGIN GET
	if (req.method == "GET") {
		const { id, channel_id } = req.query;

		const { data, error } = await supabase
			.from("followed_marketers")
			.select("*")
			.eq("user_id", user_id)
			.eq("id", id)
			.eq("channel_id", channel_id);
		//console.log(data)
		if (error) {
			res.status(500).json({ success: false, error: error.message });
		}

		res.status(200).json(data);
	} // END GET

	// BEGIN POST
	if (req.method == "POST") {
		const { channel_id } = req.body;

		const { error } = await supabase
			.from("followed_marketers")
			.insert([{ channel_id, user_id }]);
		//console.log("marketer inserted")
		if (error) {
			res.status(500).json({ success: false, error: error.message });
		}

		res.status(200).json({ success: true });
	} // END POST

	// BEGIN DELETE
	if (req.method == "DELETE") {
		const { id, channel_id } = req.body;

		const { error } = await supabase
			.from("followed_marketers")
			.delete()
			.eq("user_id", user_id)
			.eq("id", id)
			.eq("channel_id", channel_id);

		//console.log("marketer deleted")
		if (error) {
			res.status(500).json({ success: false, error: error.message });
		}

		res.status(200).json({ success: true });
	} // END DELETE
};

export default handler;
