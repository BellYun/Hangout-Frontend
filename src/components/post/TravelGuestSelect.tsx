import React, { useState } from 'react';

const TravelGuestSelect = () => {
  const [number, setNumber] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNumber(parseInt(e.target.value));
  };

  return (
    <div className="flex space-x-2 z-2">
      <div className="flex items-center">
        <select id="picker" onChange={handleChange}>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}명
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TravelGuestSelect;
