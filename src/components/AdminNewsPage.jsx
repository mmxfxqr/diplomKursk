import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";
import NewsService from "../services/News/NewsService";
import Footer from "./Footer";
import AdminHeader from "./AdminHeader";
import s from "../styles/AdminNews.module.css";

const categories = [
  { id: 1, name: "Социальные проблемы" },
  { id: 2, name: "Спорт" },
  { id: 3, name: "ДТП" },
  { id: 4, name: "Культура" },
  { id: 5, name: "Политика" },
];

const AdminNewsPage = () => {
  const [newsList, setNewsList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newNews, setNewNews] = useState({
    tittle: "",
    description: "",
    image: "",
    idCategory: 1,
    date: new Date().toISOString().split('T')[0]
  });
  const [selectedNews, setSelectedNews] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNews((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddNews = async () => {
    try {
      await NewsService.createNews(newNews);
      setNewNews({
        tittle: "",
        description: "",
        image: "",
        idCategory: 1,
        date: new Date().toISOString().split('T')[0]
      });
      fetchNews();
      setShowAddModal(false);
    } catch (error) {
      console.error("Ошибка при добавлении новости:", error);
    }
  };

  const handleDeleteNews = async (id) => {
    try {
      await NewsService.deleteNews(id);
      fetchNews();
    } catch (error) {
      console.error("Ошибка при удалении новости:", error);
    }
  };

  const handleEditNews = async () => {
    try {
      await NewsService.updateNews(selectedNews.id, selectedNews);
      fetchNews();
      setShowEditModal(false);
    } catch (error) {
      console.error("Ошибка при редактировании новости:", error);
    }
  };

  const openEditModal = (news) => {
    setSelectedNews(news);
    setShowEditModal(true);
  };

  return (
    <div>
      <AdminHeader />
      <Container>
        <div>
          <h3 className={s.title}>Список новостей</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Заголовок</th>
                <th>Описание</th>
                <th>Изображение</th>
                <th>Категория</th>
                <th>Дата</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {newsList.map((news) => (
                <tr key={news.id}>
                  <td>{news.tittle}</td>
                  <td>{news.description}</td>
                  <td>
                    <img src={news.image} alt={news.tittle} style={{ width: "100px" }} />
                  </td>
                  <td>{categories.find(category => category.id === news.idCategory)?.name || "Неизвестно"}</td>
                  <td>{new Date(news.date).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => openEditModal(news)}
                      className={s.edit}
                    >
                      Изменить
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteNews(news.id)}
                      className={s.delete}
                    >
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className={s.add}>
            <Button variant="success" onClick={() => setShowAddModal(true)}>
              Добавить
            </Button>
          </div>
        </div>

        {/* Модальное окно добавления */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить новость</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formTittle">
                <Form.Label>Заголовок</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите заголовок"
                  name="tittle"
                  value={newNews.tittle}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Описание</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите описание"
                  name="description"
                  value={newNews.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formImage">
                <Form.Label>URL изображения</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите URL изображения"
                  name="image"
                  value={newNews.image}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formCategory">
                <Form.Label>Категория</Form.Label>
                <Form.Control
                  as="select"
                  name="idCategory"
                  value={newNews.idCategory}
                  onChange={handleInputChange}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formDate">
                <Form.Label>Дата</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={newNews.date}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={handleAddNews}>
              Добавить новость
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Модальное окно редактирования */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Редактировать новость</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formTittle">
                <Form.Label>Заголовок</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите заголовок"
                  name="tittle"
                  value={selectedNews ? selectedNews.tittle : ""}
                  onChange={(e) =>
                    setSelectedNews((prevState) => ({
                      ...prevState,
                      tittle: e.target.value,
                    }))
                  }
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Описание</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите описание"
                  name="description"
                  value={selectedNews ? selectedNews.description : ""}
                  onChange={(e) =>
                    setSelectedNews((prevState) => ({
                      ...prevState,
                      description: e.target.value,
                    }))
                  }
                />
              </Form.Group>
              <Form.Group controlId="formImage">
                <Form.Label>URL изображения</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите URL изображения"
                  name="image"
                  value={selectedNews ? selectedNews.image : ""}
                  onChange={(e) =>
                    setSelectedNews((prevState) => ({
                      ...prevState,
                      image: e.target.value,
                    }))
                  }
                />
              </Form.Group>
              <Form.Group controlId="formCategory">
                <Form.Label>Категория</Form.Label>
                <Form.Control
                  as="select"
                  name="idCategory"
                  value={selectedNews ? selectedNews.idCategory : ""}
                  onChange={(e) =>
                    setSelectedNews((prevState) => ({
                      ...prevState,
                      idCategory: e.target.value,
                    }))
                  }
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formDate">
                <Form.Label>Дата</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={selectedNews ? selectedNews.date : ""}
                  onChange={(e) =>
                    setSelectedNews((prevState) => ({
                      ...prevState,
                      date: e.target.value,
                    }))
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={handleEditNews}>
              Сохранить
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Footer />
    </div>
  );
};

export default AdminNewsPage;
