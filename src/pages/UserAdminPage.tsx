import {NavBar} from "../components/NavBar.tsx";
import {UserService} from "../services/UserService";
import {useContainer} from "../services/ServiceContext.tsx";
import {Container} from "inversify";
import styles from "./UserAdminPage.module.scss";
import type {UserReadDto} from "../dtos/UserReadDto.ts";
import {useEffect, useState} from "react";
import {DataGrid} from "../components/DataGrid.tsx";

export function UserAdminPage() {
    const services: Container = useContainer();
    const userService: UserService = services.get(UserService);
    const [data,setdata] = useState<UserReadDto[] | null>();

    const [searchquery, setSearchquery] = useState("");
    async function Load()
    {
        let result = await userService.search(searchquery,10,0);
        console.log(searchquery);
        console.log("searchresult",result);
        setdata(result);
    }

    useEffect(() => {
        Load();
    }, [searchquery])

    function UserClick()
    {

    }

    return (
        <>
        <NavBar onSearchQueryChange={setSearchquery} />
            <div className={styles.root}>
                {
                    (data)?
                <DataGrid caption={"Felhasználók"} data={data} clickEvent={UserClick}/>
                        :
                        <p>Betöltés...</p>
                }
            </div>
        </>
    )
}