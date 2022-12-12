import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import MessageData from "./MessageData";
import styles from './Message.module.css';

async function CreateMessage(username:string,token:any,theme:string,body:string){
    const response = await fetch("http://localhost:5000/api/messages", {
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


const Messages = () => {
    const [data,setData] = useState([{id:"", theme:"",login:"",createdAt:"",body:""}])
    const {state}=useLocation()
    const navigation = useNavigate()
    const [text,setText] = useState("")
    let massive = [{theme: "", login: "", createdAt: "", body: ""}]


    async function GetMessages(){
        const request = await fetch(`http://localhost:5000/api/messages/${state.id}`,{ method: "GET", headers:{"Accept": "application/json"}});
        const data = await request.json()
         massive.pop()
         for (let i = 0; i < data.length; i++) {
             massive.push(data[i])
         }
        setData(data);
        return data
    }

    useEffect(()=>{GetMessages()},[])
    // @ts-ignore
    const login = localStorage.key(0).toString()
    const token = localStorage.getItem(login)
    return (
        <div>
            <h1>{data[0].theme}</h1>
            {data.map((t: any) => <div><MessageData body={t.body} createdAt={t.createdAt} login={t.login}/></div>)}
            <textarea className={styles.textarea} onChange={e => setText(e.target.value)}/> <p/>
            <button className={styles.button} onClick={()=>{if (text.trim()===""){alert("Сообщение не должно быть пустым")}else{CreateMessage(login, token, data[0].theme, text);location.reload()}}}>Ответить</button>
            <button className={styles.button} onClick={()=>{navigation("/forum")}}>Вернуться на главную</button>
        </div>
    );
};

export default Messages;
