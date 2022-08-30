/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiUser, FiX } from 'react-icons/fi';
import { isEqual } from 'lodash';

import { useAuth } from '../../hooks/auth';

import logoIFCE from '../../assets/logo_ifce_fortaleza.png';

import './styles.css';
import api from '../../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
  is_allowed: boolean;
}

interface HeaderProps {
  selectedMenu: string;
}

const Header: React.FC<HeaderProps> = ({ selectedMenu }) => {
  const { signOut } = useAuth();
  const user = JSON.parse(localStorage.getItem('@EstoqueLEM:user') as any);
  const [newUser, setNewUser] = useState<User>();
  const menuItems = [''];

  useEffect(() => {
    api.get('/users/me').then(response => {
      setNewUser(response.data[0]);
    });
  }, []);

  if (newUser && user && !isEqual(newUser, user)) {
    localStorage.setItem('@EstoqueLEM:user', JSON.stringify(newUser));
  }
  if (user?.is_allowed) {
    menuItems.push('Estoque');
    menuItems.push('Categorias');
    menuItems.push('Movimentações');
  }

  if (user?.is_allowed && user?.is_admin) {
    menuItems.push('Admin');
  }

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
        <div className="logo">
          <img src={logoIFCE} alt="Logo IFCE" />
          <h2>Laboratório de Ensaios Mecânicos</h2>
        </div>
        <div className="menu">
          <Link
            to="/Perfil"
            className={
              selectedMenu === 'Perfil' ? 'userInfo selectedMenu' : 'userInfo'
            }
          >
            <FiUser size="28px" strokeWidth="3" />
            <h3>{user?.name || 'Usuário'}</h3>
          </Link>
          <nav>
            <ul>
              {menuItems.map(menuItem => (
                <li
                  key={menuItem}
                  className={menuItem === selectedMenu ? 'selectedMenu' : ''}
                >
                  <Link
                    to={`/${menuItem.replace(/ç/g, 'c').replace(/õ/g, 'o')}`}
                  >
                    {menuItem}
                  </Link>
                </li>
              ))}
              <li key="sair" className="">
                <Link to="/" onClick={() => signOut()}>
                  Sair
                </Link>
              </li>
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
            <Link
              to="/Perfil"
              className={
                selectedMenu === 'Perfil' ? 'userInfo selectedMenu' : 'userInfo'
              }
            >
              <FiUser size="28px" strokeWidth="3" />
              <h3>{user?.name || 'Usuário'}</h3>
            </Link>
            <nav>
              <ul>
                {menuItems.map(menuItem => (
                  <Link
                    to={`/${menuItem.replace(/ç/g, 'c').replace(/õ/g, 'o')}`}
                    key={menuItem}
                  >
                    <li
                      className={
                        menuItem === selectedMenu ? 'selectedMenu' : ''
                      }
                    >
                      {menuItem}
                    </li>
                  </Link>
                ))}
                <Link to="/" onClick={() => signOut()} key="sair">
                  <li className="">Sair </li>
                </Link>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
