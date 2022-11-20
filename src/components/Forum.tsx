import React from 'react';
import {Link} from "react-router-dom";
import styles from './Forum.module.css'

const Forum = () => {
    return (
        <div>
            <h1></h1>
            <Link to={"/"}> Главная </Link>
            <h1>Форум</h1>
            <div className={"Search"}>
                <input placeholder={"Искать"}/> <button className={styles.search}></button>
            </div>
            <button  className={styles.create}><Link to={"/Topic"}>Создать новую тему</Link></button>
            <ol>
                <li>Hello</li>
                <li>Hello</li>
            </ol>
        </div>
    );
};

export default Forum;
