import React from 'react';
import shortid from 'shortid';

const ActionCell = ({ actions, className, as }) => {
  const As = as;
  return (
    <As className={className}>
      {actions.map((action) => (
        <button
          key={shortid.generate()}
          className='icon-button'
          onClick={action.handler}
        >
          <img
            src={action.icon}
            alt={action.name}
            title={action.name}
            className='icon-button__icon'
          />
        </button>
      ))}
    </As>
  );
};

ActionCell.defaultProps = {
  as: 'td',
};

export default ActionCell;
