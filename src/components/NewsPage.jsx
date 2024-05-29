import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../main";
import AdminNewsPage from "./AdminNewsPage";
import UserNewsPage from "./UserNewsPage";

const NewsPage = () => {
  const { userStore } = useContext(Context);

  useEffect(() => {
    // Выполнить какие-то действия, когда userType изменится
  }, [userStore.idRole]);

  if (userStore.isLoading) {
    return <div>Loading...</div>;
  }

  if (localStorage.getItem("userType") == 1) {
    return <AdminNewsPage />;
  } else if (localStorage.getItem("userType") == 2) {
    return <UserNewsPage />;
  } else {
    return <div>Loading...</div>;
  }
};

export default observer(NewsPage);
