import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { LOGIN_ROUTE, REGISTRATION_ROUTE, BOOKSTORE_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      navigate(BOOKSTORE_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <div class="container px-6 mx-auto">
      <div class="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
        <div class="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
          <div class="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
            <h2 class="flex justify-center text-3xl font-bold text-blue-400 hover:text-gray-600 mb-5">
              {isLogin ? "Вход" : "Регистрация"}
            </h2>

            <form class="w-full">
              <div id="input" class="flex flex-col w-full my-5">
                <label for="email" class="text-gray-500 mb-2">
                  Email
                </label>
                <input
                  placeholder="Введите Email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                />
              </div>

              <div id="input" class="flex flex-col w-full my-5">
                <label for="password" class="text-gray-500 mb-2">
                  Пароль
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Введите пароль..."
                  id="password"
                  class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                />
              </div>

              <div id="button" class="flex flex-col w-full my-5">
                <button
                  type="button"
                  class="w-full py-4 bg-green-600 rounded-lg text-green-100 text-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg hover:-translate-y-1 transition"
                  onClick={click}
                  onSubmit={click}
                >
                  <div class="flex flex-row items-center justify-center">
                    <div class="mr-2">
                      <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        ></path>
                      </svg>
                    </div>
                    <div class="font-bold">
                      {isLogin ? "Войти" : "Создать аккаунт"}
                    </div>
                  </div>
                </button>
                <div class="flex justify-evenly mt-5">
                  <a
                    href="#"
                    class="w-full text-center font-medium text-gray-500"
                  >
                    Восстановить пароль!
                  </a>
                  {isLogin ? (
                    <a
                      href={REGISTRATION_ROUTE}
                      class="w-full text-center font-medium text-gray-500"
                    >
                      Создать аккаунт!
                    </a>
                  ) : (
                    <a
                      href={LOGIN_ROUTE}
                      class="w-full text-center font-medium text-gray-500"
                    >
                      Войти!
                    </a>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Auth;
