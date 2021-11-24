import React, { useState } from 'react';
import shortid from 'shortid';
import { icons } from '../../assets';
import ActionCell from '../../components/data-table/ActionCell';
import DataTable from '../../components/data-table/DataTable';
import TextCell from '../../components/data-table/TextCell';
import BucketName from './BucketName';

const BucketTable = ({ buckets, renameBucket, removeBucket }) => {
  const [editable, setEditable] = useState({});

  const theadItem = [
    <TextCell
      key={shortid.generate()}
      text='Bucket Name'
      as='th'
      className='__bold'
    />,
    <TextCell
      key={shortid.generate()}
      text='Create'
      as='th'
      className='__bold'
    />,
    <TextCell
      key={shortid.generate()}
      text='Costs'
      as='th'
      className='__bold'
    />,
    <TextCell
      key={shortid.generate()}
      text='Actions'
      as='th'
      className='align-right __bold'
    />,
  ];

  const tbodyItems = buckets.map((item) => [
    <BucketName
      key={shortid.generate()}
      bucket={item}
      editable={editable}
      setEditable={setEditable}
      renameBucket={renameBucket}
    />,
    <TextCell
      key={shortid.generate()}
      text={item.createdAt}
      className='text-secondary'
    />,
    <TextCell key={shortid.generate()} text={`${item.costs} BDT`} />,
    <ActionCell
      key={shortid.generate()}
      className='align-right'
      actions={[
        {
          name: editable[item.id] ? 'Update' : 'Edit',
          icon: editable[item.id] ? icons.tickIcon : icons.editIcon,
          handler: () => {
            setEditable({ ...editable, [item.id]: !editable[item.id] });
          },
        },
        {
          name: 'Delete',
          icon: icons.deleteIcon,
          handler: () => removeBucket(item.id),
        },
      ]}
    />,
  ]);

  return (
    <div className='section table __shadow--sm'>
      <DataTable
        theadItem={theadItem}
        tbodyItems={tbodyItems}
        noItemMsg='There are no buckets'
      />
    </div>
  );
};

export default BucketTable;
