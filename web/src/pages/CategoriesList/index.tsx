import React, { useEffect, useState } from 'react';
import { FiPlus, FiEdit, FiAlertCircle } from 'react-icons/fi';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import CreateCategoryModal from '../../components/CreateCategoryModal';
import EditCategoryModal from '../../components/EditCategoryModal';

import api from '../../services/api';

import loadingImg from '../../assets/loading1.gif';

import './styles.css';

interface Category {
  id: string;
  name: string;
}

const CategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editCategoryId, setEditCategoryId] = useState('0');
  const [modalOpenCreateCategory, setModalOpenCreateCategory] = useState(false);
  const [modalOpenEditCategory, setModalOpenEditCategory] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  function toggleCreateCategoryModal(): void {
    setModalOpenCreateCategory(!modalOpenCreateCategory);
  }
  function toggleEditCategoryModal(): void {
    setModalOpenEditCategory(!modalOpenEditCategory);
  }

  useEffect(() => {
    setLoading(true);
    api
      .get('/categories')
      .then(response => {
        setErrorMsg(false);
        setLoading(false);
        setCategories(response.data);
      })
      .catch(() => {
        setLoading(false);
        setErrorMsg(true);
      });
  }, []);

  return (
    <div className="containerCategoriesList">
      <Header selectedMenu="Categorias" />
      <CreateCategoryModal
        isOpen={modalOpenCreateCategory}
        setIsOpen={toggleCreateCategoryModal}
        categories={categories}
        setCategories={setCategories}
      />
      <EditCategoryModal
        isOpen={modalOpenEditCategory}
        setIsOpen={toggleEditCategoryModal}
        categories={categories}
        setCategories={setCategories}
        editCategoryId={editCategoryId}
      />

      <div className="wrapperCategoriesList">
        <div className="contentCategoriesList">
          <div className="upperCategoriesList">
            <h2>Categorias</h2>
            <div className="createCategory">
              <button
                type="button"
                className="createCategoryBtn"
                onClick={toggleCreateCategoryModal}
              >
                <FiPlus /> Criar nova categoria
              </button>
              <button
                type="button"
                className="createCategoryBtnMobile"
                onClick={toggleCreateCategoryModal}
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
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {categories
                // .sort((a, b) => Number(a.id) - Number(b.id))
                .map((category: Category) => (
                  <tr key={category.id}>
                    <td data-label="Id">
                      {Number(category.id).toLocaleString('pt-BR')}
                    </td>
                    <td data-label="Nome">{category.name}</td>
                    <td data-label="Editar" className="editCategoriesList">
                      <button
                        className="editButtonCategoriesList"
                        type="button"
                        onClick={() => {
                          setEditCategoryId(category.id);
                          toggleEditCategoryModal();
                        }}
                      >
                        <FiEdit size="20px" strokeWidth="2" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="errorMsgCategoriesList">
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
            {categories.length === 0 && !errorMsg && !loading ? (
              <h4>Nenhuma categoria cadastrada</h4>
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

export default CategoriesList;
