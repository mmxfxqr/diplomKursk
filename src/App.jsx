
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import MainPage from "./components/MainPage";
import { observer } from "mobx-react-lite";
import Form from "./components/FormPage";
import Contest from "./components/Contest";
import AttractionsPage from "./components/AttractionsPage";
import NewsPage from "./components/NewsPage";
import PosterPage from "./components/PosterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/registration" element={<RegisterForm />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/form" element={<Form />} />
        <Route path="/contest" element={<Contest />} />
        <Route path="/attractions" element={<AttractionsPage/>} />
        <Route path="/news" element={<NewsPage/>} />
        <Route path="/events" element={<PosterPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default observer(App);
