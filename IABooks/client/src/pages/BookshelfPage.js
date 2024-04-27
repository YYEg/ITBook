import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "../index";
import OneBookInBookshelf from "../components/oneBookInBookshelf";

const BookshelfPage = observer(() => {
  const { bookshelf } = useContext(Context);
  console.log(bookshelf);
  if (bookshelf.Bookshelf.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        <div className="text-center mt-5" style={{ fontSize: 28 }}>
          <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black items-center text-center">
            Пустой список
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 grid grid-cols-4 gap-6">
      {bookshelf.Bookshelf.map((book) => (
        <OneBookInBookshelf key={book.id} book={book} />
      ))}
    </div>
  );
});

export default BookshelfPage;
