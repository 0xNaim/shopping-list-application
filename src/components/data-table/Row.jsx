import React from 'react';

const Row = ({ components }) => {
  return <tr>{components.map((comp) => comp)}</tr>;
};

export default Row;
