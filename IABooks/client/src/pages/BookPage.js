import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addBookToBookshelf, fetchOneBook } from "../http/bookAPI";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const BookPage = observer(() => {
  const { user, bookshelf } = useContext(Context);
  const [book, setBook] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchOneBook(id).then((data) => setBook(data));
  }, [id]);

  const isBookInBookshelf = () => {
    const findBook = bookshelf.Bookshelf.findIndex(
      (item) => Number(item.id) === Number(book.id)
    );
    return findBook < 0;
  };

  const addBookInBookshelf = (book) => {
    if (user.isAuth) {
      addBookToBookshelf(book).then(() => bookshelf.setBookshelf(book, true));
    } else {
      bookshelf.setBookshelf(book);
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        {/* Часть с картинкой книги */}
        <div className="col md-3 gap-4">
          <img
            className="rounded-2xl"
            style={{ cursor: "pointer", width: "450px", height: "600px" }}
            src={process.env.REACT_APP_API_URL + book.img}
          />
        </div>
        <div className="col md-9 gap-4">
          {/* Часть с авторами и заголовком */}
          <div className="flex items-center text-xl text-center justify-center font-bold text-slate-400 pb-2">
            {book.author?.name}
          </div>
          <h2 className="flex justify-center items-center text-2xl font-bold text-black-400 pb-4">
            {book.name}
          </h2>

          {/* Часть с кнопкой для добавления в избранное */}
          {isBookInBookshelf() ? (
            <button
              onClick={() => addBookInBookshelf(book)}
              class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded hover:-translate-y-1 transition w-full"
            >
              Добавить в список
            </button>
          ) : (
            <button
              onClick={() => bookshelf.setDeleteItemBookshelf(book)}
              class="transition border-2 border-red-400  text-red-400 font-bold py-2 px-4 rounded no-underline hover:-translate-y-1 w-full"
            >
              Удалить из списка
            </button>
          )}
          <div class="group relative w-full bg-gray-100 rounded-2xl p-4 transition-all duration-500 mt-5">
            <div class="text-xl font-bold text-gray-900 flex items-center mb-2 w-full">
              Описание произведения:
            </div>
            <p class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5">
              {book.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default BookPage;
