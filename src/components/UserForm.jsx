// UserForm.jsx
import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import AppealService from "../services/Form/FormService";
import styles from "../styles/Form.module.css";
import Header from "./Header";
import Footer from "./Footer";

const UserForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const userId = parseInt(localStorage.getItem("userId"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AppealService.createAppeal({
        Tittle: title,
        Description: description,
        Email: email,
        IdUser: userId,
      });
      setSuccessMessage("Ваше обращение успешно отправлено.");
      setTitle("");
      setDescription("");
      setEmail("");
    } catch (error) {
      setErrorMessage("Произошла ошибка при отправке обращения.");
    }
  };

  return (
    <div className={`d-flex flex-column ${styles.container}`}>
        <Header/>
      <Container className={`flex-grow-1 ${styles.formWrapper}`}>
        <h2 className={styles.formTitle}>Отправить обращение</h2>
        <div className={styles.formContainer}>
          {errorMessage && (
            <div className={`alert alert-danger ${styles.alert}`}>
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className={`alert alert-success ${styles.alert}`}>
              {successMessage}
            </div>
          )}
          <Form onSubmit={handleSubmit} className={styles.customForm}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Введите email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTitle" className="mt-3">
              <Form.Label>Заголовок</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите заголовок"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Введите описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end mt-4">
              <Button variant="success" type="submit" className={styles.submitButton}>
                Отправить
              </Button>
            </div>
          </Form>
        </div>
      </Container>
      <Footer/>
    </div>
  );
};

export default UserForm;
