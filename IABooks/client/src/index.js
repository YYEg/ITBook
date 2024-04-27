import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/tailwind.css";

import UserStore from "./store/UserStore";
import BookStore from "./store/BookStore";
import BookshelfStore from "./store/BookshelfStore";

export const Context = createContext(null);

// Начальная инициализация контекста
ReactDOM.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      book: new BookStore(),
      bookshelf: new BookshelfStore(),
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById("root")
);
