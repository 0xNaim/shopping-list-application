import React, { useState } from 'react';

const InputCell = ({ value, unit, id, name, updateData, className, as }) => {
  const [editable, setEditable] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const checkValidity = (value, name) => {
    const { error, msg } = updateData(value, name);
    if (error) {
      return alert(error);
    }
    setTempValue('');
    setEditable(false);
  };

  const As = as;

  return (
    <As className={className}>
      <div className='table__item-input'>
        {editable ? (
          <input
            type='text'
            className='input__field--inline'
            value={tempValue}
            autoFocus
            data-id={id}
            data-name={name}
            onChange={(e) => {
              if (e.target.value.length <= 10) {
                setTempValue(e.target.value);
              } else {
                return alert('Name too long!');
              }
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                checkValidity(tempValue, e.target.dataset.name);
              }
            }}
            onBlur={(e) => {
              if (e.target.value) {
                checkValidity(tempValue, e.target.dataset.name);
              }
            }}
          />
        ) : (
          <span
            title='Click on text to Edit'
            onClick={() => {
              setEditable(true);
              setTempValue(value);
            }}
          >
            {`${value} ${unit ? unit : ''}`}
          </span>
        )}
      </div>
    </As>
  );
};

InputCell.defaultProps = {
  as: 'td',
};

export default InputCell;
