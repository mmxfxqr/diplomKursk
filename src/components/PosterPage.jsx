import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from "../main";
import AdminPosterPage from "./AdminPosterPage";
import UserPosterPage from "./UserPosterPage";

const PosterPage = () => {
  const { userStore } = useContext(Context);

  useEffect(() => {
    // Выполнить какие-то действия, когда userType изменится
  }, [userStore.idRole]);

  if (userStore.isLoading) {
    return <div>Loading...</div>;
  }

  if (localStorage.getItem("userType") == 1) {
    return <AdminPosterPage />;
  } else if (localStorage.getItem("userType") == 2) {
    return <UserPosterPage />;
  } else {
    return <div>Loading...</div>;
  }
};

export default observer(PosterPage);
