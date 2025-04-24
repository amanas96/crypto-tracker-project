import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CryptoAsset } from "./types";

const initialAssets: CryptoAsset[] = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    logo: "../logos/bitcoin.png",
    price: 30000,
    change1h: 0.2,
    change24h: -1.5,
    change7d: 2.1,
    marketCap: 580000000000,
    volume24h: 22000000000,
    circulatingSupply: 19000000,
    maxSupply: 21000000,
    chartData: [
      { price: 29000 },
      { price: 29500 },
      { price: 30000 },
      { price: 30500 },
      { price: 30000 },
    ],
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    logo: "../logos/ethereum.png",
    price: 2000,
    change1h: 0.5,
    change24h: 2.1,
    change7d: -1.8,
    marketCap: 240000000000,
    volume24h: 15000000000,
    circulatingSupply: 120000000,
    maxSupply: 0,
    chartData: [
      { price: 1800 },
      { price: 1900 },
      { price: 2000 },
      { price: 2100 },
      { price: 2000 },
    ],
  },
  {
    id: 3,
    name: "Tether",
    symbol: "Tether",
    logo: "../logos/thether.png",
    price: 1,
    change1h: 0.01,
    change24h: -0.02,
    change7d: 0,
    marketCap: 84000000000,
    volume24h: 100000000000,
    circulatingSupply: 83000000000,
    maxSupply: 0,
    chartData: [
      { price: 0.99 },
      { price: 1.01 },
      { price: 1 },
      { price: 1 },
      { price: 1.01 },
    ],
  },
  {
    id: 4,
    name: "Binance Coin",
    symbol: "BNB",
    logo: "../logos/binance.png",
    price: 300,
    change1h: -0.1,
    change24h: 1.3,
    change7d: 0.5,
    marketCap: 50000000000,
    volume24h: 2500000000,
    circulatingSupply: 165000000,
    maxSupply: 200000000,
    chartData: [
      { price: 280 },
      { price: 290 },
      { price: 300 },
      { price: 310 },
      { price: 300 },
    ],
  },
  {
    id: 5,
    name: "Cardano",
    symbol: "ADA",
    logo: "../logos/cardano.png",
    price: 0.4,
    change1h: 0.3,
    change24h: -0.5,
    change7d: 1.2,
    marketCap: 14000000000,
    volume24h: 800000000,
    circulatingSupply: 35000000000,
    maxSupply: 45000000000,
    chartData: [
      { price: 0.38 },
      { price: 0.39 },
      { price: 0.4 },
      { price: 0.41 },
      { price: 0.4 },
    ],
  },
];

interface LivePricePayload {
  symbol: string;
  price: number;
  volume24h: number;
  change24h: number;
}

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: initialAssets,
  reducers: {
    updatePrices: (state) => {
      return state.map((asset) => {
        const priceChange = (Math.random() - 0.5) * 100;
        const newPrice = asset.price + priceChange;
        return {
          ...asset,
          price: newPrice,
          change1h: (Math.random() - 0.5) * 2,
          change24h: (Math.random() - 0.5) * 10,
          volume24h: asset.volume24h + (Math.random() - 0.5) * 100000000,
        };
      });
    },
    setLivePrice: (state, action: PayloadAction<LivePricePayload>) => {
      const { symbol, price, volume24h, change24h } = action.payload;
      return state.map((asset) =>
        asset.symbol.toLowerCase() === symbol
          ? {
              ...asset,
              price,
              volume24h,
              change24h,
              change1h: (Math.random() - 0.5) * 2, // Simulated 1h %
            }
          : asset
      );
    },
  },
});

export const { updatePrices, setLivePrice } = cryptoSlice.actions;
export default cryptoSlice.reducer;
