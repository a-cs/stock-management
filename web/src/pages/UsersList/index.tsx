import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiCheck, FiX, FiEdit, FiAlertCircle } from 'react-icons/fi';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import api from '../../services/api';

import loadingImg from '../../assets/loading1.gif';

import './styles.css';
import { useAuth } from '../../hocks/auth';

interface User {
  id: string;
  name: string;
  is_admin: boolean;
  is_allowed: boolean;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editUserId, setEditUserId] = useState('0');
  const [modalOpenEditUser, setModalOpenEditUser] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user: myUser } = useAuth();
  function toggleEditUserModal(): void {
    setModalOpenEditUser(!modalOpenEditUser);
  }

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    api
      .get('/users')
      .then(response => {
        setErrorMsg(false);
        setLoading(false);
        setUsers(response.data);
      })
      .catch(() => {
        setLoading(false);
        setErrorMsg(true);
      });
  }, []);

  return (
    <div className="container">
      <Header selectedMenu="Admin" />

      {/* <EditUserModal
        isOpen={modalOpenEditUser}
        setIsOpen={toggleEditUserModal}
        items={users}
        setUsers={setUsers}
        editUserId={editUserId}
      /> */}

      <div className="wrapper">
        <div className="content">
          <div className="upper">
            <h2>Usuarios</h2>
          </div>
          {myUser.is_admin ? (
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Admin</th>
                  <th>Permitido</th>
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: User) => (
                  <tr key={user.id}>
                    <td data-label="Id">
                      {Number(user.id).toLocaleString('pt-BR')}
                    </td>
                    <td data-label="Nome">{user.name}</td>
                    <td data-label="Admin">
                      {user.is_admin ? (
                        <div>
                          <FiCheck
                            size="20px"
                            strokeWidth="5"
                            color="var(--color-light-green)"
                          />
                        </div>
                      ) : (
                        <div>
                          <FiX
                            size="20px"
                            strokeWidth="5"
                            color="var(--color-red)"
                          />
                        </div>
                      )}
                    </td>
                    <td data-label="Permitidon">
                      {user.is_allowed ? (
                        <div>
                          <FiCheck
                            size="20px"
                            strokeWidth="5"
                            color="var(--color-light-green)"
                          />
                        </div>
                      ) : (
                        <div>
                          <FiX
                            size="20px"
                            strokeWidth="5"
                            color="var(--color-red)"
                          />
                        </div>
                      )}
                    </td>
                    <td data-label="Editar" className="editUser">
                      <button
                        className="editButton"
                        type="button"
                        onClick={() => {
                          setEditUserId(user.id);
                          toggleEditUserModal();
                        }}
                      >
                        <FiEdit size="20px" strokeWidth="2" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="errorMsg">
              <button type="button" onClick={() => history.goBack()}>
                <FiAlertCircle size="40px" />{' '}
                <h4>
                  Você não tem permissão de acessar essa página, entre em
                  contato com um administrador
                </h4>
              </button>
            </div>
          )}

          <div className="errorMsg">
            {loading ? (
              <>
                <img src={loadingImg} alt="Loading" />
                <h4>Loading ...</h4>
              </>
            ) : (
              <div />
            )}
            {errorMsg ? (
              <button type="button" onClick={() => window.location.reload()}>
                <FiAlertCircle size="40px" />{' '}
                <h4>
                  Não foi possivel conectar ao servidor, clique aqui para tentar
                  novamente
                </h4>
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UsersList;
