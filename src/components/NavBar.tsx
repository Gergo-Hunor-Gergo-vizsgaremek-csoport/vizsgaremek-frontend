import styles from "./NavBar.module.scss"
import {useState ,useEffect, useRef} from "react";

interface NavBarProps {
    onSearchQueryChange?: (query: string) => void;
}

export function NavBar({onSearchQueryChange}: NavBarProps) {
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (!open) return;

        function onClick(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", onClick);


        return () => {
            document.removeEventListener("mousedown", onClick);
        }
    },[open]);



    function SearchChange(query: string)
    {
        if (onSearchQueryChange) {
            onSearchQueryChange(query);
        }
    }

    // módosítani kell ha majd lesz bejelentkezés funckció (AKTUALISUSERID-t le kell cserélni egy változóra)
    return (
        <nav className={styles.root}>
            <div className={styles.navsearch}><input type={"text"} onChange={e=>SearchChange(e.target.value)} placeholder={"Keresés"}>
            </input>
            <i className={`material-icons ${styles.searchicon}`}>search</i>
            </div>

            <a className={styles.navbarItem} href={"/"}>Típusok keresése</a>
            <a className={styles.navbarItem} href={"/useradmin"}>Felhasználók</a>
            <a className={styles.navbarItem} href={"/kolcsonzes"}>Kölcsönzések</a>
            <a className={styles.navbarItem} href={"/log"}>Logok</a>

            <div ref={menuRef} className={styles.navbarItem} onClick={() =>{(open)?setOpen(false):setOpen(true);}} style={{position:"relative"}}><i className={`material-icons ${styles.personIcon}`}>person_outline</i>

                <div style={{display:`${(open)?"block":"none"}`, position:"absolute", left:0}}>
                <ul style={{listStyleType:"none", margin:"0",padding:"0", width:"max-content", display:"grid", gridAutoFlow:"row"}} >
                    <li className={styles.navbarDropdownItem}><a href={"/user/:AKTUALISUSERID"}>Aktuális felhasználó</a></li>
                    <li className={styles.navbarDropdownItem}><a href={"/login"}>Bejelentkezés</a></li>
                </ul>
            </div>
            </div>

        </nav>
    )
}