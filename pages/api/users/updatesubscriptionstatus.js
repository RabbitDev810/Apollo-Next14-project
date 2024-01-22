//INSECURE THIS NEEDS TO BE FIXED ASAP
import { createClient } from "@supabase/supabase-js";
import { SessionConnect } from "../../../lib/auth";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.SUPABASE_SECRET_KEY
);

const handler = async function (req, res) {
	if (req.method === "POST") {
		const { session } = await SessionConnect({ req, res });
		//console.log({session})

		if (!session || !session["user"]) {
			return res.status(500).json({ success: false, error: "Not signed in" });
		}

		let user = session.user;
		//let user = {'id': "053315b9-db99-4fb3-b154-5f91671665c8"}

		const { tier, days } = req.body;

		let expireDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * days);

		const { error: updateError } = await supabase
			.from("users")
			.update({
				access_level: tier,
				subscription_expires: expireDate
					.toISOString()
					.slice(0, 19)
					.replace("T", " "),
			})
			.eq("id", user.id);

		if (updateError) {
			res.status(500).json({ success: false, error: updateError.message });
		}

		const { data: updatedUserData, error: fetchError } = await supabase
			.from("users")
			.select("*")
			.eq("id", user.id);
		//console.log(updatedUserData, 'updatedUserData')
		if (fetchError) {
			res.status(500).json({ success: false, error: fetchError.message });
		}

		let access_level = updatedUserData[0].access_level;
		let subscription_expired = false;
		let now = new Date();
		//console.log(now, updatedUserData[0].subscription_expires);
		if (now > new Date(updatedUserData[0].subscription_expires)) {
			access_level = 0;
			//console.log("now > subscription_expires")
		}

		res.status(200).json({ success: true });
	}
};

export default handler;
