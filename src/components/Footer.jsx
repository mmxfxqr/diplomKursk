import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import s from '../styles/Footer.module.css';
import logo from '../assets/logoSvg.svg';

const Footer = () => {
  return (
    <footer className={s.footer}>
      <Container>
        <Row>
          <Col md={12} className="text-center">
            <img src={logo} alt="Логотип" className={s.logo} />
          </Col>
        </Row>
        <Row>
          <Col md={6} className="text-center">
            <h4>О нас</h4>
            <p>Мы - команда энтузиастов, создающая информационный портал о городе Курск. Наша цель - предоставить жителям и гостям города актуальную информацию о событиях, достопримечательностях и жизни города.</p>
          </Col>
          <Col md={6} className="text-center">
            <h4>Контакты</h4>
            <p>Телефон: +7 (999) 555-22-33</p>
            <p>Email: infoKursk@mail.ru</p>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="text-center">
            <p>© {new Date().getFullYear()} Все права защищены.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
