
//import styles from "./Fetcher.module.css";
import styles from "./Profile.module.css"
import {Link} from "react-router-dom";
import {FormEvent, useState} from "react";

type Result = {
    userId: string;
    id: string;
    title: string;
    body: string;
} | undefined;

type User = {
    id: string,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
} | undefined;



const URL = "https://jsonplaceholder.typicode.com/";

export default function Data() {
    const [id, setId] = useState("");
    const [error, setError] = useState("");
    const [result, setResult] = useState<Result>();
    const [userresult, setUsers] = useState<User>();


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        try {
            const request = await fetch(`${URL}posts/${id}`);
            const users = await fetch(`${URL}users/${id}`);
            const datauser = await users.json();
            const data = await request.json();
            setResult(data);
            setUsers(datauser);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            }
        }
    };

    return <form onSubmit={handleSubmit}>
        <label>
            ID:
            <input type="text" value={id} onChange={e => setId(e.target.value)}/>
            <br/>
        </label>
        <button type="submit">Получить данные!</button>
        {userresult && <div>
            <h3>Name: {userresult.username}</h3>
            <h3>Email: {userresult.email}</h3>
        </div>}
        {result && <div>
            <h3>Title: {result.title}</h3>
            <h3>Description: {result?.body}</h3>
        </div>}
        {error && <div className={styles.error}>{error}</div>}
        <p/>
        <Link to={"/"}> Обратно </Link>
        <p/>
    </form>;
}
