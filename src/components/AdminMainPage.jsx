import React from "react";
import { Container } from "react-bootstrap";
import AdminHeader from "./AdminHeader";
import s from "../styles/AdmMain.module.css";
import Footer from "./Footer";

const AdminMainPage = () => {
  return (
    <div className={s.wrapper}>
      <AdminHeader />
      <Container className={s.container}>
        <div className={s.text}>АДМИН ПАНЕЛЬ!</div>
      </Container>
      <Footer />
    </div>
  );
};

export default AdminMainPage;
