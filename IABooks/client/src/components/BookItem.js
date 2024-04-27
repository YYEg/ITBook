import React from "react";
import { useNavigate } from "react-router-dom";
import { BOOK_ROUTE } from "../utils/consts";

const BookItem = ({bookItem}) => {
  const navigate = useNavigate();
  console.log(bookItem);

  // Карточка книги
  return (
    <div
      className="flex flex-col md-3 mt-3"
      onClick={() => navigate(BOOK_ROUTE + "/" + bookItem.id)}
    >
      <div
        className="p-2 rounded-2xl bg-white shadow-2xl hover:-translate-y-1 hover:scale-105 transition hover:shadow-3xl w-4/5 h-full"
        style={{ cursor: "pointer" }}
      >
        <img
          className="rounded-2xl h-4/5 w-full"
          style={{ cursor: "pointer", width: "200px", height: "250px" }}
          src={process.env.REACT_APP_API_URL + bookItem.img}
        />
        <div className="text-slate-200 font-bold text-blue-500">
          <div className="text-black-50">
            {(bookItem && bookItem?.author?.name) || "Не указан"}
          </div>
        </div>
        <div className="font-bold text-slate-400">{bookItem.name}</div>
      </div>
    </div>
  );
};

export default BookItem;
