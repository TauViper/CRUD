import React, { useState } from 'react'
import {useNavigate } from "react-router-dom";
import Loader from '../Common/Loader';
import './User.css';
import {API} from "../api";
const CreateNews = () => {
    const navigate = useNavigate();
    const createNewsApi = API
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [news, setNews] = useState({
        title: "",
        news: "",
        author: ""
    })

    const handelInput = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log(news, value)
        setNews({ ...news, [name]: value });
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        console.log(news)
        try {
            setIsLoading(true);
            const response = await fetch(createNewsApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(news),
            });
            console.log(response)

            if (response.ok) {
                console.log('Form submitted successfully!');
                setNews({title: "",news: "",author: ""})
                navigate('/show-news');
            } else {
                console.error('Form submission failed!');
            }

        } catch (error) {
            setError(error.message);
        } finally{
            setIsLoading(false);
        }
    }

    return (
        <div className='user-form'>
            <div className='heading'>
            {isLoading && <Loader />}
            {error && <p>Error: {error}</p>}
                <p>Форма создания новости</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Название новости</label>
                    <input type="text" className="form-control" id="title" name="title" value={news.title} onChange={handelInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="news" className="form-label">Тело новости</label>
                    <textarea  className="form-control" id="news" name="news" value={news.news} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Автор</label>
                    <input type="text" className="form-control" id="author" name="author" value={news.author} onChange={handelInput} />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Создать</button>
            </form>
        </div>
    )
}

export default CreateNews