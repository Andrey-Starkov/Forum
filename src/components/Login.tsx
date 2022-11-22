import {FormEvent, useState} from "react";
import styles from './Login.module.css'

import {Link} from "react-router-dom";
// @ts-ignore
import { useNavigate } from "react-router-dom"

const URL = "http://localhost:3000/api/users"
async function Check(login: string, password: string) {
    const request = await fetch(`${URL}`,{ method: "GET", headers:{"Accept": "application/json"}});
    const datauser = await request.json();
    for (let i=0; i<datauser.length;i++){
        //console.log(datauser[i].login)
        if (login===datauser[i].login){
            //console.log("horosh")
            if (password === datauser[i].password){
                return true
            }
        }
    }
    return false
    //console.log(datauser[0])
}

export default function Login() {
    const [login, setLogin] = useState("");
    const [loginError, setLoginError] = useState("");
    const [password, setPassword] = useState("");
    const [repass, setRepass] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();


    const isValid = (): boolean => {
        let result = true;
        setLoginError("");
        setPassword("");
        setRepass("");

        if (login.length === 0) {
            setLoginError("Логин не может быть пустым.");
            result = false;
        }

        if (!/^([a-z0-9]{6,20})$/.test(login)) {
            setLoginError("Логин должен содержать от 6 до 20 символов латинского алфавита и цифры.");
            result = false;
        }

        if (password.length === 0) {
            setPasswordError("Пароль не может быть пустым.");
            result = false;
        }


        // const button = document.querySelector("button")

        // button.addEventListener("click",()=>{
        //     console.log("1")
        // })



        return result;
    };

    const handleLogin = async () => {
        if (await Check(login, password)) {
            navigate("/forum")
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isValid()) {
        }
    };

    // @ts-ignore
    // @ts-ignore
    return <>
        <form onSubmit={handleSubmit} className={styles.block}>
            <div className={styles.login}>
                <label className={styles.text}>Логин:
                    <input
                        className={styles.input}
                        value={login}
                        onChange={e => setLogin(e.target.value)}/>
                </label>
                {loginError && <div className={styles.error}>
                    {loginError}
                </div>}
            </div>
            <div className={styles.password}>
                <label className={styles.text}>Пароль:
                    <input
                        className={styles.input}
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                </label>
                {passwordError && <div className={styles.error}>
                    {passwordError}
                </div>}
            </div>
            <div>
            <button className={styles.button} type="submit" onClick={handleLogin}>Войти</button>
            </div>
            <Link to={"/"}> Форум </Link>

        </form>
    </>;
}
