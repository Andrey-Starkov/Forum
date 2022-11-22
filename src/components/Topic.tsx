import React from 'react';
import styles from './Topic.module.css'
const Topic = () => {
    return (
        <div className={styles.topics}>
            <h1>Создать тему</h1>
            <div className={styles.topic}>
                <label>Тема <input className={styles.topic_content}/></label>
            </div>
            <div className={styles.message}>
                <label>Первое сообщение <input className={styles.message_content}/></label>
            </div>
            <div className={styles.button}>
            <button className={styles.cancel}>Отмена</button><button>Создать</button>
            </div>
        </div>
    );
};

export default Topic;
