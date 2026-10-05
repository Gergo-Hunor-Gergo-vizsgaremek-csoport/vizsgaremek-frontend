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

    // módosítani kell ha majd lesz bejelentkezés funckció (AKTUALISUSERID-t le kell cserélni egy változóra)
    return (
        <div className={styles.root}>
            <input type={"text"} className={styles.navsearch} onChange={e=>SearchChange(e.target.value)} placeholder={"Keresés"}/>
            <Link to={"/"}><button className={styles.navbutton}>Típusok Keresése</button></Link>
            <Link to={"/useradmin"}><button className={styles.navbutton}>Felhasználók</button></Link>
            <Link to={"/user/:AKTUALISUSERID"}><button className={styles.navbutton}>Aktuális felhasználó</button></Link>
            <Link to={"/log"}><button className={styles.navbutton}>Logok</button></Link>
        </div>
    )
}