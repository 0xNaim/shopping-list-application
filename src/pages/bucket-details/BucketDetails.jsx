import { useStoreActions, useStoreState } from 'easy-peasy';
import React from 'react';
import { brand } from '../../assets';
import Nav from '../../components/nav/Nav';
import useShoppingItem from '../../hooks/useShoppingItem';
import AddShoppingItem from './AddShoppingItem';
import CompletedItemList from './CompletedItemList';
import ItemList from './ItemList';

const BucketDetails = () => {
  const { bucket, getShoppingItems } = useShoppingItem();
  const { completedItems, inCompletedItems } = getShoppingItems();

  const searchOverlayFocus = useStoreState(
    (state) => state.ui.searchOverlayFocus
  );
  const setSearchOverlayFocus = useStoreActions(
    (actions) => actions.ui.setSearchOverlayFocus
  );

  const removeShoppingIdFromBucket = useStoreActions(
    (actions) => actions.buckets.removeItem
  );
  const updateCost = useStoreActions((actions) => actions.buckets.updateCost);
  const removeShoppingItem = useStoreActions(
    (actions) => actions.shoppingItems.remove
  );
  const toggleComplete = useStoreActions(
    (actions) => actions.shoppingItems.toggleComplete
  );
  const updateShoppingItems = useStoreActions(
    (actions) => actions.shoppingItems.update
  );

  const deleteItemHandler = (itemId) => {
    removeShoppingItem(itemId);
    removeShoppingIdFromBucket({ bucketId: bucket.id, itemId });
  };

  return (
    <div
      onClick={() => {
        if (searchOverlayFocus) setSearchOverlayFocus(false);
      }}
    >
      <Nav brandLogo={brand.brandLogo} name={bucket.name} showMenu />
      <main className='container __margin--ylg'>
        <AddShoppingItem />
        <ItemList
          bucketId={bucket.id}
          inCompletedItems={inCompletedItems}
          totalCosts={bucket.costs}
          updateShoppingItems={updateShoppingItems}
          toggleComplete={toggleComplete}
          updateCost={(costs) => {
            updateCost({ bucketId: bucket.id, costs });
          }}
          deleteItemHandler={deleteItemHandler}
        />
        <CompletedItemList
          bucketId={bucket.id}
          completedItems={completedItems}
          totalCosts={bucket.costs}
          toggleComplete={toggleComplete}
          deleteItemHandler={deleteItemHandler}
          updateCost={(costs) => {
            updateCost({ bucketId: bucket.id, costs });
          }}
        />
      </main>
    </div>
  );
};

export default BucketDetails;
