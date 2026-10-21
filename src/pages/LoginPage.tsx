import {NavBar} from "../components/NavBar.tsx";
import styles from "./LoginPage.module.scss"
import {useContainer} from "../services/ServiceContext.tsx";
import {Container} from "inversify";
import {UserService} from "../services/UserService.ts";
import {useState} from "react";

export function LoginPage() {

    const services:Container= useContainer();
    const userService:UserService = services.get(UserService)
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");

    async function SendLogin()
    {
        try
        {
            await userService.login(email,password);
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
                <input className={styles.loginInput} name={"email"} value={email} onChange={(e) => setEmail(e.currentTarget.value)} id="email" type="email" placeholder="Email"/>
                <input className={styles.loginInput} name={"password"} value={password} onChange={(e) => setPassword(e.currentTarget.value)} id="password" type="password" placeholder="Jelszó" />
                <button onClick={SendLogin} className={styles.loginButton}>Bejelentkezés</button>
            </div>
        </div>
    )
}