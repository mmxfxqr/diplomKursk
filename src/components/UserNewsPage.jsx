import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import NewsService from "../services/News/NewsService";
import Footer from "./Footer";
import Header from "./Header";
import sort from '../assets/sort.svg';
import sortUp from '../assets/sortUp.svg';
import s from "../styles/UserNews.module.css";

const UserNewsPage = () => {
  const [newsList, setNewsList] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const data = await NewsService.getAllNews();
      setNewsList(data);
    } catch (error) {
      console.error("Ошибка при получении списка новостей:", error);
    }
  };

  const handleSortChange = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  const sortedNewsList = [...newsList].sort((a, b) => {
    if (sortOrder === "desc") {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });

  return (
    <div>
      <Header />
      <Container>
        <h2 style={{ marginTop: "40px", textAlign: "center" }}>
          Новости г. Курск
        </h2>
        <div className={s.sortButtonContainer}>
          <Button onClick={handleSortChange} variant="success" className={s.sortButton}>
            <img style={{ maxWidth: 30, maxHeight: 30 }} src={sortOrder === "desc" ? sort : sortUp} />
          </Button>
        </div>
        <Row>
          {sortedNewsList.map((news) => (
            <Col key={news.id} sm={12} md={6} lg={4} className={s.cardColumn}>
              <Card className={s.newsCard}>
                <Card.Img
                  variant="top"
                  src={news.image}
                  alt={news.tittle}
                  className={s.cardImage}
                />
                <Card.Body className={s.cardBody}>
                  <Card.Title>{news.tittle}</Card.Title>
                  <Card.Text>{news.description}</Card.Text>
                </Card.Body>
                <Card.Footer className={s.cardFooter}>
                  <small className="text-muted">
                    Дата: {new Date(news.date).toLocaleDateString()}
                  </small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default UserNewsPage;
