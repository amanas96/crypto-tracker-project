import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePrices } from "./cryptoSlice";
import { RootState, AppDispatch } from "../../app/store";
import { CryptoAsset } from "./types";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  Line,
  ReferenceLine,
} from "recharts";

export function CryptoTable() {
  const dispatch = useDispatch<AppDispatch>();
  const assets: CryptoAsset[] = useSelector((state: RootState) => state.crypto);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updatePrices());
    }, 2000);
    return () => clearInterval(interval);
  }, [dispatch]);

  // Function to simulate open, high, low, and close for candlestick chart
  const generateCandlestickData = (data: CryptoAsset["chartData"]) => {
    return data.map((point, index) => {
      const prevPrice = data[index - 1]?.price || point.price;
      const high =
        Math.max(point.price, prevPrice) * (1 + Math.random() * 0.05);
      const low = Math.min(point.price, prevPrice) * (1 - Math.random() * 0.05);
      return {
        time: `Day ${index + 1}`,
        open: prevPrice,
        close: point.price,
        high,
        low,
      };
    });
  };

  return (
    <div className="p-4 overflow-x-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg">
      <table className="min-w-full table-auto border-collapse bg-gray-50 rounded-lg shadow-md">
        <thead>
          <tr className="text-white bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700">
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Logo</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Symbol</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">1h %</th>
            <th className="px-4 py-2 text-left">24h %</th>
            <th className="px-4 py-2 text-left">7d %</th>
            <th className="px-4 py-2 text-left">Market Cap</th>
            <th className="px-4 py-2 text-left">24h Volume</th>
            <th className="px-4 py-2 text-left">Circulating Supply</th>
            <th className="px-4 py-2 text-left">Max Supply</th>
            <th className="px-28 py-2 text-left">7D Chart</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, i) => (
            <tr
              key={asset.id}
              className="text-center border-t hover:bg-gray-200 transition-all"
            >
              <td className="px-4 py-2">{i + 1}</td>
              <td className="px-4 py-2">
                <img src={asset.logo} alt="logo" className="h-8 mx-auto" />
              </td>
              <td className="px-4 py-2">{asset.name}</td>
              <td className="px-4 py-2">{asset.symbol}</td>
              <td className="px-4 py-2">${asset.price.toFixed(2)}</td>
              <td
                className={`px-4 py-2 ${
                  asset.change1h >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {asset.change1h.toFixed(2)}%
              </td>
              <td
                className={`px-4 py-2 ${
                  asset.change24h >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {asset.change24h.toFixed(2)}%
              </td>
              <td
                className={`px-4 py-2 ${
                  asset.change7d >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {asset.change7d.toFixed(2)}%
              </td>
              <td className="px-4 py-2">
                ${(asset.marketCap / 1e9).toFixed(2)}B
              </td>
              <td className="px-4 py-2">
                ${(asset.volume24h / 1e9).toFixed(2)}B
              </td>
              <td className="px-4 py-2">
                {asset.circulatingSupply.toLocaleString()}
              </td>
              <td className="px-4 py-2">{asset.maxSupply.toLocaleString()}</td>
              <td className="px-4 py-2">
                <div className="w-64 h-32 border rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={generateCandlestickData(asset.chartData)}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="high"
                        fill="#ff7300"
                        barSize={8}
                        radius={[10, 10, 0, 0]}
                      />
                      <Bar
                        dataKey="low"
                        fill="#387908"
                        barSize={8}
                        radius={[0, 0, 10, 10]}
                      />
                      <Line
                        type="monotone"
                        dataKey="open"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="close"
                        stroke="#82ca9d"
                        strokeWidth={2}
                        dot={false}
                      />
                      <ReferenceLine y={0} stroke="#000" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
