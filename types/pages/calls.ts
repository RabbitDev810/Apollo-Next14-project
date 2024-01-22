interface ListItem {
            _id : number,
            id: number,
            initialMarketCap: string | null,
            marketCapValueRaw: string | null,
            chain: string,
            token: string | null,
            liquidityValueRaw: string | null,
            liquidity: string, 
            priceHistory5MinValueRaw: number | null,
            priceHistory5MinValue: string | null,
            priceHistory1HrValueRaw: string | null,
            priceHistory1HrValue: number | null,
            priceHistory12HrValueRaw: string | null,            
            priceHistory12HrValue: number | null,              
            priceHistory24HrValueRaw: string | null,
            priceHistory24HrValue: number | null,
            priceHistoryColor: string | null,
            multiplier: string | null,
            marketCap: string,
            channel_link: string,
            channel_name: string, 
            channel_name_no_emojis: string,
            posted: string,
            postedRaw: number, // For clear logic
            contract: string,
            votes: string,
            upvote_status: boolean,
            downvote_status: boolean,
}

export type {
  ListItem,
}