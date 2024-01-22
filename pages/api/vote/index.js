import nextConnect from "next-connect";
import { createClient } from "@supabase/supabase-js";
import { SessionConnect } from "../../../lib/auth";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

const handler = nextConnect();

handler.post(async (req, res) => {
  try {
    const { session } = await SessionConnect({ req, res })
    //console.log({session})

    if (!session || !session['user']) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const body = req.body;
    // console.log(body);
    const { address, add, vote } = body;
    // console.log("Address:", address, "Add", add, "Vote", vote);

    if (address === undefined || add === undefined || vote === undefined) {
      res.status(500).json("Wrong request");
      return;
    }

    const { user } = session
    //const user = {id: 13}

    const { data: voteRow, error: fetchError } = await supabase
      .from("token_upvotes")
      .select("*")
      .eq("user_id", user.id)
      .eq("token_contract", address);

    //console.log(voteRow, "voteRow")  
    if (fetchError) {
      throw fetchError;
    }

    if (voteRow && voteRow.length) {
      if (add) {
        await supabase
          .from("token_upvotes")
          .update({ upvote: vote })
          .eq("id", voteRow[0].id);
        //console.log("update token_upvotes")  
      } else {
        await supabase.from("token_upvotes").delete().eq("id", voteRow[0].id);
        //console.log("delete token_upvotes")  
      }
    } else {
      if (add) {
        await supabase.from("token_upvotes").upsert([
          {
            token_contract: address,
            user_id: user.id,
            upvote: vote,
          },
        ]);
        //console.log("upsert token_upvotes") 
      }
    }

    res.status(200).json("Success");
  } catch (error) {
    console.error("Error:", error.message || error);
    return res.status(500).json({ success: false, error: error.message || error });
  }
});

export default handler
