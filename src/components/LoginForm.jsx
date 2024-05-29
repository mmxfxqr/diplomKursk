import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Form, Button } from 'react-bootstrap';
import { Context } from '../main';
import s from '../styles/Login.module.css';

// Объявление компонента LoginForm с использованием observer для отслеживания изменений в MobX
const LoginForm = observer(() => {
  // Получение доступа к хранилищу пользователей из контекста
  const { userStore } = useContext(Context);

  // Использование useState для создания состояний для логина, пароля и ошибки
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Получение объекта для навигации между страницами
  const navigate = useNavigate();

  // Функция обработки отправки формы
  const handleSubmit = async (event) => {
    event.preventDefault(); // Предотвращение действия по умолчанию для отправки формы

    // Проверка на заполненность полей логина и пароля
    if (!login || !password) {
      setError('Заполните все поля');
      return;
    }

    try {
      setError(null); // Сброс ошибки перед отправкой запроса на авторизацию
      await userStore.login(login, password); // Вызов метода для авторизации пользователя
      navigate('/main'); // Перенаправление на главную страницу после успешной авторизации
    } catch (error) {
      setError('Ошибка при авторизации. Попробуйте еще раз.'); // Обработка ошибки при авторизации
    }
  };

  // Отрисовка компонента LoginForm
  return (
    <div className={s.mainFormContainer}>
      <Form className={s.mainForm} onSubmit={handleSubmit}>
        {/* Поле ввода для логина */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Логин</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)} // Обновление состояния логина при изменении значения поля ввода
          />
        </Form.Group>

        {/* Поле ввода для пароля */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Обновление состояния пароля при изменении значения поля ввода
          />
        </Form.Group>

        {/* Отображение сообщения об ошибке, если оно есть */}
        {error && <div className="text-danger">{error}</div>}

        <div className={s.formFooter}>
          {/* Ссылка для перехода на страницу регистрации */}
          <div className="mt-3">
            <Link to="/registration" className={s.linkLogin}>
              Зарегистрироваться
            </Link>
          </div>

          {/* Кнопка для отправки формы */}
          <Button variant="success" type="submit" className={s.submitBtn}>
            Войти
          </Button>
        </div>
      </Form>
    </div>
  );
});

// Экспорт компонента LoginForm
export default LoginForm;
