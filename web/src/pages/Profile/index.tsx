import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import api from '../../services/api';

import loadingImg from '../../assets/loading1.gif';
import ChangeNameModal from '../../components/ChangeNameModal';
import ChangeEmailModal from '../../components/ChangeEmailModal';

import './styles.css';

interface User {
  name: string;
  email: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [password, setPassword] = useState('******');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpenChangeName, setModalOpenChangeName] = useState(false);
  const [modalOpenChangeEmail, setModalOpenChangeEmail] = useState(false);

  function toggleChangeNameModal(): void {
    setModalOpenChangeName(!modalOpenChangeName);
  }

  function toggleChangeEmailModal(): void {
    setModalOpenChangeEmail(!modalOpenChangeEmail);
  }

  useEffect(() => {
    setLoading(true);
    api
      .get('users/me')
      .then(response => {
        setLoading(false);
        const { name, email } = response.data[0];
        setUser({ name, email });
      })
      .catch((error: any) => {
        setLoading(false);
        setMessage(error.message);
      });
  }, []);

  return (
    <>
      <Header selectedMenu="Perfil" />
      <ChangeNameModal
        isOpen={modalOpenChangeName}
        setIsOpen={toggleChangeNameModal}
        user={user as User}
        setUser={setUser as React.Dispatch<React.SetStateAction<User>>}
      />
      <ChangeEmailModal
        isOpen={modalOpenChangeEmail}
        setIsOpen={toggleChangeEmailModal}
        user={user as User}
        setUser={setUser as React.Dispatch<React.SetStateAction<User>>}
      />
      <div className="containerProfile">
        <div className="contentProfile">
          <div className="titleProfile">
            <h2>Perfil</h2>
          </div>
          {loading ? (
            <>
              <img src={loadingImg} alt="Loading" />
              <h4>Loading ...</h4>
            </>
          ) : (
            <form className="formProfile">
              <label htmlFor="name">
                <input
                  id="name"
                  type="text"
                  placeholder=""
                  readOnly
                  defaultValue={user?.name || ''}
                  onClick={toggleChangeNameModal}
                />
                <span>Nome</span>
                <button type="button" onClick={toggleChangeNameModal}>
                  <FiEdit size="22px" strokeWidth="2" />
                </button>
              </label>
              <label htmlFor="email">
                <input
                  id="email"
                  type="email"
                  placeholder=""
                  readOnly
                  defaultValue={user?.email || ''}
                  onClick={toggleChangeEmailModal}
                />
                <span>Email</span>
                <button type="button" onClick={toggleChangeEmailModal}>
                  <FiEdit size="22px" strokeWidth="2" />
                </button>
              </label>
              <label htmlFor="password">
                <input
                  id="password"
                  type="password"
                  placeholder=" "
                  disabled
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <span>Senha</span>
                <button type="button">
                  <FiEdit size="22px" strokeWidth="2" />
                </button>
              </label>
              <h4>{message}</h4>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
