import React from 'react';
import styles from './Topic.module.css'
const Topic = () => {
    return (
        <div>
            <h1>Создать тему</h1>
            <div>
                <label>Тема <input/></label>
            </div>
            <div>
                <label>Первое сообщение <input className={styles.input}/></label>
            </div>
            <button>Отмена</button><button>Создать</button>
        </div>
    );
};

export default Topic;
