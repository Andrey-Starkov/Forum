import React from 'react';
import styles from './ThemeData.module.css'
import {useNavigate} from "react-router-dom";

// @ts-ignore
const ThemeData = ({id,theme,author,time}) => {
    const navigate = useNavigate()
    return (
        <div>
            <div>
            <h2 className={styles.theme}>{theme}<br/>
                <label className={styles.author}>{author} {time}</label> <br/>
                <a className={styles.link} href={""} onClick={()=>navigate('/TopicMessage',{state:{id:id}})}>Перейти к теме</a></h2>
            </div>

        </div>
    );
};

export default ThemeData;
