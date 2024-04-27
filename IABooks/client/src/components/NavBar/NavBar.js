import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import { BOOKSTORE_ROUTE } from "../../utils/consts";
import TrueAuth from "./preesent-components/trueAuth";
import FalseAuth from "./preesent-components/falseAuth";
import logo from "./../../assets/l3.png";

// навбар
const NavBar = observer(() => {
  const { user } = useContext(Context);

  // Отображение навбара в зависимости от того авторизирован пользователь или нет
  return (
    <div className="top-0 z-50 bg-white bg-opacity-500  rounded-2xl w-5/6 mx-auto shadow-xl">
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-2">
        <div className="flex flex-row gap-4 items-center justify-start mx-auto">
          <img
            src={logo}
            alt="logoimage"
            className="w-14 hover:-translate-y-1  hover:rotate-6 transition cursor-pointer"
          />
          <a
            className="text-2xl font-semibold hover:no-underline text-blue-400 hover:text-violet-600 hover:-translate-y-1 transition"
            href={BOOKSTORE_ROUTE}
          >
            Книжный магазин
          </a>
        </div>
        <div className="w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 cursor-pointer">
            {user.isAuth ? <TrueAuth /> : <FalseAuth />}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default NavBar;
