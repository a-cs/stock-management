import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import api from '../../services/api';

import loadingImg from '../../assets/loading1.gif';

import './styles.css';

const Profile: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('******');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get('users/me')
      .then(response => {
        setLoading(false);
        setId(response.data[0].id);
        setName(response.data[0].name);
        setEmail(response.data[0].email);
      })
      .catch((error: any) => {
        setLoading(false);
        setMessage(error.message);
      });
  }, []);

  return (
    <>
      <Header selectedMenu="Perfil" />
      <div className="containerProfile">
        <div className="contentProfile">
          <div className="titleProfile">
            <h4>Perfil</h4>
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
                  disabled
                  defaultValue={name || ''}
                />
                <span>Nome</span>
                <button type="button">
                  <FiEdit size="20px" strokeWidth="2" />
                </button>
              </label>
              <label htmlFor="email">
                <input
                  id="email"
                  type="email"
                  placeholder=""
                  disabled
                  defaultValue={email || ''}
                />
                <span>Email</span>
                <button type="button">
                  <FiEdit size="20px" strokeWidth="2" />
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
                  <FiEdit size="20px" strokeWidth="2" />
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
