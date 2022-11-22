import React from 'react';
import {Link} from "react-router-dom";
import styles from './Forum.module.css'

const Forum = () => {
    return (
        <div>
            <Link to={"/"}> Главная </Link>
            <h1>Форум</h1>
            <div className={styles.search_bar}>
                <input placeholder={"Искать"} className={styles.search_input}/> <button className={styles.search_button}>
                <img className={styles.img} src={"https://s1.iconbird.com/ico/0612/MustHave/w256h2561339195991Search256x256.png"}/></button>
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
