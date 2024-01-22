import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import { SessionConnect } from "../../../lib/auth";
const marketerChannels = require("../../../lib/marketerChannels");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export interface TokenDataPoint {
  channel_id: string;
  sum: number;
  marketer_data: {
    channel_id: string | null
  }
}

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  const { session } = await SessionConnect({ req, res })
  
  //const { searchQuery } = req.query;
  const channelNames = marketerChannels.default.map((a) => a.name);

  if (req.method == "GET") {
    const { data: telegramTokenData, error: telegramTokenDataError } = await supabase
    .from('TelegramTokenData')
    .select('channel_id, peak_multiplier');

    if(telegramTokenDataError) {
      return res.status(500).json({ error: true, errorMessage: "Error querying TelegramTokenData: " + telegramTokenDataError.message });
    }
    
    const { data: marketerData, error: marketerError } = await supabase
      .from('marketer_data')
      .select('channel_id');

    if(marketerError) {
      return res.status(500).json({ error: true, errorMessage: "Error querying marketer_data: " + marketerError.message });
    }
    
    const tokenData: Array<TokenDataPoint> = telegramTokenData.map(token => {
      const matchingMarketer = marketerData.find(marketer => marketer.channel_id === token.channel_id);
      return {
        channel_id: token.channel_id,
        sum: token.peak_multiplier,
        marketer_data: matchingMarketer ? matchingMarketer : null,
      };
    });

    for (const item of tokenData) {
      const { data: countData, error: countError } = await supabase
        .from('TelegramTokenData')
        .select('channel_id')
        .eq('channel_id', item.channel_id);

      if(countError) {
        return res.status(500).json({ error: true, errorMessage: "Error filtering response from TelegramTokenData: " + countError.message });
      }

      //console.log(countData.length, "counter")
      await supabase
        .from("marketer_data")
        .update({ average_peak_multiplier: Number(item.sum) / countData.length })
        .eq("channel_id", item.channel_id);
    }

    const {  data: marketersQuery, error: marketersError  } = await supabase.rpc('get_channel_names');

    if (marketersError) {
      return res.status(500).json({ error: true, errorMessage: "Error running get_channel_names rpc call: " + marketersError.message });
    }

    let marketers = [];

    for (const marketer of marketersQuery) {
      if (channelNames.includes(marketer.channel_name)) {
        const { data: returnData } = await supabase
          .from("followed_marketers")
          .select("count(channel_id)")
          .eq("channel_id", marketer.channel_id);

        const { data: callData } = await supabase
          .from("TelegramTokenData")
          .select("count(channel_id)")
          .eq("channel_id", marketer.channel_id)
          .gte("id", Date.now() / 1000 - 24 * 60 * 60 * 7);

        marketers.push({
          ...marketer,
          count: returnData[0].count,
          call: callData[0].count,
        });
      }
    }

    res.status(200).json(marketers);
  }
};

export default handler