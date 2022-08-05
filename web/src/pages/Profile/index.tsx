import React, { useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import api from '../../services/api';

import './styles.css';

const Profile: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  return (
    <>
      <Header selectedMenu="Perfil" />
      Profile
      <Footer />
    </>
  );
};

export default Profile;
