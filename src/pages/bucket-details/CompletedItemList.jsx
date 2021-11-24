import React, { useState } from 'react';
import shortid from 'shortid';
import { icons } from '../../assets';
import ActionCell from '../../components/data-table/ActionCell';
import DataTable from '../../components/data-table/DataTable';
import TextCell from '../../components/data-table/TextCell';

const CompletedItemList = ({
  completedItems,
  totalCosts,
  deleteItemHandler,
  toggleComplete,
  updateCost,
}) => {
  const [hideTableBody, setHideTableBody] = useState(false);

  const theadItem = [
    <TextCell
      key={shortid.generate()}
      text={`Item Name (${completedItems.length})`}
      as='th'
    />,
    <TextCell key={shortid.generate()} text='Quantity' as='th' />,
    <TextCell key={shortid.generate()} text='Costs' as='th' />,
    <ActionCell
      key={shortid.generate()}
      className='align-right'
      actions={[
        {
          name: 'Print',
          icon: icons.printerIconWhite2,
          handler: () => window.print(),
        },
        {
          name: 'Hide table',
          icon: icons.downArrowIconWhite,
          handler: () => setHideTableBody(!hideTableBody),
        },
      ]}
    />,
  ];

  const tbodyItems = completedItems.map((item) => [
    <TextCell key={shortid.generate()} text={item.name} />,
    <TextCell key={shortid.generate()} text={item.quantity} />,
    <TextCell key={shortid.generate()} text={item.price} />,
    <ActionCell
      key={shortid.generate()}
      className='align-right'
      actions={[
        {
          name: 'Delete',
          icon: icons.deleteIcon,
          handler: () => {
            deleteItemHandler(item.id);
            updateCost(totalCosts - item.price);
          },
        },
        {
          name: 'Incomplete',
          icon: icons.upArrowIcon,
          handler: () => {
            toggleComplete(item.id);
            updateCost(totalCosts - item.price);
          },
        },
      ]}
    />,
  ]);

  return (
    <section className='section table table--success __shadow--sm'>
      <DataTable
        theadItem={theadItem}
        tbodyItems={tbodyItems}
        hideTableBody={hideTableBody}
        noItemMsg='Press the tick with a price to mark it as completed'
      />
      <section className='table__footer'>
        <div className='table__footer-content'>Total: {totalCosts} BDT</div>
      </section>
    </section>
  );
};

export default CompletedItemList;
