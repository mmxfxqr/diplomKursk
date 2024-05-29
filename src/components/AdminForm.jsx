import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import AppealService from "../services/Form/FormService";
import styles from "../styles/AdmForm.module.css";
import AdminHeader from "./AdminHeader";
import Footer from "./Footer";

const AdminForm = () => {
  const [appeals, setAppeals] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchAppeals();
  }, []);

  const fetchAppeals = async () => {
    try {
      const data = await AppealService.getAppeals();
      setAppeals(data);
    } catch (error) {
      setErrorMessage("Ошибка при получении обращений.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await AppealService.deleteAppeal(id);
      fetchAppeals(); // Обновить список обращений после удаления
    } catch (error) {
      setErrorMessage("Ошибка при удалении обращения.");
    }
  };

  return (
    <div className={`d-flex flex-column ${styles.container}`}>
      <AdminHeader />
      <Container className={`flex-grow-1 ${styles.formWrapper}`}>
        <h2 className={styles.formTitle}>Управление обращениями</h2>
        {errorMessage && (
          <div className={`alert alert-danger ${styles.alert}`}>
            {errorMessage}
          </div>
        )}
        <div className={styles.formContainer}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Заголовок</th>
                <th>Описание</th>
                <th>Email</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {appeals.map((appeal) => (
                <tr key={appeal.id}>
                  <td>{appeal.id}</td>
                  <td>{appeal.tittle}</td>
                  <td>{appeal.description}</td>
                  <td>{appeal.email}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(appeal.id)}
                    >
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
      <Footer/>
    </div>
  );
};

export default AdminForm;
