import React from 'react';
import CreateItem from '../../components/create-item/CreateItem';

const AddBucket = ({ bucketName, setBucketName, createBucket }) => {
  return (
    <CreateItem
      value={bucketName}
      placeholder='Press enter to create a new bucket'
      onChange={(e) => setBucketName(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          if (bucketName.length === 0) {
            alert('Bucket name cannot be empty');
          } else if (bucketName.length > 30) {
            alert('Bucket name must be between 30 characters');
          } else {
            createBucket(bucketName);
            setBucketName('');
          }
        }
      }}
    />
  );
};

export default AddBucket;
