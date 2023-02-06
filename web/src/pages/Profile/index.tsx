import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import api from '../../services/api';

import loadingImg from '../../assets/loading1.gif';
import ChangeNameModal from '../../components/ChangeNameModal';
import ChangeEmailModal from '../../components/ChangeEmailModal';

import './styles.css';
import ChangePasswordModal from '../../components/ChangePasswordModal';

interface User {
  name: string;
  email: string;
}

const Profile: React.FC = () => {
  const history = useHistory();
  const password = '******';
  const [user, setUser] = useState<User>();
  const [userCopy, setUserCopy] = useState<User>();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpenChangeName, setModalOpenChangeName] = useState(false);
  const [modalOpenChangeEmail, setModalOpenChangeEmail] = useState(false);
  const [modalOpenChangePassword, setModalOpenChangePassword] = useState(false);

  function toggleChangeNameModal(): void {
    setModalOpenChangeName(!modalOpenChangeName);
  }

  function toggleChangeEmailModal(): void {
    setModalOpenChangeEmail(!modalOpenChangeEmail);
  }
  function toggleChangePasswordModal(): void {
    setModalOpenChangePassword(!modalOpenChangePassword);
  }

  useEffect(() => {
    setLoading(true);
    api
      .get('users/me')
      .then(response => {
        setLoading(false);
        const { name, email } = response.data[0];
        setUser({ name, email });
        setUserCopy({ name, email });
      })
      .catch((error: any) => {
        setLoading(false);
        setMessage(error.message);
      });
  }, []);

  useEffect(() => {
    if (user && userCopy && user?.name !== userCopy?.name) {
      setUserCopy(user);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  }, [user, userCopy]);

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
      <ChangePasswordModal
        isOpen={modalOpenChangePassword}
        setIsOpen={toggleChangePasswordModal}
        user={user as User}
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
                  readOnly
                  value={password}
                  onClick={toggleChangePasswordModal}
                />
                <span>Senha</span>
                <button type="button" onClick={toggleChangePasswordModal}>
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
