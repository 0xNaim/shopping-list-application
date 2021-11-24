import { Router } from '@reach/router';
import React from 'react';
import BucketDetails from '../pages/bucket-details/BucketDetails';
import BucketList from '../pages/bucket-list/BucketList';

const AppRouter = () => {
  return (
    <Router>
      <BucketList path='/' />
      <BucketDetails path='/buckets/:bucketId' />
    </Router>
  );
};

export default AppRouter;
