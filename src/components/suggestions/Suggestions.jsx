import React from 'react';
import useShoppingItem from '../../hooks/useShoppingItem';

const Suggestions = () => {
  const { createItem, getSuggestions } = useShoppingItem();

  const handleClick = (sug) => {
    createItem(sug.text, sug);
  };

  const suggestions = getSuggestions();

  return (
    <div style={{ width: '100%', paddingRight: '2rem' }}>
      <div className='add-item__suggestions'>
        <div className='add-item__suggestions-chips'>
          {suggestions.length > 0 &&
            suggestions.map((sug) => (
              <div
                className='add-item__suggestion-chip-item'
                key={sug.id}
                onClick={() => handleClick(sug)}
              >
                {sug.text}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
