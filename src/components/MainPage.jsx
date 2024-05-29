import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import UserMainPage from "./UserMainPage";
import AdminMainPage from "./AdminMainPage";
import { Context } from "../main";

const MainPage = () => {
  const { userStore } = useContext(Context);

  useEffect(() => {
    // Выполнить какие-то действия, когда userType изменится
  }, [userStore.idRole]);

  if (userStore.isLoading) {
    return <div >Loading...</div>;
  }

  if (localStorage.getItem('userType') == 1 ) {
    return <AdminMainPage />;
  } else if (localStorage.getItem('userType') == 2) {
    return <UserMainPage />;
  } else {
    return <div>Loading...</div>;
  }
};

export default observer(MainPage);
