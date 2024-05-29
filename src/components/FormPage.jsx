// FormPage.jsx
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Context } from "../main";
import UserForm from "./UserForm";
import AdminForm from "./AdminForm";

const FormPage = () => {
  const { userStore } = useContext(Context);

  useEffect(() => {
    // Выполнить какие-то действия, когда userType изменится
  }, [userStore.idRole]);

  if (userStore.isLoading) {
    return <div>Loading...</div>;
  }

  if (localStorage.getItem("userType") == 1) {
    return <AdminForm />;
  } else if (localStorage.getItem("userType") == 2) {
    return <UserForm />;
  } else {
    return <div>Loading...</div>;
  }
};

export default observer(FormPage);
