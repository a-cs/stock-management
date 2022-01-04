import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import loadingImg from '../../assets/loading1.gif';

import './styles.css';
import { useAuth } from '../../hocks/auth';

const SignIn: React.FC = () => {
  const history = useHistory();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await signIn({
        email,
        password,
      });
      history.push('/Estoque');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="containerSignIn">
      <div className="contentSignIn">
        <div className="titleSignIn">
          <h4>Login</h4>
        </div>
        <form className="formSignIn" onSubmit={handleSubmit}>
          <label htmlFor="email">
            <input
              id="email"
              type="email"
              placeholder=" "
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <span>Email</span>
          </label>
          <label htmlFor="password">
            <input
              id="password"
              type="password"
              placeholder=" "
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <span>Senha</span>
          </label>
          <button type="submit" id="loginBtn">
            <FiCheck /> <div className="space" />
            <div>Fazer login</div>
            <div className="space" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
