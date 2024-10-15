import React, { useState } from 'react';
import axios from 'axios';
import History from './components/History';
import BanList from './components/BanList';

const API_URL = 'https://api.scryfall.com/cards/random';

const App = () => {
  const [card, setCard] = useState(null); // Current card
  const [history, setHistory] = useState([]); // Session history
  const [banList, setBanList] = useState([]); // Banned card types

  // Fetch a random MTG card
  const fetchRandomCard = async () => {
    try {
      const response = await axios.get(API_URL);
      const { name, type_line, image_uris } = response.data;

      // Check if the card type is banned
      if (isBanned(type_line)) {
        fetchRandomCard(); // Retry if banned
      } else {
        const newCard = { name, type: type_line, image: image_uris?.normal };
        setCard(newCard);
        setHistory((prev) => [...prev, newCard]);
      }
    } catch (error) {
      console.error('Error fetching card data:', error);
    }
  };

  // Check if the card type is banned
  const isBanned = (type) => banList.some((banned) => type.includes(banned));

  // Add a type to the ban list
  const handleBan = (type) => {
    setBanList((prev) => [...new Set([...prev, type])]);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Magic: The Gathering Card Viewer</h1>
      <button onClick={fetchRandomCard}>Fetch Random Card</button>

      {card && (
        <div style={{ margin: '20px' }}>
          <h2>{card.name}</h2>
          <p>
            Type: <span onClick={() => handleBan(card.type)}>{card.type}</span>
          </p>
          {card.image && <img src={card.image} alt={card.name} style={{ width: '300px' }} />}
        </div>
      )}

      <BanList banList={banList} />
      <History history={history} />
    </div>
  );
};

export default App;
