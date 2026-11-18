import {NavBar} from "../components/NavBar.tsx";
import {UserService} from "../services/UserService";
import {useContainer} from "../services/ServiceContext.tsx";
import {Container} from "inversify";
import styles from "./UserAdminPage.module.scss";
import type {UserReadDto} from "../dtos/UserReadDto.ts";
import {useEffect, useState} from "react";
import {DataGrid} from "../components/DataGrid.tsx";
import {useNavigate} from "react-router";
import {AddUserDialog} from "../components/AddUserDialog.tsx";

export function UserAdminPage() {
    const services: Container = useContainer();
    const userService: UserService = services.get(UserService);
    const [data,setdata] = useState<UserReadDto[] | null>();

    const [searchquery, setSearchquery] = useState("");
    const [pagenum, setPagenum] = useState(1);
    const [maxPage, setMaxPage] = useState(1);


    const [isOpen, setIsOpen] = useState(false);    //add user dialog

    const navigate = useNavigate();


    const LIMIT = 10;
    async function Load()
    {
        let count = await userService.searchCount(searchquery);
        let newmax = Math.ceil(count / LIMIT);
        setMaxPage(newmax);
        if (count === 0)
        {
            return;
        }
        if (pagenum > newmax) {
            setPagenum(newmax);
        }

        let result = await userService.search(searchquery,LIMIT,LIMIT*(pagenum-1));
        setdata(result);
    }

    useEffect(() => {
        Load();
    }, [searchquery, pagenum, isOpen]);

    function UserClick(id:string)
    {
        navigate(`/User/${id}`);
    }

    return (
        <>
        <NavBar onSearchQueryChange={setSearchquery} />
                {
                    (data)?
                <DataGrid caption={"Felhasználók"} data={data} pageNumber={pagenum} setPageNumber={setPagenum} maxPageNumber={maxPage} clickEvent={UserClick} showColums={[false,true,true]}/>
                        :
                        <p>Betöltés...</p>
                }
            <div className={styles.buttonDiv}>
                <button className={styles.addUserButton} onClick={() => setIsOpen(true)}>Felhasználó hozzáadása</button>
            </div>
            <AddUserDialog isOpen={isOpen} setIsOpen={setIsOpen}></AddUserDialog>
        </>
    )
}