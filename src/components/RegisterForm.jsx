import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Form, Button } from "react-bootstrap";
import { Context } from "../main";
import s from "../styles/Login.module.css";

// Объявление компонента RegisterForm с использованием observer для отслеживания изменений в MobX
const RegisterForm = observer(() => {
  // Получение доступа к хранилищу пользователей из контекста
  const { userStore } = useContext(Context);

  // Использование useState для создания состояний для логина, пароля, имени, фамилии, электронной почты,
  // подтверждения пароля и ошибки
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  // Получение объекта для навигации между страницами
  const navigate = useNavigate();
  const idRole = 2;
  // Функция обработки отправки формы
  const handleSubmit = async (event) => {
    event.preventDefault(); // Предотвращение действия по умолчанию для отправки формы

    // Проверка на заполненность всех полей формы
    if (
      !login ||
      !password ||
      !name ||
      !surname ||
      !email ||
      !confirmPassword
    ) {
      setError("Все поля должны быть заполненны");
      return;
    }

    // Проверка на совпадение пароля и подтверждения пароля
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      setError(null); // Сброс ошибки перед отправкой запроса на регистрацию
      await userStore.register({
        login,
        password,
        name,
        surname,
        email,
        idRole,
      }); // Вызов метода для регистрации пользователя
      console.log("Registration successful");
      navigate("/main"); // Перенаправление на главную страницу после успешной регистрации
    } catch (error) {
      setError("Ошибка при регистрации. Попробуйте еще раз."); // Обработка ошибки при регистрации
    }
  };

  // Отрисовка компонента RegisterForm
  return (
    <div className={s.mainFormContainer}>
      <Form className={s.mainForm} onSubmit={handleSubmit}>
        {/* Поля ввода для имени, фамилии, электронной почты, логина, пароля и подтверждения пароля */}
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите имя"
            value={name}
            onChange={(e) => setName(e.target.value)} // Обновление состояния имени при изменении значения поля ввода
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSurname">
          <Form.Label>Фамилия</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите фамилию"
            value={surname}
            onChange={(e) => setSurname(e.target.value)} // Обновление состояния фамилии при изменении значения поля ввода
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Почта</Form.Label>
          <Form.Control
            type="email"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Обновление состояния электронной почты при изменении значения поля ввода
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLogin">
          <Form.Label>Логин</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)} // Обновление состояния логина при изменении значения поля ввода
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Обновление состояния пароля при изменении значения поля ввода
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Подтвердите пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Обновление состояния подтверждения пароля при изменении значения поля ввода
          />
        </Form.Group>

        {/* Отображение сообщения об ошибке, если оно есть */}
        {error && <div className="text-danger">{error}</div>}

        <div className={s.formFooter}>
          {/* Ссылка для перехода на страницу авторизации */}
          <div className="mt-3">
            <Link to="/" className={s.linkLogin}>
              Уже есть аккаунт?
            </Link>
          </div>

          {/* Кнопка для отправки формы */}
          <Button variant="success" type="submit" className={s.submitBtn}>
            Регистрация
          </Button>
        </div>
      </Form>
    </div>
  );
});

// Экспорт компонента RegisterForm
export default RegisterForm;
