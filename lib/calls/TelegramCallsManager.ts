import { createClient } from "@supabase/supabase-js";

export interface TokenData {
  id: number;
  channel_id: string;
  channel_name: string;
  channel_link: string;
  contract: string;
  chain: string;
  pair_name: string;
  initialMarketCap: number | null;
  lastUpdated: string | null;
  liquidity: number | null;
  marketCap: number | null;
  priceHistory: PriceHistory;
  peak_multiplier: number | null;
  auto_update?: number;
  average_peak_multiplier?: number;
  votes: number;
  upvotes: number;
  downvotes: number;
}

export type PriceHistory = {
  "5min": number;
  "1hr": number;
  "12hr": number;
  "24hr": number;
};

export class TelegramCallsManager {
  /**
   * Gets "limit" latest calls for the provided channel id. If "all" is provided as the channel id, it will get calls for all channels
   * @param channelId
   * @param searchFilter
   * @param limit
   */
  static async getCalls(channelId: string, searchFilter: string, limit: number): Promise<Array<TokenData>> {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    let query = supabase.from("TelegramTokenData").select("*");
    if (channelId != "all") {
      query = query.eq("channel_id", channelId);
    }
    if (searchFilter != "") {
        query = query.ilike("pair_name", `%${searchFilter}%`);
    }
    query = query.order("id", { ascending: false }).limit(limit);

    const { data, error } = await query;
    if (error) {
      console.log("getCalls: Token Data Error");
      console.log(error);
      return null;
    }

    return data.map(item => {
        return {
            id: item.id,
            channel_id: item.channel_id,
            channel_name: item.channel_name,
            channel_link: item.channel_link,
            contract: item.contract,
            chain: item.chain,
            pair_name: item.pair_name,
            initialMarketCap: Number(item.initialMarketCap),
            lastUpdated: item.lastUpdated,
            liquidity: Number(item.liquidity),
            marketCap: Number(item.marketCap),
            priceHistory: {
                "5min": Number(item.priceHistory_5min),
                "1hr": Number(item.priceHistory_1hr),
                "12hr": Number(item.priceHistory_12hr),
                "24hr": Number(item.priceHistory_24hr),
            },
            peak_multiplier: Number(item.peak_multiplier),
            votes: Number(0),
            upvotes: Number(0),
            downvotes: Number(0),
        }
    })
  }
}
