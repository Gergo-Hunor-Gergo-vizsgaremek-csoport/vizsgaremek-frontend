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
        <nav className={styles.root}>
            <div className={styles.navsearch}><input type={"text"} onChange={e=>SearchChange(e.target.value)} placeholder={"Keresés"}>
            </input>
            <i className={`material-icons ${styles.searchicon}`}>search</i>
            </div>

            <a href={"/"}>Típusok keresése</a>
               <a href={"/useradmin"}>Felhasználók</a>
               <a href={"/user/:AKTUALISUSERID"}>Aktuális felhasználó</a>
               <a href={"/kolcsonzes"}>Kölcsönzések</a>
               <a href={"/log"}>Logok</a>
        </nav>
    )
}