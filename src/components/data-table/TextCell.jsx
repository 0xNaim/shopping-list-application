import React from 'react';

const TextCell = ({ text, className, as }) => {
  const As = as;
  return <As className={className}>{text}</As>;
};

TextCell.defaultProps = {
  as: 'td',
};

export default TextCell;
