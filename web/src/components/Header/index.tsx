/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

import logoIFCE from '../../assets/REITORIA a.png';
import logoIFCEMobile from '../../assets/REITORIA a mobile.png';

import './styles.css';

interface HeaderProps {
  selectedMenu: string;
}

const Header: React.FC<HeaderProps> = ({ selectedMenu }) => {
  let src;
  if (window.innerWidth < 700) {
    src = logoIFCEMobile;
  } else {
    src = logoIFCE;
  }

  const menuItems = ['Items', 'Transações'];

  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu(): void {
    setMenuOpen(!menuOpen);
  }

  const useOnClickOutside = (
    ref: React.RefObject<HTMLDivElement>,
    closeMenu: () => void,
  ) => {
    useEffect(() => {
      const listener = (event: MouseEvent) => {
        if (
          ref.current &&
          event.target &&
          ref.current.contains(event.target as Node)
        ) {
          return;
        }
        closeMenu();
      };

      document.addEventListener('mousedown', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
      };
    }, [ref, closeMenu]);
  };

  const menuMobile = useRef<HTMLDivElement>(null);
  useOnClickOutside(menuMobile, () => setMenuOpen(false));

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
              {menuItems.map(menuItem => (
                <li
                  key={menuItem}
                  className={menuItem === selectedMenu ? 'selectedMenu' : ''}
                >
                  <a href="/">{menuItem}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="menuIcon">
          <button className="menuIconBtn" type="button" onClick={toggleMenu}>
            {!menuOpen ? <FiMenu size="50px" /> : <FiX size="50px" />}
          </button>
        </div>
        {menuOpen && (
          <div className="menuMobile" ref={menuMobile}>
            <nav>
              <ul>
                {menuItems.map(menuItem => (
                  <li
                    key={menuItem}
                    className={menuItem === selectedMenu ? 'selectedMenu' : ''}
                  >
                    <a href="/">{menuItem}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
