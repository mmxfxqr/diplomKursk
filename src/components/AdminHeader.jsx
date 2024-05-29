import React, { useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import s from "../styles/Header.module.css"; // Изменение импорта на новый файл стилей
import logoSvg from "../assets/logoSvg.svg";

const AdminHeader = () => {
  const { userStore } = useContext(Context);
  const { pathname } = useLocation(); // Получаем текущий путь

  const userType = localStorage.getItem("userType");

  if (userType === "1") {
    return (
      <Navbar bg="none" expand="lg" className={s.header}>
        <Container>
          <Navbar.Brand as={Link} to="/main">
            <img src={logoSvg} className={s.logo} alt="logo" />
            Админ Панель
          </Navbar.Brand>{" "}
          {/* Изменение текста на "Админ Панель" */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/news"
                className={pathname === "/news" ? s.activeLink : ""}
              >
                Новости
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/contest"
                className={pathname === "/contest" ? s.activeLink : ""}
              >
                Конкурсы
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/events"
                className={pathname === "/events" ? s.activeLink : ""}
              >
                Афиша
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/attractions"
                className={pathname === "/attractions" ? s.activeLink : ""}
              >
                Достопримечательности
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/form"
                className={pathname === "/form" ? s.activeLink : ""}
              >
                Вопросы {/* Изменение текста на "Вопросы" */}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Text>
            Зарегистрирован: <Link to="/">{userStore.user.email}</Link>
          </Navbar.Text>
        </Container>
      </Navbar>
    );
  } else {
    return null;
  }
};

export default observer(AdminHeader);
