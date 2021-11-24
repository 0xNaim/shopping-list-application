import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import { icons } from '../../assets';

const Nav = ({ brandLogo, name, showMenu }) => {
  return (
    <nav className='nav __shadow--lg'>
      <div className='container nav__container'>
        <div className='nav__brand'>
          <img
            className='nav__brand-logo'
            src={brandLogo}
            alt='Brand Logo'
            onClick={() => navigate('/')}
          />
          <h1 className='nav__brand-name'>{name}</h1>
        </div>
        {showMenu && (
          <div className='nav__menu nav__menu--right'>
            <div className='nav__menu-items'>
              <img
                src={icons.moreMenuIcon}
                alt='More Menu'
                className='nav__menu-icon'
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

Nav.defaultProps = {
  showMenu: false,
};

Nav.propTypes = {
  brandLogo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Nav;
