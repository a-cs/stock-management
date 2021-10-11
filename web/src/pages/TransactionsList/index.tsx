import React, { useEffect, useState } from 'react';
import { FiPlus, FiEdit, FiAlertCircle } from 'react-icons/fi';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import CreateTransactionModal from '../../components/CreateTransactionModal';
import EditTransactionModal from '../../components/EditTransactionModal';

import api from '../../services/api';

import loadingImg from '../../assets/loading1.gif';

import './styles.css';

interface Item {
  id: string;
  name: string;
  minimal_stock_alarm: string;
  total_stock: string;
}

interface Transaction {
  id: string;
  item_quantity: string;
  type: string;
  item: Item;
}

const TransactionsList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editTransactionId, setEditTransactionId] = useState('0');
  const [modalOpenCreateTransaction, setModalOpenCreateTransaction] =
    useState(false);
  const [modalOpenEditTransaction, setModalOpenEditTransaction] =
    useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  function toggleCreateTransactionModal(): void {
    setModalOpenCreateTransaction(!modalOpenCreateTransaction);
  }
  function toggleEditTransactionModal(): void {
    setModalOpenEditTransaction(!modalOpenEditTransaction);
  }

  useEffect(() => {
    setLoading(true);
    api
      .get('/transactions')
      .then(response => {
        setErrorMsg(false);
        setLoading(false);
        setTransactions(response.data);
      })
      .catch(() => {
        setLoading(false);
        setErrorMsg(true);
      });
  }, []);

  return (
    <div className="container">
      <Header selectedMenu="Movimentações" />
      <CreateTransactionModal
        isOpen={modalOpenCreateTransaction}
        setIsOpen={toggleCreateTransactionModal}
        transactions={transactions}
        setTransactions={setTransactions}
      />
      <EditTransactionModal
        isOpen={modalOpenEditTransaction}
        setIsOpen={toggleEditTransactionModal}
        transactions={transactions}
        setTransactions={setTransactions}
        editTransactionId={editTransactionId}
      />

      <div className="wrapper">
        <div className="content">
          <div className="upper">
            <h2>Movimentações</h2>
            <div className="createItem">
              <button
                type="button"
                className="createItemBtn"
                onClick={toggleCreateTransactionModal}
              >
                <FiPlus /> Criar nova transação
              </button>
              <button
                type="button"
                className="createItemBtnMobile"
                onClick={toggleCreateTransactionModal}
              >
                <FiPlus size="40px" />
              </button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Quantidade</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {transactions
                // .sort((a, b) => Number(a.id) - Number(b.id))
                .map((transaction: Transaction) => (
                  <tr key={transaction.id}>
                    <td data-label="Id">
                      {Number(transaction.id).toLocaleString('pt-BR')}
                    </td>
                    <td data-label="Nome">{transaction.item.name}</td>
                    <td data-label="Tipo">
                      {transaction.type === 'in' ? 'Entrada' : 'Saída'}
                    </td>
                    <td data-label="Quantidade">
                      {Number(transaction.item_quantity).toLocaleString(
                        'pt-BR',
                        {
                          minimumFractionDigits: 3,
                        },
                      )}
                    </td>

                    <td data-label="Editar" className="editTransaction">
                      <button
                        className="editTransactionButton"
                        type="button"
                        onClick={() => {
                          setEditTransactionId(transaction.id);
                          toggleEditTransactionModal();
                        }}
                      >
                        <FiEdit size="20px" strokeWidth="2" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
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
            {transactions.length === 0 && !errorMsg && !loading ? (
              <h4>Nenhum transaction cadastrado</h4>
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

export default TransactionsList;
