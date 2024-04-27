import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDeleteBook, fetchOneBook, updateBook } from "../http/bookAPI";
import { Context } from "../index";
import { ADMIN_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

const BookEditPage = observer(() => {
  const { book } = useContext(Context);
  const { id } = useParams();
  const [bookCurr, setBookCurr] = useState({});
  const [showMsg, setShowMsg] = useState(false);
  const [msg, setMsg] = useState("");

  const [selectAuthor, setSelectAuthor] = useState(null);
  const [selectGenre, setSelectGenre] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState(0);
  const [img, setImg] = useState("");
  const [imgFile, setImgFile] = useState(null);

  const [isDisabledPutBtn, setDisabledPutBtn] = useState(true);
  const navigate = useNavigate();

  const deleteBook = () => {
    fetchDeleteBook(id).then(() => {
      navigate(ADMIN_ROUTE);
    });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Обновить инфо о книге
  const putBook = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("img", imgFile);
    if (selectAuthor) {
      formData.append("authorId", selectAuthor.id);
    }

    if (selectGenre) {
      formData.append("genreId", selectGenre.id);
    }

    updateBook(id, formData).then((data) => {
      setMsg(data); // Сообщение об успехе установить
      setShowMsg(true); // Сообщение об успехе показать
      setTimeout(() => setShowMsg(false), 5000); // Спрятать сообщение через 5 секунд
    });
  };

  useEffect(() => {
    const isGenreChanged = selectGenre?.id !== bookCurr.genre?.id;
    const isAuthorChanged = selectAuthor?.id !== bookCurr.author?.id;

    if (
      isGenreChanged ||
      isAuthorChanged ||
      bookCurr.name !== name ||
      bookCurr.description !== description ||
      img
    ) {
      setDisabledPutBtn(false);
    } else {
      setDisabledPutBtn(true);
    }
  }, [name, selectAuthor, selectGenre, description, img, bookCurr]);

  useEffect(() => {
    fetchOneBook(id).then((data) => {
      setBookCurr(data);
      setSelectAuthor(data.author);
      setSelectGenre(data.genre);
      setName(data.name);
      setDescription(data.description);
    });
  }, [id]);

  return (
    <Container className="mt-3">
      <Row>
        <Col xs={12}>
          <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-500 md:text-5xl lg:text-6xl dark:text-black items-center text-center">
            Страница редактирования книги
          </h1>
          <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black items-center text-center border-b-4 border-black">
            {bookCurr.name}
          </h1>
          <Row className="mt-4 border-b-2 border-black">
            <Col
              xs={2}
              className="text-bold p-2 font-extrabold text-black text-2xl justify-center flex items-center "
            >
              Автор:
            </Col>
            <Col xs={10}>
              <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle className="text-black w-full h-16 text-xl font-bold">
                  {selectAuthor?.name || "Выберите автора"}
                </Dropdown.Toggle>
                <Dropdown.Menu className="text-black w-full text-xl font-bold">
                  {book.author.map((author) => (
                    <Dropdown.Item
                      key={author.id}
                      onClick={() => setSelectAuthor(author)}
                      active={selectAuthor?.id === author.id} // Сравниваем айдишки
                    >
                      {author.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row className="mt-4 border-b-2 border-black">
            <Col
              xs={2}
              className="text-bold p-2 font-extrabold text-black text-2xl justify-center flex items-center"
            >
              Жанр:
            </Col>
            <Col xs={10}>
              <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle className="text-black w-full h-16 text-xl font-bold">
                  {selectGenre?.name || "Выберите жанр"}
                </Dropdown.Toggle>
                <Dropdown.Menu className="text-black w-full text-xl font-bold">
                  {book.genres.map((genre) => {
                    return genre.name === selectGenre?.name ? (
                      <Dropdown.Item key={genre.id} disabled>
                        {genre.name}
                      </Dropdown.Item>
                    ) : (
                      <Dropdown.Item
                        key={genre.id}
                        onClick={() => setSelectGenre(genre)}
                      >
                        {genre.name}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row className="mt-4 border-b-2 border-black">
            <Col
              xs={1}
              className="text-bold p-2 font-extrabold text-black text-2xl justify-center flex items-center"
            >
              Название:
            </Col>
            <Col xs={8}>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col xs={3} className="d-flex align-items-center">
              {name.length === 0 && (
                <b style={{ color: "red" }}>
                  Пожалуйста введите название книги...
                </b>
              )}
            </Col>
          </Row>
          <Row className="mt-4 border-b-2 border-black">
            <Col
              xs={1}
              className="text-bold p-2 font-extrabold text-black text-2xl justify-center flex items-center"
            >
              Описание:
            </Col>
            <Col xs={8}>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
            <Col xs={3} className="d-flex align-items-center">
              {description.length === 0 && (
                <b style={{ color: "red" }}>
                  Пожалуйста введите описание книги...
                </b>
              )}
            </Col>
          </Row>

          <Row className="mt-5 mr-1 grid grid-cols-2">
            {isDisabledPutBtn ? (
              <Button className="disabled bg-gray-500 border-gray-500">
                Редактирование не доступно, измениените данные
              </Button>
            ) : (
              <Button
                onClick={putBook}
                className="bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600"
              >
                Отредактировать
              </Button>
            )}

            <Button
              className="ml-1 bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
              onClick={handleShow}
            >
              Удалить
            </Button>
          </Row>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Удалить книгу {bookCurr.name}?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="outline-danger" onClick={deleteBook}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
});

export default BookEditPage;
