import {NavBar} from "../components/NavBar.tsx";
import {UserService} from "../services/UserService";
import {useContainer} from "../services/ServiceContext.tsx";
import {Container} from "inversify";
import styles from "./UserAdminPage.module.scss";
import type {UserReadDto} from "../dtos/UserReadDto.ts";
import {useEffect, useState} from "react";
import {DataGrid} from "../components/DataGrid.tsx";
import {useNavigate} from "react-router";

export function UserAdminPage() {
    const services: Container = useContainer();
    const userService: UserService = services.get(UserService);
    const [data,setdata] = useState<UserReadDto[] | null>();

    const [searchquery, setSearchquery] = useState("");

    const navigate = useNavigate();
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

    function UserClick(id:string)
    {
        navigate(`/User/${id}`);
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