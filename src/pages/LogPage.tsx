import {Container} from "inversify";
import {NavBar} from "../components/NavBar.tsx";
import {LogService} from "../services/LogService";
import {useEffect, useState} from "react";
import styles from "./LogPage.module.scss";
import {useContainer} from "../services/ServiceContext.tsx";
import type {LogReadDto} from "../dtos/LogReadDto.ts";

export function LogPage() {
    const services: Container = useContainer();
    const logService: LogService = services.get(LogService);
    const [searchquery, setSearchquery] = useState("");
    const [data, setdata] = useState<LogReadDto[] | null>();


    async function Load()
    {
        let result = await logService.search(searchquery,10,0);
        setdata(result);
        console.log(result);
    }

    useEffect(() => {
        Load();
    }, [searchquery]);


return (
    <>
        <NavBar onSearchQueryChange={setSearchquery} />
        <div className={styles.root}>
            <table className={styles.maintable}>
                <colgroup>
                    <col width={'20%'}/>
                    <col width={'20%'}/>
                    <col width={'20%'}/>
                    <col width={'20%'}/>
                    <col width={'20%'}/>
                </colgroup>
                <thead>
                    <tr>
                        <th> id</th>
                        <th>type</th>
                        <th>message</th>
                        <th>datetime</th>
                        <th>userid</th>
                    </tr>
                </thead>
                <tbody>
                {(data && data.length > 0)?
                    data.map(x=>
                        <tr key={x.id}>
                            <td>{x.id}</td>
                            <td>{x.type}</td>
                            <td>{x.message}</td>
                            <td>{x.date}</td>
                            <td>{x.userId}</td>

                        </tr>
                    ) : <tr></tr> }
                </tbody>
            </table>
        </div>
    </>
)
}

