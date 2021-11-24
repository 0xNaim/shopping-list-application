import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import CreateItem from '../../components/create-item/CreateItem';
import useShoppingItem from '../../hooks/useShoppingItem';

const AddShoppingItem = () => {
  const [itemName, setItemName] = useState('');
  const { createItem } = useShoppingItem();

  const searchTerm = useStoreState((state) => state.suggestions.searchTerm);
  const changeSearchTerm = useStoreActions(
    (actions) => actions.suggestions.changeSearchTerm
  );

  useEffect(() => {
    if (!searchTerm) {
      setItemName('');
    }
  }, [searchTerm]);

  const createHandler = (e) => {
    if (e.key === 'Enter') {
      if (itemName.length === 0) {
        alert('Item name cannot be empty!');
      } else if (itemName.length > 30) {
        alert('Item name length is too big!');
      } else {
        createItem(itemName);
        setItemName('');
      }
    }
  };

  return (
    <CreateItem
      searchOverlay
      showSuggestions
      value={itemName}
      placeholder='Type a item name and press enter'
      onChange={(e) => {
        setItemName(e.target.value);
        changeSearchTerm(e.target.value);
      }}
      onKeyPress={createHandler}
    />
  );
};

export default AddShoppingItem;
