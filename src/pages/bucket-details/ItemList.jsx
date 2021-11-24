import React from 'react';
import shortid from 'shortid';
import { icons } from '../../assets';
import ActionCell from '../../components/data-table/ActionCell';
import DataTable from '../../components/data-table/DataTable';
import InputCell from '../../components/data-table/InputCell';
import TextCell from '../../components/data-table/TextCell';

const ItemList = ({
  inCompletedItems,
  totalCosts,
  updateShoppingItems,
  deleteItemHandler,
  toggleComplete,
  updateCost,
}) => {
  const theadItem = [
    <TextCell
      key={shortid.generate()}
      text={`Item Name (${inCompletedItems.length})`}
      as='th'
    />,
    <TextCell key={shortid.generate()} text='Quantity' as='th' />,
    <TextCell key={shortid.generate()} text='Costs' as='th' />,
    <TextCell
      key={shortid.generate()}
      text='Actions'
      as='th'
      className='align-right'
    />,
  ];

  const tbodyItems = inCompletedItems.map((item) => [
    <TextCell key={shortid.generate()} text={item.name} />,
    <InputCell
      key={shortid.generate()}
      value={item.quantity}
      id={item.id}
      name='quantity'
      updateData={(value, name) => {
        if (value) {
          updateShoppingItems({
            itemId: item.id,
            key: name,
            value,
          });
          return { error: false };
        }
        return {
          error: true,
          msg: 'Invalid quantity!',
        };
      }}
    />,
    <InputCell
      key={shortid.generate()}
      value={item.price.toFixed(2)}
      id={item.id}
      name='price'
      unit='BDT'
      updateData={(value, name) => {
        value = parseFloat(value);
        if (value && value < 100000) {
          updateShoppingItems({
            itemId: item.id,
            key: name,
            value,
          });
          return {
            error: false,
          };
        }
        return {
          error: true,
          msg: 'Invalid price!',
        };
      }}
    />,
    <ActionCell
      key={shortid.generate()}
      className='align-right'
      actions={[
        {
          name: 'Delete',
          icon: icons.deleteIcon,
          handler: () => deleteItemHandler(item.id),
        },
        {
          name: 'Complete',
          icon: icons.tickIcon,
          handler: () => {
            toggleComplete(item.id);
            updateCost(totalCosts + item.price);
          },
        },
      ]}
    />,
  ]);

  return (
    <section className='section table no-print __shadow--sm'>
      <DataTable
        theadItem={theadItem}
        tbodyItems={tbodyItems}
        noItemMsg='There are no items'
      />
    </section>
  );
};

export default ItemList;
