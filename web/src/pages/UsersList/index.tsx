import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiCheck, FiX, FiEdit, FiAlertCircle } from 'react-icons/fi';
import { GrPowerReset } from 'react-icons/gr';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import EditUserPrivilegesModal from '../../components/EditUserPrivilegesModal';

import loadingImg from '../../assets/loading1.gif';

import './styles.css';
import ResetPasswordModal from '../../components/ResetPasswordModal';

interface User {
  id: string;
  name: string;
  email?: string;
  is_admin: boolean;
  is_allowed: boolean;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userToReset, setUserToReset] = useState<User>({
    id: '',
    name: '',
    email: '',
    is_admin: false,
    is_allowed: false,
  });
  const [editUserId, setEditUserId] = useState('0');
  const [modalOpenEditUser, setModalOpenEditUser] = useState(false);
  const [modalOpenResetPassword, setModalOpenResetPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    user: { id },
  } = useAuth();

  function toggleEditUserModal(): void {
    setModalOpenEditUser(!modalOpenEditUser);
  }

  function toggleResetPasswordModal(): void {
    setModalOpenResetPassword(!modalOpenResetPassword);
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

  const myUser = users.filter(userItem => userItem.id === id)[0];

  return (
    <div className="containerUsersList">
      <Header selectedMenu="Admin" />

      <EditUserPrivilegesModal
        isOpen={modalOpenEditUser}
        setIsOpen={toggleEditUserModal}
        users={users}
        setUsers={setUsers}
        editUserId={editUserId}
      />
      <ResetPasswordModal
        isOpen={modalOpenResetPassword}
        setIsOpen={toggleResetPasswordModal}
        user={userToReset}
      />

      <div className="wrapperUsersList">
        <div className="contentUsersList">
          <div className="upperUsersList">
            <h2>Usuarios</h2>
          </div>
          <div className="errorMsgUsersList" id={!loading ? 'notVisible' : ''}>
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
          {!loading ? (
            <div id={loading ? 'notVisible' : ''}>
              {myUser?.is_admin ? (
                <table className="tableUsersList">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Nome</th>
                      <th>Admin</th>
                      <th>Permitido</th>
                      <th className="resetPassword">Resetar Senha</th>
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
                        <td data-label="Permitido">
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
                        <td
                          data-label="Resetar Senha"
                          className="resetPassword"
                        >
                          <button
                            className="iconButton"
                            type="button"
                            onClick={() => {
                              setUserToReset(user);
                              toggleResetPasswordModal();
                            }}
                          >
                            <GrPowerReset size="20px" strokeWidth="1" />
                          </button>
                        </td>
                        <td data-label="Editar" className="editUser">
                          <button
                            className="iconButton"
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
                <div className="errorMsgUsersList">
                  <button type="button" onClick={() => history.goBack()}>
                    <FiAlertCircle size="40px" />{' '}
                    <h4>
                      Você não tem permissão de acessar essa página, entre em
                      contato com um administrador
                    </h4>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UsersList;
