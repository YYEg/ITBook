import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import BookItem from "./BookItem";

const BookList = observer(() => {
  const { book } = useContext(Context);
  console.log(book);

  // Список книг
  return (
    <div className="grid grid-cols-4 gap-4">
      {book.books.map((book) => (
        <BookItem key={book.id} bookItem={book} />
      ))}
    </div>
  );
});

export default BookList;
