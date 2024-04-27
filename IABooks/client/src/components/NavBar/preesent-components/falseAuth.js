import React from "react";

import { LOGIN_ROUTE } from "../../../utils/consts";

const FalseAuth = () => {
  return (
    <div className="nav ml-auto color-white">
      <a href={LOGIN_ROUTE}>
        <div className="transition border text-blue-400 hover:text-violet-400 font-bold py-2 px-4 rounded no-underline hover:-translate-y-1">
          Авторизация
        </div>
      </a>
    </div>
  );
};

export default FalseAuth;
