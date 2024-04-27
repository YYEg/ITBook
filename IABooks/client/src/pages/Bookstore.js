import React, { useContext, useEffect } from "react";
import BookList from "../components/BookList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchAuthor, fetchBook, fetchGenres } from "../http/bookAPI";
import GenreBar from "../components/GenreBar";

const Bookstore = observer(() => {
  const { book } = useContext(Context);

  useEffect(() => {
    fetchGenres().then((data) => book.setGenres(data));
    fetchAuthor().then((data) => book.setAuthors(data));
    fetchBook(null, null, 1, 45).then((data) => {
      book.setBooks(data.rows);
      book.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    if (book.selectedGenre === "all") {
      fetchBook(null, book.selectedAuthor.id, book.page, 45).then((data) => {
        book.setBooks(data.rows);
        book.setTotalCount(data.count);
      });
    } else {
      fetchBook(
        book.selectedGenre.id,
        book.selectedAuthor.id,
        book.page,
        45
      ).then((data) => {
        book.setBooks(data.rows);
        book.setTotalCount(data.count);
      });
    }
  }, [book.page, book.selectedGenre, book.selectedAuthor]);

  // Отображение главной страницы
  return (
    <div className="min-h-screen container mx-auto w-7/8 m-auto bg-white shadow-2xl rounded-2xl border-t-8 border-violet-200">
      <div>
        <GenreBar />
        <BookList />
      </div>
    </div>
  );
});

export default Bookstore;
