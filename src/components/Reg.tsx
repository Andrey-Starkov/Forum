import {FormEvent, useState} from "react";
import styles from './Reg.module.css'
import {Link, useNavigate} from "react-router-dom";

async function CreateUser(login: string, password: string) {
    const response = await fetch("http://localhost:5000/api/registration", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            login: login,
            password: password
        })
    });
    if (response.ok){
        return true
    }
    return false;
}

export default function Reg() {
    const [login, setLogin] = useState("");
    const [loginError, setLoginError] = useState("");
    const [password, setPassword] = useState("");
    const [repass, setRepass] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [repassError, setRepassError] = useState("");
    const navigate = useNavigate();
    const isValid = (): boolean => {
        let result = true;
        setLoginError("");
        setPasswordError("");
        setRepassError("");

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
            setRepassError("Пароли не совпадают.");
            result = false;
        }

        if (repass.length === 0 ){
            setRepassError("Поле не может быть пустым.");
            result = false;
        }

        return result;
    };
    const handleReg = async () => {
        if (isValid())
        if (await CreateUser(login, password)) {
            navigate("/")
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
            <div className={styles.repeat_pass}>
                <label className={styles.text}>Повтор пароля:
                    <input
                        className={styles.input}
                        type="password"
                        value={repass}
                        onChange={e => setRepass(e.target.value)}/>
                </label>
                {repassError && <div className={styles.error}>
                    {repassError}
                </div>}
            </div>
            <div>
                <button className={styles.button} type="submit" onClick={handleReg}>Зарегистрироваться</button>
            </div>
            <Link to={"/"}> Вход в старый аккаунт</Link>

        </form>
    </>;
}
