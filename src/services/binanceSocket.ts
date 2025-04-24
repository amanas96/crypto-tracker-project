import { AppDispatch } from "../app/store";
import { setLivePrice } from "../features/crypto/cryptoSlice";

const BINANCE_STREAMS = [
  "btcusdt@ticker",
  "ethusdt@ticker",
  "bnbusdt@ticker",
  "adausdt@ticker",
  "usdtusdt@ticker",
];

const SOCKET_URL = `wss://stream.binance.com:9443/stream?streams=${BINANCE_STREAMS.join(
  "/"
)}`;

export function connectToBinance(dispatch: AppDispatch) {
  const socket = new WebSocket(SOCKET_URL);

  socket.onopen = () => {
    console.log("[WS] Connected to Binance");
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    const data = message.data;

    const symbol = data.s.toLowerCase();
    const price = parseFloat(data.c);
    const volume = parseFloat(data.q);
    const change24h = parseFloat(data.P);

    // Dispatch to Redux
    dispatch(setLivePrice({ symbol, price, volume24h: volume, change24h }));
  };

  socket.onerror = (err) => {
    console.error("[WS] Error:", err);
  };

  socket.onclose = () => {
    console.warn("[WS] Disconnected. Retrying...");
    setTimeout(() => connectToBinance(dispatch), 3000); // Retry
  };
}
