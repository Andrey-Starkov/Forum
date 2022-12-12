import React from 'react';
import styles from './MessageData.module.css'

class MessageData extends React.Component<{ login: any, createdAt: any, body: any }> {
    render() {
        let {login, createdAt, body} = this.props;
        return (
            <div>
                <label className={styles.for_text}>{login} {createdAt} : <br/> </label>
                <label className={styles.for_text}>{body}</label>
                <p/>
            </div>
        );
    }
}

export default MessageData;
