import {NavBar} from "../components/NavBar.tsx";
import styles from "./LoginPage.module.scss"
import {useContainer} from "../services/ServiceContext.tsx";
import {Container} from "inversify";
import {UserService} from "../services/UserService.ts";
import {useState} from "react";

export function LoginPage() {

    const services:Container= useContainer();
    const userService:UserService = services.get(UserService)
    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("");

    async function SendLogin()
    {
        try
        {
            await userService.login(username,password);
            alert("Sikeres bejelentkezés!");
        }
        catch(e)
        {
            alert("Valami szörnyű dolog történt!");
        }
    }

    return (
        <div className={styles.root}>
            <NavBar/>
            <div className={styles.loginDiv}>
                <h1>Bejelentkezés</h1>
                <input className={styles.loginInput} name={"username"} value={username} onChange={(e) =>setUsername(e.currentTarget.value)} type="text" placeholder="Felhasználónév"/>
                <input className={styles.loginInput} name={"password"} value={password} onChange={(e) => setPassword(e.currentTarget.value)} type="password" placeholder="Jelszó" />
                <button onClick={SendLogin} className={styles.loginButton}>Bejelentkezés</button>
            </div>
        </div>
    )
}