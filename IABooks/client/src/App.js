import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";

import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import { Container, Spinner } from "react-bootstrap";
import { Context } from "./index";
import { check } from "./http/userAPI";
import { getBookFromBookshelf } from "./http/bookAPI";
import "./index.css";

const App = observer(() => {
  const { user, bookshelf } = useContext(Context);
  const [loading, setLoading] = useState(false);

  //проверка на авторизацию
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoading(true);
      check()
        .then((data) => {
          user.setUser(data);
          user.setIsAuth(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  //Загрузка списка избранных книг - книжной полки
  useEffect(() => {
    if (user.isAuth === false) {
      bookshelf.setDeleteAllBookFromBookshelf();
      const savedBookshelf = JSON.parse(localStorage.getItem("bookshelf"));
      for (let key in savedBookshelf) {
        bookshelf.setBookshelf(savedBookshelf[key]);
      }
    } else if (user.isAuth === true) {
      bookshelf.setDeleteAllBookFromBookshelf();
      getBookFromBookshelf().then((data) => {
        for (let key in data) {
          bookshelf.setBookshelf(data[key], true);
        }
      });
    }
  }, [bookshelf, user.isAuth]);

  //Если идет подгрузка, то мы выводим анимацию крутяшки
  if (loading) {
    return <Spinner animation="grow" />;
  }

  //Выводим основное приложение
  return (
    <BrowserRouter>
      <div class="min-h-screen bg-violet-200">
        <NavBar />
        <Container>
          <AppRouter />
        </Container>
      </div>
    </BrowserRouter>
  );
});
export default App;
