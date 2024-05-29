import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";
import AttractionService from "../services/Attractions/AttractionService";
import Footer from "./Footer";
import AdminHeader from "./AdminHeader";
import s from "../styles/AdminAttraction.module.css";

const AdminAttractionPage = () => {
  const [attractions, setAttractions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newAttraction, setNewAttraction] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  useEffect(() => {
    fetchAttractions();
  }, []);

  const fetchAttractions = async () => {
    try {
      const data = await AttractionService.getAllAttractions();
      setAttractions(data);
    } catch (error) {
      console.error("Ошибка при получении списка достопримечательностей:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAttraction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddAttraction = async () => {
    try {
      await AttractionService.createAttraction(newAttraction);
      setNewAttraction({
        name: "",
        description: "",
        image: "",
      });
      fetchAttractions();
      setShowAddModal(false);
    } catch (error) {
      console.error("Ошибка при добавлении достопримечательности:", error);
    }
  };

  const handleDeleteAttraction = async (id) => {
    try {
      await AttractionService.deleteAttraction(id);
      fetchAttractions();
    } catch (error) {
      console.error("Ошибка при удалении достопримечательности:", error);
    }
  };

  const handleEditAttraction = async () => {
    try {
      await AttractionService.updateAttraction(selectedAttraction.id, selectedAttraction);
      fetchAttractions();
      setShowEditModal(false);
    } catch (error) {
      console.error("Ошибка при редактировании достопримечательности:", error);
    }
  };

  const openEditModal = (attraction) => {
    setSelectedAttraction(attraction);
    setShowEditModal(true);
  };

  return (
    <div>
      <AdminHeader />
      <Container>
        <div>
          <h3 className={s.title}>Список достопримечательностей</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Название</th>
                <th>Описание</th>
                <th>Изображение</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {attractions.map((attraction) => (
                <tr key={attraction.id}>
                  <td>{attraction.name}</td>
                  <td>{attraction.description}</td>
                  <td>
                    <img src={attraction.image} alt={attraction.name} style={{ width: "100px" }} />
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => openEditModal(attraction)}
                      className={s.edit}
                    >
                      Изменить
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteAttraction(attraction.id)}
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
            <Button className={s.Subm} variant="success" onClick={() => setShowAddModal(true)}>
              Добавить
            </Button>
          </div>
        </div>

        {/* Модальное окно добавления */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить новую достопримечательность</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Название</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите название"
                  name="name"
                  value={newAttraction.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Описание</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите описание"
                  name="description"
                  value={newAttraction.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formImage">
                <Form.Label>URL изображения</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите URL изображения"
                  name="image"
                  value={newAttraction.image}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={handleAddAttraction}>
              Добавить достопримечательность
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Модальное окно редактирования */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Редактировать достопримечательность</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Название</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите название"
                  name="name"
                  value={selectedAttraction ? selectedAttraction.name : ""}
                  onChange={(e) =>
                    setSelectedAttraction((prevState) => ({
                      ...prevState,
                      name: e.target.value,
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
                  value={selectedAttraction ? selectedAttraction.description : ""}
                  onChange={(e) =>
                    setSelectedAttraction((prevState) => ({
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
                  value={selectedAttraction ? selectedAttraction.image : ""}
                  onChange={(e) =>
                    setSelectedAttraction((prevState) => ({
                      ...prevState,
                      image: e.target.value,
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
            <Button variant="primary" onClick={handleEditAttraction}>
              Сохранить
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Footer />
    </div>
  );
};

export default AdminAttractionPage;
