import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createAuthor } from "../../http/bookAPI";

const CreateAuthor = ({ show, onHide }) => {
  const [value, setValue] = useState("");

  //Добавление нового автора
  const addAuthor = () => {
    createAuthor({ name: value }).then((data) => {
      setValue("");
      onHide();
    });
  };

  // Отображение модального окна для добавления нового автора
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить автора книг</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4 bg-violet-400">
        <Form>
          <Form.Control
            placeholder="Введите автора книг..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={() => addAuthor()}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateAuthor;
