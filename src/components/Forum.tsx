import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import styles from './Forum.module.css'
import {useLocation} from 'react-router-dom';
import Theme from "./Theme";
import ThemeData from "./ThemeData";



const Forum = () => {
    const location = useLocation();
    const [topics,setTopics] = useState([{}])
    const navigate = useNavigate()
    const [inputtext,setInputText]=useState("")

    async function AllTopics(){
        const request = await fetch(`http://localhost:5000/api/topics`,{ method: "GET", headers:{"Accept": "application/json"},});
        const datauser = await request.json();
        setTopics(datauser)
    }

    async function SearchTopics(search:string){
        //console.log(search)
        const request = await fetch(`http://localhost:5000/api/SearchTopics`,{
            method: "POST",
            headers:{"Accept": "application/json", "Content-Type": "application/json"},
            body: JSON.stringify({
                search: search
            })
        });
        const datauser = await request.json();
        //console.log(datauser)
        setTopics(datauser)
        //console.log(topics)
        //this.forceUpdate()
    }

    useEffect(()=>{
        setTimeout(AllTopics,50)
    },[])


    // let massive = [{id: 1, name: "2", theme: ""}]
    // massive.pop()
    // for (let i = 0; i < topics.length; i++) {
    //
    //     massive.push(topics[i])
    // }

    return (
        <div>
            <h1>{location.state}Форум</h1>
            <div className={styles.search_bar}>
                <input placeholder={"Искать"} onChange={e => setInputText(e.target.value)} className={styles.search_input}/> <button className={styles.search_button}>
                <img onClick={()=>SearchTopics(inputtext)} className={styles.img} src={"https://s1.iconbird.com/ico/0612/MustHave/w256h2561339195991Search256x256.png"} alt={""}/></button>
            </div>
            <button  className={styles.create} onClick={ ()=> navigate("/topic")}>Создать новую тему</button>

            <div>
                {
                    topics.map((t: any) => <div><ThemeData id={t.id} theme={t.theme} author={t.login}
                                                            time={t.createdAt}/></div>)}
            </div>


        </div>
    );
};

export default Forum;
