import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next';
import { SessionConnect } from '../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse)  {
  const { session } = await SessionConnect({ req, res })

  const { chain, channel_name } = req.query;
  console.log("===============================")
  console.log(channel_name, chain)

  const supabase = createPagesServerClient({ req, res })


  if(!session) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const marketerDataQuery = supabase.from("marketer_data").select('*')
    const telegramTokenDataQuery = supabase.from("TelegramTokenData").select('*')

    const { data: marketerData, error: marketerDataError } = await marketerDataQuery;
    const { data: tokenData, error: tokenDataError } = await telegramTokenDataQuery

    if(marketerDataError) {
      console.log("getCalls: Marketer Data Error")
      console.log(marketerDataError)
      return res.status(500).json({ error: marketerDataError });
    }

    if(tokenDataError) {
      console.log("getCalls: Token Data Error")
      console.log(tokenDataError)
      return res.status(500).json({ error: tokenDataError });
    }

    let tokens: TokenData[] = []
    if(marketerData?.length > 0) {
      marketerData.forEach((item) => {
        let marketerTokens = tokenData.filter((i) => i.channel_id == item.channel_id)
        if(marketerTokens) {
          const processedTokenData = marketerTokens.map((token) => {
            return {
              ...token,
              ...item,
              id: token.id,
            }
          })
          tokens.push(...processedTokenData)
        }
    })}

    var tokenAddresses: string[] = [];
    var returnedItems: TokenData[] = [];

    console.log("Num Tokens: " + tokens.length)
    if(tokens.length > 0){
      tokens?.forEach((item) => {
        tokenAddresses.push(item.contract);
      });
      tokens?.forEach((item) => {
        //if(item.priceHistory != null || item.chain == "bsc") //Include items with no price data if it is on bsc
        var returnedItem: GetCallsResult = {
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
          /*
          votes: Number(
            votes.filter(
              (i) => i.token_contract == item.contract && i.upvote == true
            ).length -
              votes.filter(
                (i) => i.token_contract == item.contract && i.upvote == false
              ).length
          ),
          upvote: getVote(item.contract, true),
          downvote: getVote(item.contract, false),
          */
         votes: 0,
         upvote: 0,
         downvote: 0
        };

        returnedItems.push(returnedItem);
      });
    }

    return res.status(200).json(returnedItems.sort((a, b) => b.id - a.id));

  } catch (e) {
    console.log("Error " + e);
    return res.status(500).json({ error: e });
  }
};

interface TokenData {
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
  priceHistory_12hr?: number | null;
  priceHistory_1hr?: number | null;
  priceHistory_24hr?: number | null;
  priceHistory_5min?: number | null;
  priceHistoryColor?: string | null;
  peak_multiplier: number | null;
  auto_update?: number;
  average_peak_multiplier?: number;
}

type PriceHistory = {
  "5min": number,
  "1hr": number,
  "12hr": number,
  "24hr": number
}

interface GetCallsResult extends TokenData {
  priceHistory: PriceHistory;
  votes: number,
  upvote: number,
  downvote: number
}
