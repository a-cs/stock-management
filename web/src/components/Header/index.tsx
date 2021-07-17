/* eslint-disable react/prop-types */
import React from 'react';

import logoIFCE from '../../assets/REITORIA a.png';
import logoIFCEMobile from '../../assets/REITORIA a mobile.png';

import './styles.css';

const Header: React.FC = () => {
  let src;
  if (window.innerWidth < 700) {
    src = logoIFCEMobile;
  } else {
    src = logoIFCE;
  }

  return (
    <header className="headerContainer">
      <div className="headerContent">
        <picture>
          <source src={logoIFCEMobile} media="(max-width: 700px)" />
          <img src={src} alt="Logo IFCE" />
        </picture>

        <div className="menu">
          <nav>
            <ul>
              <li>
                <a href="/">Items</a>
              </li>
              <li>
                <a href="/">Transações</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
