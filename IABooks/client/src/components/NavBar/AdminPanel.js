import React, { useContext } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { ADMIN_ROUTE } from "../../utils/consts";
import { useNavigate } from "react-router-dom";

// Допуск к панели администратора, кнопка "Администратор"
const AdminPanel = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  if (user.User.role === "ADMIN") {
    return (
      <div>
        <div
          className="transition border text-blue-400 hover:text-violet-600 font-bold py-2 px-4 rounded no-underline hover:-translate-y-1 ml-3"
          onClick={() => {
            navigate(ADMIN_ROUTE);
          }}
        >
          Аминистратор
        </div>
      </div>
    );
  } else return <div></div>;
});
export default AdminPanel;
