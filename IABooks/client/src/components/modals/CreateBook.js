import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { createBook, fetchAuthor, fetchGenres } from "../../http/bookAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";

// Модальное окно в админке для создания нового фильма
const CreateBook = observer(({ show, onHide }) => {
  const { book } = useContext(Context);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  // Запрос на получение данных о жанрах и авторах
  useEffect(() => {
    fetchGenres().then((data) => book.setGenres(data));
    fetchAuthor().then((data) => book.setAuthors(data));
  }, []);

  // Обработчик события выбора файла
  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  // Валидация полей
  const validateFields = () => {
    return (
      name &&
      description &&
      file &&
      book.selectedAuthor &&
      book.selectedAuthor.id &&
      book.selectedGenre &&
      book.selectedGenre.id
    );
  };

  // Добавление нового фильма
  const addBook = () => {
    if (validateFields()) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("img", file);
      formData.append("authorId", book.selectedAuthor.id);
      formData.append("genreId", book.selectedGenre.id);
      createBook(formData).then(() => onHide());
    }
  };

  // Отображение модального окна
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить новую книгу</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4 bg-violet-400">
        <Form>
          <div className="grid grid-cols-2 justify-space-between">
            <Dropdown className="mt-2 mb-2 items-center">
              <p className="text-bold p-2 font-bold text-white">Жанр:</p>
              <Dropdown.Toggle>
                {book.selectedGenre.name || "Выберите жанр"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {book.genres.map((genre) => (
                  <Dropdown.Item
                    key={genre.id}
                    onClick={() => book.setSelectedGenre(genre)}
                  >
                    {genre.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="mt-2 mb-2">
              <p className="text-bold p-2 font-bold text-white">Автор книги:</p>
              <Dropdown.Toggle>
                {book.selectedAuthor.name || "Выберите автора книги"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {book.author.map((author) => (
                  <Dropdown.Item
                    key={author.id}
                    onClick={() => book.setSelectedAuthor(author)}
                  >
                    {author.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <p className="text-bold p-2 font-bold text-white">Название книги:</p>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            placeholder="Введите название книги.."
          />
          <p className="text-bold p-2 font-bold text-white">Описание книги:</p>
          <Form.Control
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-3"
            placeholder="Введите описание книги..."
          />
          <p className="text-bold p-2 font-bold text-white">Обложка книги:</p>
          <Form.Control
            className="mt-3"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={selectFile}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button
          variant="outline-success"
          onClick={addBook}
          disabled={!validateFields()}
        >
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateBook;
