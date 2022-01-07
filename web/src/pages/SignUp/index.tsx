import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import Footer from '../../components/Footer';
import api from '../../services/api';

import './styles.css';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const user = { name, email, password };
      try {
        await api.post('/users', user);
        setMessage('Usuário criado com sucesso!');
      } catch (error: any) {
        setMessage(error.response.data.message);
      }
    } else {
      setMessage('As senhas não são iguais!');
    }
  };

  return (
    <>
      <div className="containerSignUp">
        <div className="contentSignUp">
          <div className="titleSignUp">
            <h4>Criar conta</h4>
          </div>
          <form className="formSignUp" onSubmit={handleSubmit}>
            <label htmlFor="name">
              <input
                id="name"
                type="text"
                placeholder=" "
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <span>Nome</span>
            </label>
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
            <label htmlFor="confirmPassword">
              <input
                id="confirmPassword"
                type="password"
                placeholder=" "
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <span>Confirmar</span>
            </label>
            <h4>{message}</h4>
            <button type="submit" id="confirmBtn">
              <FiCheck /> <div className="space" />
              <div>Criar conta</div>
              <div className="space" />
            </button>
            <Link to="/">Voltar para Login</Link>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
