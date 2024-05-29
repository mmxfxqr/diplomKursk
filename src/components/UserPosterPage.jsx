import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import PosterService from "../services/Posters/PosterService";
import Footer from "./Footer";
import Header from "./Header";
import sort from '../assets/sort.svg';
import sortUp from '../assets/sortUp.svg';
import s from "../styles/UserPoster.module.css";

const UserPosterPage = () => {
  const [posterList, setPosterList] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetchPosters();
  }, []);

  const fetchPosters = async () => {
    try {
      const data = await PosterService.getAllPosters();
      setPosterList(data);
    } catch (error) {
      console.error("Ошибка при получении списка афиш:", error);
    }
  };

  const handleSortChange = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  const sortedPosterList = [...posterList].sort((a, b) => {
    if (sortOrder === "desc") {
      return new Date(b.dateStart) - new Date(a.dateStart);
    } else {
      return new Date(a.dateStart) - new Date(b.dateStart);
    }
  });

  return (
    <div>
      <Header />
      <Container className="mb-5">
        <h2 style={{ marginTop: "40px", textAlign: "center" }}>
          Афиша спектаклей в Курске
        </h2>
        <div className={s.sortButtonContainer}>
          <Button onClick={handleSortChange} variant="success" className={s.sortButton}>
            <img style={{ maxWidth: 30, maxHeight: 30 }} src={sortOrder === "desc" ? sort : sortUp} />
          </Button>
        </div>
        <Row>
          {sortedPosterList.map((poster) => (
            <Col key={poster.id} sm={12} md={6} lg={6} xl={6} className={s.cardColumn}>
              <Card className={s.posterCard}>
                <Card.Img variant="top" src={poster.image} className={s.cardImage} />
                <Card.Body className={s.cardBody}>
                  <Card.Title>{poster.tittle}</Card.Title>
                  <Card.Text>{poster.description}</Card.Text>
                </Card.Body>
                <Card.Footer className={s.cardFooter}>
                  <small className="text-muted">
                   Дата:  {new Date(poster.dateStart).toLocaleDateString()} - {new Date(poster.dateEnd).toLocaleDateString()}
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

export default UserPosterPage;
