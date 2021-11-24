import { navigate } from '@reach/router';
import React from 'react';

const BucketName = ({ bucket, editable, setEditable, renameBucket }) => {
  return (
    <td>
      {editable[bucket.id] ? (
        <input
          className='input__field--inline'
          type='text'
          value={bucket.name}
          autoFocus
          onChange={(e) => {
            if (e.target.value.length <= 30) {
              renameBucket({ bucketId: bucket.id, name: e.target.value });
            } else {
              alert('Bucket name must be between 30 characters');
            }
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              setEditable({
                ...editable,
                [bucket.id]: false,
              });
            }
          }}
          onBlur={(e) => {
            if (e.target.value) {
              setEditable({
                ...editable,
                [bucket.id]: false,
              });
            }
          }}
        />
      ) : (
        <span
          className='cursor-pointer'
          onClick={() => navigate(`/buckets/${bucket.id}`)}
        >
          {bucket.name}
        </span>
      )}
    </td>
  );
};

export default BucketName;
