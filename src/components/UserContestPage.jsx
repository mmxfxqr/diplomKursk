import React, { useState, useEffect } from 'react';
import ContestService from '../services/Contest/ContestService';
import { Container, Card, Button } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';

const UserContestPage = () => {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      const data = await ContestService.getAllContests();
      setContests(data);
    } catch (error) {
      console.error('Ошибка при загрузке конкурсов:', error);
    }
  };

  return (
    <div>
      <Header />
      <Container className='mb-5'>
        <h2 style={{ marginTop: '40px', textAlign: 'center'}}>Конкурсы</h2>
        <p style={{ textAlign: 'center', marginBottom: '20px' }}>Работы присылать на почту: infoKursk@mail.ru</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {contests.map(contest => (
            <Card
              key={contest.id}
              style={{ width: '800px', margin: '10px auto' }}
            >
              <Card.Img variant="top" src={contest.image} />
              <Card.Body>
                <Card.Title>{contest.tittle}</Card.Title>
                <Card.Text>{contest.description}</Card.Text>
                <div style={{ textAlign: 'right' }}>
                  <div>Дата начала: {new Date(contest.dateStart).toLocaleDateString()}</div>
                  <div>Дата конца: {new Date(contest.dateEnd).toLocaleDateString()}</div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default UserContestPage;
