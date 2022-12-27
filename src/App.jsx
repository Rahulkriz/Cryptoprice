import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Coin from "./Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const URL =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.log("There is an error in API");
      });
  }, []);

  const handlechange = (e) => {
    setSearch(e.target.value);
  };

  const filteredcoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <div>
          <h1 className="coin-text">Search a Currency</h1>
        </div>
        <div>
          <form>
            <input
              type="text"
              placeholder="Search"
              className="coin-input"
              onChange={handlechange}
            />
          </form>
        </div>
      </div>
      <div className="container">
        {filteredcoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              marketCap={coin.market_cap}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              volume={coin.total_volume}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
