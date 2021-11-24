import React from 'react';
import Row from './Row';

const DataTable = ({ theadItem, tbodyItems, hideTableBody, noItemMsg }) => {
  return (
    <table className='table__table'>
      <thead className='table__thead'>
        <Row components={theadItem} />
      </thead>
      <tbody className={hideTableBody ? 'table__tbody hide' : 'table__tbody'}>
        {tbodyItems.length === 0 && (
          <tr className='no-item text-secondary'>
            <td colSpan='4'>{noItemMsg}</td>
          </tr>
        )}

        {tbodyItems.map((items, index) => (
          <Row key={index} components={items} />
        ))}
      </tbody>
    </table>
  );
};

DataTable.defaultProps = {
  hideTableBody: false,
};

export default DataTable;
