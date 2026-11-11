import {NavBar} from "../components/NavBar.tsx";
import styles from "./LoginPage.module.scss"
import {useContainer} from "../services/ServiceContext.tsx";
import {Container} from "inversify";
import {UserService} from "../services/UserService.ts";
import {useState} from "react";
import {useLogin} from "../services/LoginContext.tsx";

export function LoginPage() {

    const services:Container = useContainer();
    const {setUser} = useLogin();
    const userService:UserService = services.get(UserService)
    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(false);

    async function SendLogin()
    {
        try
        {
            await userService.login(username,password);
            let loginuser = await userService.getUserFromCookie();
            setUser(loginuser);
            setError(false);
        }
        catch(e)
        {
            setError(true);
        }
    }

    return (
    <>
        <NavBar/>
        <div className={styles.root}>
                <h1>Bejelentkezés</h1>
                <input className={styles.loginInput} name={"username"} value={username} onChange={(e) =>setUsername(e.currentTarget.value)} type="text" placeholder="Felhasználónév"/>
                <input className={styles.loginInput} name={"password"} value={password} onChange={(e) => setPassword(e.currentTarget.value)} type="password" placeholder="Jelszó" />
                <button onClick={SendLogin} className={styles.loginButton}>Bejelentkezés</button>
                {(error)?<p className={styles.errorP}>Helytelen felhasználónév vagy jelszó!</p>:<></>}
        </div>
    </>
    )
}