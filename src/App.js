import "./App.css";
import CreateNews from "./components/News/CreateNews";
import ShowNews from "./components/News/ShowNews";
import { Route, Routes } from "react-router-dom";
import EditNews from "./components/News/EditNews";
import User from "./components/News/News";
import Header from "./components/Common/Header";

export const App = () => {
  return (
    <div className="App">
      <header className="container">
        <div className="">
          <Header />
          <Routes>
            <Route path="/" element={<CreateNews />} />
            <Route path="/edit-news/:id" element={<EditNews />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/show-news" element={<ShowNews />} />
          </Routes>
        </div>
      </header>
    </div>
  );
}


