import React from 'react';

const History = ({ history }) => (
  <div style={{ margin: '20px' }}>
    <h3>Viewed Cards History</h3>
    {history.length > 0 ? (
      <ul>
        {history.map((card, index) => (
          <li key={index}>
            {card.name} - {card.type} <br />
            {card.image && <img src={card.image} alt={card.name} style={{ width: '50px', margin: '5px 0' }} />}
          </li>
        ))}
      </ul>
    ) : (
      <p>No cards viewed yet.</p>
    )}
  </div>
);

export default History;