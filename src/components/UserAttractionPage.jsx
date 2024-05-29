import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import AttractionService from '../services/Attractions/AttractionService';

const UserAttractionPage = () => {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    fetchAttractions();
  }, []);

  const fetchAttractions = async () => {
    try {
      const data = await AttractionService.getAllAttractions();
      setAttractions(data);
    } catch (error) {
      console.error('Ошибка при загрузке достопримечательностей:', error);
    }
  };

  return (
    <div>
      <Header />
      <Container className='mb-5'>
        <h2 style={{ marginTop: '40px', textAlign: 'center'}}>Достопримечательности</h2>
        <p style={{ textAlign: 'center', marginBottom: '20px', fontSize: '14px' }}>
          Достопримечательности Курска включают исторические и культурные памятники, красивые парки и архитектурные шедевры. Здесь вы найдете множество интересных мест для посещения, которые помогут вам лучше узнать город и его богатую историю.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {attractions.map(attraction => (
            <Card
              key={attraction.id}
              style={{ width: '800px', margin: '10px auto' }}
            >
              <Card.Img variant="top" src={attraction.image} />
              <Card.Body>
                <Card.Title style={{textAlign: 'center'}} >{attraction.name}</Card.Title>
                <Card.Text>{attraction.description}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default UserAttractionPage;
