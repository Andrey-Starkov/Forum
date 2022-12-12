import {FormEvent, useState} from "react";
import styles from './Login.module.css'
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom"
async function Check(login: string, password: string) {
    const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            login: login,
            password: password
        })
    });
    const data = await response.json()
    localStorage.clear()
    localStorage.setItem(login,data)
    if (response.ok)
    return true
}

export default function Login() {
    const [login, setLogin] = useState("");
    const [loginError, setLoginError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();


    const isValid = (): boolean => {
        let result = true;
        setLoginError("");
        setPasswordError("");

        if (login.length === 0) {
            setLoginError("Логин не может быть пустым.");
            result = false;
        }

        if (password.length === 0) {
            setPasswordError("Пароль не может быть пустым.");
            result = false;
        }


        return result;
    };

    const handleLogin = async () => {
        if (isValid())
        if (await Check(login, password)) {
            navigate("/forum")
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isValid()) {
        }
    };

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
            <Link to={"/register"}> Регистрация</Link>

        </form>
    </>;
}
