import { useParams } from '@reach/router';
import { useStoreActions, useStoreRehydrated, useStoreState } from 'easy-peasy';
import shortid from 'shortid';

const useShoppingItem = () => {
  // URL params
  const { bucketId } = useParams();

  // States
  const isRehydrated = useStoreRehydrated();
  const bucket = useStoreState((state) => state.buckets.items[bucketId]);
  const shoppingItems = useStoreState((state) => state.shoppingItems.items);
  const suggestions = useStoreState((state) => state.suggestions.items);

  // Actions
  const addShoppingIdToBucket = useStoreActions(
    (actions) => actions.buckets.addItem
  );
  const createShoppingItem = useStoreActions(
    (actions) => actions.shoppingItems.create
  );
  const changeSearchTerm = useStoreActions(
    (actions) => actions.suggestions.changeSearchTerm
  );
  const addSuggestion = useStoreActions((actions) => actions.suggestions.add);
  const setSearchOverlayFocus = useStoreActions(
    (actions) => actions.ui.setSearchOverlayFocus
  );

  const isFound = (text) => {
    let isFound = false;
    bucket.shoppingItems.forEach((itemId) => {
      if (shoppingItems[itemId].name === text.toLowerCase()) {
        isFound = true;
      }
    });
    return isFound;
  };

  // Create item
  const createItem = (itemName, suggestion) => {
    if (!isFound(itemName)) {
      if (suggestion) {
        addSuggestion({ ...suggestion });
      } else {
        addSuggestion({ text: itemName });
      }

      const newItem = {
        id: shortid.generate(),
        name: itemName.toLowerCase(),
      };
      createShoppingItem(newItem);
      addShoppingIdToBucket({
        bucketId: bucket.id,
        itemId: newItem.id,
      });
      setSearchOverlayFocus(false);
      changeSearchTerm('');
      return true;
    } else {
      return false;
    }
  };

  // Get suggestions
  const getSuggestions = () => {
    if (!isRehydrated) {
      return [];
    }

    return Object.values(suggestions)
      .reduce((acc, cur) => {
        if (!isFound(cur.text)) {
          acc.push(cur);
        }
        return acc;
      }, [])
      .sort((a, b) => b.appeared - a.appeared)
      .slice(0, 15);
  };

  // Get shopping items
  const getShoppingItems = () => {
    if (!isRehydrated) {
      return {
        completedItems: [],
        inCompletedItems: [],
      };
    }

    const completedItems = [];
    const inCompletedItems = [];

    bucket.shoppingItems.forEach((itemId) => {
      if (shoppingItems[itemId].isCompleted) {
        completedItems.push(shoppingItems[itemId]);
      } else {
        inCompletedItems.push(shoppingItems[itemId]);
      }
    });
    return {
      completedItems,
      inCompletedItems,
    };
  };
  return { createItem, getShoppingItems, getSuggestions, bucket };
};

export default useShoppingItem;
