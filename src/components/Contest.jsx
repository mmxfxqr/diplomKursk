  import { observer } from "mobx-react-lite";
  import { useContext, useEffect } from "react";
  import { Context } from "../main";
  import AdminContestPage from "./AdminContestPage";
  import UserContestPage from "./UserContestPage";
  const Contest = () => {
    const { userStore } = useContext(Context);

    useEffect(() => {
      // Выполнить какие-то действия, когда userType изменится
    }, [userStore.idRole]);

    if (userStore.isLoading) {
      return <div>Loading...</div>;
    }

    if (localStorage.getItem("userType") == 1) {
      return <AdminContestPage />;
    } else if (localStorage.getItem("userType") == 2) {
      return <UserContestPage />;
    } else {
      return <div>Loading...</div>;
    }
  };

  export default observer(Contest);
