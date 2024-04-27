import React, { useEffect, useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import {
  deleteAuthor,
  deleteGenre,
  fetchAuthor,
  fetchGenres,
} from "../../http/bookAPI";

// Удаление автора или жанра
const DeleteAuthorOrGenre = ({ show, onHide, showSuccessMsgFunc }) => {
  const [authorOrGenre, setAuthorOrGenre] = useState("автор");
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectAuthor, setSelectAuthor] = useState({
    name: "Автор книг не выбран",
  });
  const [selectGenre, setSelectGenre] = useState({ name: "Жанр не выбран" });
  const [showMsgErr, setShowMsgErr] = useState(false);
  const [msgErr, setMsgErr] = useState("");

  useEffect(() => {
    fetchGenres().then((data) => setGenres(data));
    fetchAuthor().then((data) => setAuthors(data));
  }, []);

  // Запрос на удаление автора или жанра
  const Delete = async () => {
    if (authorOrGenre === "Author") {
      if (selectAuthor.name !== "Автор книг не выбран") {
        await deleteAuthor(selectAuthor.id).then((data) => {
          showSuccessMsgFunc(data);
          onHide();
          setSelectAuthor({ name: "Автор книг не выбран" });
        });
      } else {
        setMsgErr("Пожалуйста выберите жанр");
        setShowMsgErr(true);
      }
    } else {
      if (selectGenre.name !== "Жанр не выбран") {
        await deleteGenre(selectGenre.id).then((data) => {
          showSuccessMsgFunc(data);
          onHide();
          setSelectGenre({ name: "Жанр не выбран" });
        });
      } else {
        setMsgErr("Пожалуйста выберите жанр");
        setShowMsgErr(true);
      }
    }
  };

  useEffect(
    () => setShowMsgErr(false),
    [selectGenre, selectAuthor, authorOrGenre]
  );

  // Вывод модального окна для удаления автора или жанра
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить жанр или автора книг</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4 bg-violet-400">
        {showMsgErr && (
          <>
            <p style={{ color: "red", textAlign: "center" }}>{msgErr}</p>
          </>
        )}
        <p className="text-bold p-3 font-bold text-white">Выберите, что хотетите удалить, жанр или автора</p>
        <Dropdown className="mb-3" style={{ margin: "0 auto" }}>
          <Dropdown.Toggle id="dropdown-basic">
            {authorOrGenre}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {authorOrGenre === "Author" ? (
              <Dropdown.Item disabled>Автор книг</Dropdown.Item>
            ) : (
              <Dropdown.Item onClick={() => setAuthorOrGenre("Author")}>
                Автор книг
              </Dropdown.Item>
            )}
            {authorOrGenre === "Genre" ? (
              <Dropdown.Item disabled>Жанр</Dropdown.Item>
            ) : (
              <Dropdown.Item onClick={() => setAuthorOrGenre("Genre")}>
                Жанр
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
        <p className="text-bold p-3 font-bold text-white">Выберите, {authorOrGenre === "Author" ? "автора" : "жанр"}, который хотети удалить</p>
        
        <Dropdown className="mb-3" style={{ margin: "0 auto" }}>
          <Dropdown.Toggle id="dropdown-basic">
            {authorOrGenre === "Author"
              ? selectAuthor.name
              : selectGenre.name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {authorOrGenre === "Author"
              ? authors.map(({ id, name }) =>
                  selectAuthor.name === name ? (
                    <Dropdown.Item disabled key={id}>
                      {name}
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item
                      key={id}
                      onClick={() => setSelectAuthor({ id, name })}
                    >
                      {name}
                    </Dropdown.Item>
                  )
                )
              : genres.map(({ id, name }) =>
                  selectGenre.name === name ? (
                    <Dropdown.Item disabled key={id}>
                      {name}
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item
                      key={id}
                      onClick={() => setSelectGenre({ id, name })}
                    >
                      {name}
                    </Dropdown.Item>
                  )
                )}
          </Dropdown.Menu>
        </Dropdown>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-danger" onClick={Delete}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteAuthorOrGenre;
