import {NavBar} from "../components/NavBar.tsx";
import {UserService} from "../services/UserService";
import {useContainer} from "../services/ServiceContext.tsx";
import {Container} from "inversify";
import styles from "./UserPage.module.scss";
import type {UserReadDto} from "../dtos/UserReadDto.ts";
import {useEffect, useState} from "react";

export function UserPage() {
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

    return (
        <>
        <NavBar onSearchQueryChange={setSearchquery} />
            <div className={styles.root}>
                <table className={styles.maintable}>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>issysadmin</th>
                            <th>isdeviceadmin</th>
                            <th>isuseradmin</th>
                        </tr>
                    </thead>
                    <tbody>
                    {(data && data.length > 0)?
                        data.map(x=>
                            <tr key={x.id}>
                                <td>{x.id}</td>
                                <td>{x.name}</td>
                                <td>{x.isSysAdmin.toString()}</td>
                                <td>{x.isDeviceAdmin.toString()}</td>
                                <td>{x.isUserAdmin.toString()}</td>
                            </tr>
                        )
                        : <tr></tr> }
                    </tbody>
                </table>
            </div>
        </>
    )
}