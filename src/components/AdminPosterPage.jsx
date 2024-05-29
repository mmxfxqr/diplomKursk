import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";
import PosterService from "../services/Posters/PosterService";
import AdminHeader from "./AdminHeader";
import Footer from "./Footer";
import s from "../styles/AdminPoster.module.css";

const AdminPosterPage = () => {
  const [posterList, setPosterList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [posterData, setPosterData] = useState({
    tittle: "",
    description: "",
    dateStart: "",
    dateEnd: "",
    image: "",
  });
  const [selectedPosterId, setSelectedPosterId] = useState(null);

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

  const fetchSinglePoster = async (id) => {
    try {
      const data = await PosterService.getPosterById(id);
      setPosterData(data);
      setShowModal(true);
    } catch (error) {
      console.error("Ошибка при получении данных афиши:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPosterData({ ...posterData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (selectedPosterId) {
        await PosterService.updatePoster(selectedPosterId, posterData);
      } else {
        await PosterService.createPoster(posterData);
      }
      fetchPosters();
      setShowModal(false);
      setPosterData({
        tittle: "",
        description: "",
        dateStart: "",
        dateEnd: "",
        image: "",
      });
      setSelectedPosterId(null);
    } catch (error) {
      console.error(
        selectedPosterId
          ? "Ошибка при редактировании афиши:"
          : "Ошибка при создании афиши:",
        error
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await PosterService.deletePoster(id);
      fetchPosters();
    } catch (error) {
      console.error("Ошибка при удалении афиши:", error);
    }
  };

  const handleEdit = (id) => {
    setSelectedPosterId(id);
    fetchSinglePoster(id);
  };

  return (
    <div>
      <AdminHeader />
      <Container>
        <h2 className={s.title}>Управление афишами</h2>

        <Table striped bordered hover className={s.posterTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Описание</th>
              <th>Дата начала</th>
              <th>Дата окончания</th>
              <th>Картинка</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {posterList.map((poster) => (
              <tr key={poster.id}>
                <td>{poster.id}</td>
                <td>{poster.tittle}</td>
                <td>{poster.description}</td>
                <td>{new Date(poster.dateStart).toLocaleDateString()}</td>
                <td>{new Date(poster.dateEnd).toLocaleDateString()}</td>
                <td>
                  <img
                    src={poster.image}
                    alt={poster.tittle}
                    className={s.posterImage}
                  />
                </td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(poster.id)}
                    className="mb-2"
                  >
                    Изменить
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(poster.id)}
                  >
                    Удалить
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className={s.addButtonWrapper}>
          <Button
            onClick={() => setShowModal(true)}
            variant="success"
            className={s.addButton}
          >
            Добавить афишу
          </Button>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedPosterId ? "Редактировать афишу" : "Добавить афишу"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formTittle">
                <Form.Label>Название</Form.Label>
                <Form.Control
                  type="text"
                  name="tittle"
                  value={posterData.tittle}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Описание</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={posterData.description}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDateStart">
                <Form.Label>Дата начала</Form.Label>
                <Form.Control
                  type="date"
                  name="dateStart"
                  value={posterData.dateStart}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDateEnd">
                <Form.Label>Дата окончания</Form.Label>
                <Form.Control
                  type="date"
                  name="dateEnd"
                  value={posterData.dateEnd}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formImage">
                <Form.Label>Ссылка на изображение</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  value={posterData.image}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Закрыть
            </Button>
            <div style={{ marginRight: "10px" }}></div>
            <Button variant="primary" onClick={handleSubmit}>
              {selectedPosterId ? "Сохранить" : "Добавить"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Footer />
    </div>
  );
};

export default AdminPosterPage;
