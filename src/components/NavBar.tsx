import {Link} from "react-router";
import styles from "./NavBar.module.scss"

export function NavBar() {
    return (
        <div className={styles.root}>
            <input type={"text"} className={styles.navsearch} placeholder={"Keresés"}/>
            <Link to={"/dev"}><button className={styles.navbutton}>Felhasználók</button></Link>
            <Link to={"/admin"}><button className={styles.navbutton}>Aktuális felhasználó</button></Link>
            <Link to={"/dev"}><button className={styles.navbutton}>Logok</button></Link>
        </div>
    )
}