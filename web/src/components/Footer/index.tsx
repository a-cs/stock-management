/* eslint-disable react/prop-types */
import React from 'react';

import './styles.css';

const Footer: React.FC = () => {
  return (
    <footer className="footerContainer">
      <div className="footerText">
        <h1>Desenvolvido como projeto para a disciplina de TCC</h1>
        <a href="https://br.linkedin.com/in/acarneirosousa">
          <h2>Anderson Carneiro Sousa</h2>
        </a>
        <h3>2021.2</h3>
      </div>
    </footer>
  );
};

export default Footer;
