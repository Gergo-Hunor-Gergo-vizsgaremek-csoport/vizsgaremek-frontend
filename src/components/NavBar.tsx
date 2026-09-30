import {Link} from "react-router";
import styles from "./NavBar.module.scss"

interface NavBarProps {
    onSearchQueryChange: (query: string) => void;
}

export function NavBar({onSearchQueryChange}: NavBarProps) {
    function SearchChange(query: string)
    {
        onSearchQueryChange(query);
    }


    return (
        <div className={styles.root}>
            <input type={"text"} className={styles.navsearch} onChange={e=>SearchChange(e.target.value)} placeholder={"Keresés"}/>
            <Link to={"/user"}><button className={styles.navbutton}>Felhasználók</button></Link>
            <Link to={"/admin"}><button className={styles.navbutton}>Aktuális felhasználó</button></Link>
            <Link to={"/dev"}><button className={styles.navbutton}>Logok</button></Link>
        </div>
    )
}