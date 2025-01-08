import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./User.css";
import {API} from "../api";
const EditUser = () => {
  const [news, setNews] = useState([]);
  const { id } = useParams()
  const api = API;
  console.log(news)


  useEffect(() => {
    getNews();
  }, []);

  const getNews = () => {
    axios
      .get(api.concat("/") + id)
      .then((item) => {
        setNews(item.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="user mt-5">
      <table className="table table-bordered">
    <thead>
      <tr>
        <th>Объект</th>
        <th>Значение</th>


      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Title:</td>
        <td>{news.title}</td>
      </tr>
      <tr>
        <td>News:</td>
        <td>{news.news}</td>
      </tr>
      <tr>
        <td>Author:</td>
        <td>{news.author}</td>
      </tr>
    </tbody>
  </table>
    </div>
  );
};
export default EditUser;
