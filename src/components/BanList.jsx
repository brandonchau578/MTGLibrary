import React from 'react';

const BanList = ({ banList }) => (
  <div style={{ margin: '20px' }}>
    <h3>Banned Card Types</h3>
    {banList.length > 0 ? (
      <ul>
        {banList.map((type, index) => (
          <li key={index}>{type}</li>
        ))}
      </ul>
    ) : (
      <p>No types banned.</p>
    )}
  </div>
);

export default BanList;