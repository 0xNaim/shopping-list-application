import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useState } from 'react';
import { brand } from '../../assets';
import Nav from '../../components/nav/Nav';
import AddBucket from './AddBucket';
import BucketTable from './BucketTable';

const BucketList = () => {
  const [bucketName, setBucketName] = useState('');
  const buckets = useStoreState((state) => state.buckets.items);

  const createBucket = useStoreActions((actions) => actions.buckets.create);
  const renameBucket = useStoreActions((actions) => actions.buckets.rename);
  const removeBucket = useStoreActions((actions) => actions.buckets.remove);

  return (
    <>
      <Nav brandLogo={brand.brandLogo} name='Stuck Bucket' />
      <main className='container __margin--ylg'>
        <AddBucket
          bucketName={bucketName}
          setBucketName={setBucketName}
          createBucket={createBucket}
        />
        <BucketTable
          buckets={Object.values(buckets)}
          renameBucket={renameBucket}
          removeBucket={removeBucket}
        />
      </main>
    </>
  );
};

export default BucketList;
