import React from 'react';
import { icons } from '../../assets';
import Suggestions from '../suggestions/Suggestions';
import SearchOverlay from './SearchOverlay';

const CreateItem = ({
  value,
  placeholder,
  onChange,
  onKeyPress,
  searchOverlay,
  showSuggestions,
}) => {
  return (
    <section className='section add-item no-print __shadow--sm'>
      <div className='add-item__relative'>
        <div className='add-item__input'>
          <img
            src={icons.plusIcon}
            alt='Create new bucket icon`'
            className='add-item__icon'
          />
          <input
            type='text'
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            className='add-item__input-field'
          />
        </div>
        {searchOverlay && <SearchOverlay />}
      </div>
      <div className='horizontal-line'></div>
      {showSuggestions && <Suggestions />}
    </section>
  );
};

export default CreateItem;
