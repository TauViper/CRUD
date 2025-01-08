import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";
import {API} from "../api";

const ShowNews = () => {
  const showUserApi = API;

  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handelDelete = async (id) => {
    console.log("id : -", id);
    setIsLoading(true);
    try {
       await fetch(showUserApi.concat("/") + id, {
        method: "DELETE",
      });
      setNews(news.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const getNews = () => {
    axios
      .get(showUserApi)
      .then((res) => {
        setNews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (news.length < 0) {
    return <h1>no news found</h1>;
  } else {
    return (
      <div className="mt-5">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}

            {news?.map((item, ) => {
              return (
                  <>
                    <ul className={"list-group mt-5"}>
                      <li key={news.id} className={'list-group-item d-flex flex-column'}>
                        <h2 className={'text-center justify-content-center'}>{item.title}</h2>
                        <p className={'text-align-justify text-break'}>{item.news}</p>
                        <h6 className={'d-flex justify-content-end'}>{item.author}</h6>
                      </li>
                      <div>
                        <Link to={`/edit-news/${item.id}`}>
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        </Link>
                        <Link to={`/user/${item.id}`}>
                          <i className="fa fa-eye" aria-hidden="true"></i>
                        </Link>

                        <i
                            className="fa fa-trash-o"
                            aria-hidden="true"
                            onClick={() => handelDelete(item.id)}
                        ></i>
                      </div>
                    </ul>

                  </>
              );

            })}
      </div>
    );
  }
};

export default ShowNews;
