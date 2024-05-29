import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import AdminAttractionPage from "./AdminAttractionPage";
import UserAttractionPage from "./UserAttractionPage";
import { Context } from "../main";

const AttractionsPage = () => {
  const { userStore } = useContext(Context);

  useEffect(() => {
    // Any actions to perform when userType changes
  }, [userStore.idRole]);

  if (userStore.isLoading) {
    return <div>Loading...</div>;
  }

  if (localStorage.getItem('userType') == 1) {
    return <AdminAttractionPage />;
  } else if (localStorage.getItem('userType') == 2) {
    return <UserAttractionPage />;
  } else {
    return <div>Loading...</div>;
  }
};

export default observer(AttractionsPage);
