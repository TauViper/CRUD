import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./User.css";
import {API} from "../api";
const EditNews = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const getUserApi = API;

  useEffect(() => {
    getNews();
  }, []);

  const getNews = () => {
    axios
      .get(getUserApi.concat("/") + id)
      .then((item) => {
        setNews(item.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handelInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    setNews({ ...news, [name]: value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    fetch(getUserApi.concat("/") + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(news),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(true);
        navigate("/show-news");
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      })
  };

  return (
    <div className="user-form">
      <div className="heading">
      {isLoading && <Loader />}
      {error && <p>Error: {error}</p>}
        <p>Редактирование новости</p>
      </div>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Название новости
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={news.title}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="news" className="form-label">
            Тело новости
          </label>
          <textarea
            className="form-control"
            id="news"
            name="news"
            value={news.news}
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">
            Автор
          </label>
          <input
            type="text"
            className="form-control"
            id="author"
            name="author"
            value={news.author}
            onChange={handelInput}
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">
          ИЗМЕНИТЬ
        </button>
      </form>
    </div>
  );
};
export default EditNews;
