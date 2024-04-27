import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Image,
  ListGroup,
  Pagination,
  Row,
} from "react-bootstrap";

import { getAllBooksInAdminPage } from "../http/bookAPI";
import { NavLink } from "react-router-dom";
import { BOOK_EDIT_ROUTE } from "../utils/consts";
import { BOOK_ROUTE } from "../utils/consts";

const EditItemPage = () => {
  const [searchBook, setSearchBook] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(1);

  const [successMsg, setSuccessMsg] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  //неудачная пагинация
  const limit = 45;
  const pageCount = Math.ceil(Number(count) / limit);
  const pages = [];
  for (let number = 1; number < pageCount + 1; number++) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    getAllBooksInAdminPage(searchBook, currentPage, filter).then(
      ({ count, rows }) => {
        setSearchedBooks(rows);
        setCount(count);
      }
    );
  }, [currentPage]);

  useEffect(() => {
    getAllBooksInAdminPage(searchBook, 1, filter).then(({ count, rows }) => {
      setSearchedBooks(rows);
      setCount(count);
      setCurrentPage(1);
    });
  }, [filter, successMsg]);

  // Отображение
  return (
    <Container className="d-flex flex-column">
      {showSuccessMsg && <p>{successMsg}</p>}
      <ListGroup>
        {searchedBooks &&
          searchedBooks.map(({ id, img, author, genre, description, name }) => {
            return (
              <ListGroup.Item
                className="mt-3  rounded-2xl shadow-2xl hover:-translate-y-1 hover:scale-105 transition hover:shadow-3xl"
                key={id}
              >
                <Row>
                  <Col xs={2}>
                    <Image
                      className="rounded-2xl shadow-2xl"
                      style={{ width: "140px", height: "200px" }}
                      src={process.env.REACT_APP_API_URL + img}
                    />
                  </Col>
                  <Col xs={8} className="d-flex flex-column mt-4">
                    <div className="grid grid-cols-3 border-b-2">
                      <p className="text-bold p-2 font-bold text-black">
                        Название:
                      </p>
                      <div className="text-bold p-2 font-extrabold text-black">
                        {name}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 border-b-2">
                      <p className="text-bold p-2 font-bold text-black">
                        Описание:
                      </p>
                      <div className="text-bold p-2 font-extrabold text-black line-clamp-3">
                        {description}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 border-b-2">
                      <p className="text-bold p-2 font-bold text-black">
                        Производитель:
                      </p>
                      <div className="text-bold p-2 font-extrabold text-black line-clamp-1">
                        {author?.name || "Не указано"}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 border-b-2">
                      <p className="text-bold p-2 font-bold text-black">
                        Жанр:
                      </p>
                      <div className="text-bold p-2 font-extrabold text-black line-clamp-1">
                        {genre?.name || "Не указано"}
                      </div>
                    </div>
                  </Col>
                  <Col
                    xs={2}
                    className="d-flex align-items-center grid grid-rows-2"
                  >
                    <div className="grid grid-rows-2 gap-8">
                      <NavLink
                        to={BOOK_EDIT_ROUTE + `/${id}`}
                        className="text-center text-bold p-2 font-bold text-black border-2 rounded-2xl justify-center items-center hover:text-violet-400 hover:-translate-y-1 transition"
                      >
                        Отредактировать
                      </NavLink>
                      <NavLink
                        to={BOOK_ROUTE + `/${id}`}
                        className="text-bold p-2 font-bold text-black border-2 rounded-2xl justify-center items-center hover:text-violet-400 hover:-translate-y-1 transition"
                      >
                        Перейти на страницу книги
                      </NavLink>
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </Container>
  );
};

export default EditItemPage;
