import React, { useEffect, useState } from "react";
import {
  Container,
  Pagination,
} from "react-bootstrap";

import CreateBook from "../components/modals/CreateBook";
import CreateAuthor from "../components/modals/CreateAuthor";
import CreateGenre from "../components/modals/CreateGenre";
import { getAllBooksInAdminPage } from "../http/bookAPI";
import { useNavigate } from "react-router-dom";
import { BOOK_LIST_EDIT_ROUTE } from "../utils/consts";
import DeleteAuthorOrGenre from "../components/modals/DeleteAuthorOrGenre";

const Admin = () => {
  const [authorVisible, setAuthorVisible] = useState(false);
  const [genreVisible, setGenreVisible] = useState(false);
  const [filmVisible, setFilmVisible] = useState(false);
  const [deleteAuthorOrGenre, setDeleteAuthorOrGenre] = useState(false);

  const [searchBook, setSearchBook] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(1);

  const [successMsg, setSuccessMsg] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const navigate = useNavigate();

  //Пагинация мб?
  const limit = 5;
  const pageCount = Math.ceil(Number(count) / limit);
  const pages = [];
  for (let number = 1; number < pageCount + 1; number++) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    getAllBooksInAdminPage(searchBook, currentPage, filter).then(
      ({ count, rows }) => {
        setSearchedBooks(rows);
        setCount(count);
      }
    );
  }, [currentPage]);

  useEffect(() => {
    getAllBooksInAdminPage(searchBook, 1, filter).then(({ count, rows }) => {
      setSearchedBooks(rows);
      setCount(count);
      setCurrentPage(1);
    });
  }, [filter, successMsg]);

  
// сообщение об удаче
  const showSuccessMsgFunc = (msg) => {
    setSuccessMsg(msg);
    setShowSuccessMsg(true);
    setTimeout(() => setShowSuccessMsg(false), 5000);
  };

  // Отбражение страницы админа
  return (
    <Container className="d-flex flex-column">
      {showSuccessMsg && <p>{successMsg}</p>}

      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white items-center text-center">
        Страница администратора
      </h1>
      <h2 class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-6xl items-center text-center">
        Работа с книгами
      </h2>

      <button
        onClick={() => setFilmVisible(true)}
        type="button"
        class="mt-4  h-20 text-xl text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Добавить книгу на сайт
      </button>
      <button
        onClick={() => navigate(BOOK_LIST_EDIT_ROUTE)}
        type="button"
        class="mt-4  h-20 text-xl text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Перейти к списку всех книг сайта, для их редактирования
      </button>

      <h2 class="mt-8 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-6xl items-center text-center">
        Работа с подкатегориями
      </h2>
      <button
        onClick={() => setGenreVisible(true)}
        type="button"
        class="mt-4  h-20 text-xl text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Добавить новый жанр
      </button>
      <button
        onClick={() => setAuthorVisible(true)}
        type="button"
        class="mt-4 h-20 text-xl text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Добавить нового автора книг
      </button>
      <button
        onClick={() => setDeleteAuthorOrGenre(true)}
        type="button"
        class="mt-4  h-20 text-xl text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Удалить автора книг или жанр книг
      </button>

      <CreateBook show={filmVisible} onHide={() => setFilmVisible(false)} />
      <CreateAuthor
        show={authorVisible}
        onHide={() => setAuthorVisible(false)}
      />
      <CreateGenre show={genreVisible} onHide={() => setGenreVisible(false)} />
      <DeleteAuthorOrGenre
        show={deleteAuthorOrGenre}
        onHide={() => setDeleteAuthorOrGenre(false)}
        showSuccessMsgFunc={showSuccessMsgFunc}
      />
    </Container>
  );
};

export default Admin;
