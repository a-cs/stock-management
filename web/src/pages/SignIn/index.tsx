import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import Footer from '../../components/Footer';

import './styles.css';
import { useAuth } from '../../hooks/auth';

const SignIn: React.FC = () => {
  const history = useHistory();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await signIn({
        email,
        password,
      });
      history.push('/Estoque');
    } catch (error: any) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <>
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
            <h4>{message}</h4>
            <button type="submit" id="loginBtn">
              <FiCheck /> <div className="space" />
              <div>Fazer login</div>
              <div className="space" />
            </button>
            <Link to="/Criar-conta">Criar uma nova conta</Link>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
