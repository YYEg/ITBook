import React, { useContext } from "react";
import { Context } from "../../../index";
import { useNavigate } from "react-router-dom";
import AdminPanel from "../AdminPanel";
import { BOOKSHELF_ROUTE } from "../../../utils/consts";
const TrueAuth = () => {
  const { user, bookshelf } = useContext(Context);
  const navigate = useNavigate();

  // выход из аккаунта
  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem("token");
    bookshelf.resetBookshelf();
  };


  // Залогиненный навбар
  return (
    <div className="nav ml-auto color-white">
      <div
        className="transition border text-blue-400 hover:text-violet-600 font-bold py-2 px-4 rounded no-underline hover:-translate-y-1 mx-3"
        onClick={() => {
          navigate(BOOKSHELF_ROUTE);
        }}
      >
        Мой список книг
      </div>
      <div
        onClick={() => logOut()}
        className="transition border text-blue-400 hover:text-violet-600 font-bold py-2 px-4 rounded no-underline hover:-translate-y-1"
      >
        Выйти
      </div>
      <AdminPanel />
    </div>
  );
};

export default TrueAuth;
