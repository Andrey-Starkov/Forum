import {FormEvent, useState} from "react";
import styles from './Reg.module.css'

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
                console.log("horosh")
                // eslint-disable-next-line react-hooks/rules-of-hooks
                //const navigate = useNavigate();
                //navigate("/forum",)
            }
        }
    }
    console.log(datauser[0])
}

export default function Login() {
    const [login, setLogin] = useState("");
    const [loginError, setLoginError] = useState("");
    const [password, setPassword] = useState("");
    const [repass, setRepass] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [repassError, setRepassError] = useState("");

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

        if (repass!==password){
            setRepassError("Пароли не совподают");
            result = false;
        }

        if (repass.length === 0 ){
            setRepassError("Поле пустой");
            result = false;
        }

        // const button = document.querySelector("button")

        // button.addEventListener("click",()=>{
        //     console.log("1")
        // })



        return result;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isValid()) {
        }
    };

    // @ts-ignore
    // @ts-ignore
    return <>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Логин:
                    <input
                        value={login}
                        onChange={e => setLogin(e.target.value)}/>
                </label>
                {loginError && <div className={styles.error}>
                    {loginError}
                </div>}
            </div>
            <div>
                <label>Пароль:
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                </label>
                {passwordError && <div className={styles.error}>
                    {passwordError}
                </div>}
            </div>
            <div>
                <label>Повтор пароля:
                    <input
                        type="password"
                        value={repass}
                        onChange={e => setRepass(e.target.value)}/>
                </label>
                {repassError && <div className={styles.error}>
                    {repassError}
                </div>}
            </div>
            <button type="submit" onClick={e=> Check(login,password)}>Войти</button>
            <Link to={"/"}> Форум </Link>

        </form>
    </>;
}
