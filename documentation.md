/coins
```json
[
    {
        name: 'Bitcoin (BTC)',
        change24h: 10 // percent
    },
    ...
]
```

/coins/details
```json
[
    {
        rank: 2,
        name: 'Ethereum (ETH)',
        prices: {
            dollar: 300.23,
            btc: 0.2
        },
        market_cap: 239294,
        volume24h: {
            dollar: 23400,
            crypto: 230
        },
        change24h: 23, // percent
        nb_markets: 10,
        all_time: {
            lower: {
                dollar: 300.23,
                btc: 0.2
            },
            higher: {
                dollar: 300.23,
                btc: 0.2
            }
        }
        year: {
            lower: {
                dollar: 300.23,
                btc: 0.2
            },
            higher: {
                dollar: 300.23,
                btc: 0.2
            }
        }
    },
    ...
]
```

/coins/:sym/general
```json
    rank: 2,
    name: 'Ethereum (ETH)',
    icon_url: "https://example.com/image.png"
    prices: {
        dollar: 300.23,
        btc: 0.2
    },
    market_cap: 239294,
    volume24h: {
        dollar: 23400,
        crypto: 230
    },
    change24h: {
        dollar: 23, // percent
        btc: 12
    },
    markets: {
        nb: 10,
        volume_biggest: 80, // percent

    },
    supply: 1000 // nb token available
    all_time: {
        lower: 300,
        higher: 20000
    }
    year: {
        lower: 6000,
        higher: 20000
    }
```

/coins/:sym/links
```json
{
    whitepaper: 'url',
    trading_view_analysis: 'url',
    website: 'url',
    github: 'url',
    twitter: 'url',
    facebook: 'url',
    telegram: 'url'
}
```

/coins/:sym/social
```json
{
    twitter: { // we can request a timestamp to get tweets before a specific date  (default=now) AND a number of tweets (like a limit, default=20)
        account_name: 'Ethereum', // 'screen_name' from Twitter API
        tweets_filtered: [
            2987323, 28937, 237623,... 
        ],
        tweets: [
            2987323, 28937, 298732, 237623,... 
        ]
    },
    reddit: {
        posts: [
            {
                'same format as current version'
            }
        ]
    }
}
```

/coins/:sym/events
```json
[
    // list of cryptomarketcal event
]
```

/coins/:sym/markets
```json
[
    {
        name: 'Coinbase',
        volume24h: 32 //percent
    },
    {
        name: 'HitBTC',
        volume24h: 10 //percent
    },
    ...
]
```