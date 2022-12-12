import React, {useState} from 'react';
import styles from './Topic.module.css'
import {useNavigate} from "react-router-dom";

async function CreateTopic(username: string|null, token: string|null, theme: string|null, body: string|null) {
    const response = await fetch("http://localhost:5000/api/topics", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username,
            token: token,
            theme: theme,
            body: body
        })
    });
    return await response.json()
}

const Topic =  () => {
    const [theme, setTheme] = useState("");
    const [body, setBody] = useState("");
    const navigate = useNavigate();

    const handleCreate = async () => {
        if ((theme.trim()!=="")&&(body.trim()!=="")) {
            navigate("/forum")
            // @ts-ignore
            await CreateTopic(localStorage.key(0).toString(), localStorage.getItem(localStorage.key(0)), theme, body)
        }
        else{
            alert("Поля должны быть заполнены")
        }
    }

    return (
        <div className={styles.topics}>
            <h1>Создать тему</h1>
            <div className={styles.topic}>
                <label>Тема <input className={styles.topic_content} onChange={e => setTheme(e.target.value)}/></label>
            </div>
            <div className={styles.message}>
                <label className={styles.labeltextarea}>Первое сообщение <textarea className={styles.message_content}
                                                                                   onChange={e => setBody(e.target.value)}/></label>
            </div>
            <div className={styles.button}>
                <button className={styles.cancel} onClick={()=>navigate('/forum')}>Отмена</button>
                <button onClick={handleCreate}>Создать</button>
            </div>
        </div>
    );
};

export default Topic;
