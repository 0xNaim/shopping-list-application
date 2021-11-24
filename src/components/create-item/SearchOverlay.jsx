import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useEffect } from 'react';
import { icons } from '../../assets';
import useShoppingItems from '../../hooks/useShoppingItem';

const SearchOverlay = () => {
  const { createItem } = useShoppingItems();

  const { searchTerm, search: searchItems } = useStoreState(
    (state) => state.suggestions
  );
  const focus = useStoreState((state) => state.ui.searchOverlayFocus);
  const setFocus = useStoreActions(
    (actions) => actions.ui.setSearchOverlayFocus
  );
  const changeSearchTerm = useStoreActions(
    (actions) => actions.suggestions.changeSearchTerm
  );

  useEffect(() => {
    if (searchTerm && searchTerm.length > 0) {
      setFocus(true);
    } else {
      setFocus(false);
    }
  }, [searchTerm, setFocus, searchItems]);

  const handleClick = (sug) => {
    if (createItem(sug.text, sug)) {
      changeSearchTerm('');
    }
  };

  return (
    <div
      className={
        focus ? 'add-item__filter-overlay' : 'add-item__filter-overlay hide'
      }
    >
      <ul className='add-item__filter-list'>
        {searchItems.map((sug) => (
          <li
            key={sug.id}
            className='add-item__filter-item'
            onClick={() => handleClick(sug)}
          >
            <div className='add-item__filter-content'>
              <img
                className='add-item__filter-icon'
                src={icons.deleteIcon}
                alt='Search Icon'
              />
              {sug.text}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchOverlay;
