import { useEffect, useState } from 'react'

import './App.css'

import React from 'react'

import axios from 'axios';

const App= () => {
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState(null);

  // Fetch data using .then
  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      )
      .then((response) => {
        setCryptos(response.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Fetch data using async/await
  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      );
      setCryptos(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const filteredData = cryptos.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

 
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortType === 'market_cap') {
      return b.market_cap - a.market_cap;
    } else if (sortType === 'percentage_change') {
      return b.price_change_percentage_24h - a.price_change_percentage_24h;
    }
    return 0;
  });

  return (
    <div>
      <h2>Cryptocurrency Data</h2>

   
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='Inputbar'
      />

   
      <button onClick={() => setSortType('market_cap')}>Sort by Market Cap</button>
      <button onClick={() => setSortType('percentage_change')}>
        Sort by % Change (24h)
      </button>

      
      <table style={{width:"900px"}}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Current Price</th>
            <th>Total Volume</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((crypto) => (
            <tr key={crypto.id}>
              <td>
                <img src={crypto.image} alt={crypto.name} width="30" />
              </td>
              <td>{crypto.name}</td>
              <td>{crypto.symbol.toUpperCase()}</td>
              <td>${crypto.current_price}</td>
              <td>{crypto.total_volume.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={fetchData}>Fetch Data (async/await)</button>
    </div>
  );
};

export default App;
