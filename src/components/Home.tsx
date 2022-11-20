import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div>
            <p/>
            <Link to={"/profile"}> Регистрация </Link>
            <p/>
            <Link to={"/login"}> Логин </Link>
            <p/>
            <Link to={"/fetch"}> Запрос </Link>
            <p/>
            <Link to={"/forum"}> Форум </Link>
        </div>
    );
};

export default Home;
