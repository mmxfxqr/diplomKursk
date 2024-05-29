import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";
import ContestService from "../services/Contest/ContestService";
import Footer from "./Footer";
import AdminHeader from "./AdminHeader";
import s from "../styles/AdminContest.module.css";

const AdminContestPage = () => {
  const [contests, setContests] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newContest, setNewContest] = useState({
    tittle: "",
    description: "",
    image: "",
    dateStart: "",
    dateEnd: "",
  });
  const [selectedContest, setSelectedContest] = useState(null);

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    try {
      const data = await ContestService.getAllContests();
      setContests(data);
    } catch (error) {
      console.error("Ошибка при получении списка конкурсов:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddContest = async () => {
    try {
      await ContestService.createContest(newContest);
      setNewContest({
        tittle: "",
        description: "",
        image: "",
        dateStart: "",
        dateEnd: "",
      });
      fetchContests();
      setShowAddModal(false);
    } catch (error) {
      console.error("Ошибка при добавлении конкурса:", error);
    }
  };

  const handleDeleteContest = async (id) => {
    try {
      await ContestService.deleteContest(id);
      fetchContests();
    } catch (error) {
      console.error("Ошибка при удалении конкурса:", error);
    }
  };

  const handleEditContest = async () => {
    try {
      await ContestService.updateContest(selectedContest.id, selectedContest);
      fetchContests();
      setShowEditModal(false);
    } catch (error) {
      console.error("Ошибка при редактировании конкурса:", error);
    }
  };

  const openEditModal = (contest) => {
    setSelectedContest(contest);
    setShowEditModal(true);
  };

  return (
    <div>
      <AdminHeader />
      <Container>
        <div>
          <h3 className={s.tittle}>Список конкурсов</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Заголовок</th>
                <th>Описание</th>
                <th>Дата начала</th>
                <th>Дата конца</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {contests.map((contest) => (
                <tr key={contest.id}>
                  <td>{contest.tittle}</td>
                  <td>{contest.description}</td>
                  <td>{new Date(contest.dateStart).toLocaleDateString()}</td>
                  <td>{new Date(contest.dateEnd).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => openEditModal(contest)}
                      className={s.edit}
                    >
                      Изменить
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteContest(contest.id)}
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
            <Modal.Title>Добавить новый конкурс</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formTittle">
                <Form.Label>Заголовок</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите заголовок"
                  name="tittle"
                  value={newContest.tittle}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Описание</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите описание"
                  name="description"
                  value={newContest.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formImage">
                <Form.Label>URL изображения</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите URL изображения"
                  name="image"
                  value={newContest.image}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formDateStart">
                <Form.Label>Дата начала</Form.Label>
                <Form.Control
                  type="date"
                  name="dateStart"
                  value={newContest.dateStart}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formDateEnd">
                <Form.Label>Дата конца</Form.Label>
                <Form.Control
                  type="date"
                  name="dateEnd"
                  value={newContest.dateEnd}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={handleAddContest}>
              Добавить конкурс
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Модальное окно редактирования */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Редактировать конкурс</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formTittle">
                <Form.Label>Заголовок</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите заголовок"
                  name="tittle"
                  value={selectedContest ? selectedContest.tittle : ""}
                  onChange={(e) =>
                    setSelectedContest((prevState) => ({
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
                  value={selectedContest ? selectedContest.description : ""}
                  onChange={(e) =>
                    setSelectedContest((prevState) => ({
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
                  value={selectedContest ? selectedContest.image : ""}
                  onChange={(e) =>
                    setSelectedContest((prevState) => ({
                      ...prevState,
                      image: e.target.value,
                    }))
                  }
                />
              </Form.Group>
              <Form.Group controlId="formDateStart">
                <Form.Label>Дата начала</Form.Label>
                <Form.Control
                  type="date"
                  name="dateStart"
                  value={selectedContest ? selectedContest.dateStart : ""}
                  onChange={(e) =>
                    setSelectedContest((prevState) => ({
                      ...prevState,
                      dateStart: e.target.value,
                    }))
                  }
                />
              </Form.Group>
              <Form.Group controlId="formDateEnd">
                <Form.Label>Дата конца</Form.Label>
                <Form.Control
                  type="date"
                  name="dateEnd"
                  value={selectedContest ? selectedContest.dateEnd : ""}
                  onChange={(e) =>
                    setSelectedContest((prevState) => ({
                      ...prevState,
                      dateEnd: e.target.value,
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
            <Button variant="primary" onClick={handleEditContest}>
              Сохранить
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Footer />
    </div>
  );
};

export default AdminContestPage;
