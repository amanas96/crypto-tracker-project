import { Provider } from "react-redux";
import { useEffect } from "react";
import { store } from "./app/store.ts";
import { CryptoTable } from "./features/crypto/CryptoTable.tsx";
import { connectToBinance } from "./services/binanceSocket";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./app/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    connectToBinance(dispatch);
  }, [dispatch]);
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 text-sm">
        <h1 className="text-2xl font-bold text-center p-4">
          Crypto Price Tracker
        </h1>
        <CryptoTable />
      </div>
    </Provider>
  );
}

export default App;
