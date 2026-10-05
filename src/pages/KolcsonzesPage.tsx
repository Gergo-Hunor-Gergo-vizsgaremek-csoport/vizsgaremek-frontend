import {KolcsonzesService} from "../services/KolcsonzesService";
import {useContainer} from "../services/ServiceContext.tsx";
import {Container} from "inversify";
import styles from "./KolcsonzesPage.module.scss";
import type {KolcsonzesReadDto} from "../dtos/KolcsonzesReadDto.ts";
import {useEffect, useState} from "react";

export function KolcsonzesPage(){
    const services: Container = useContainer();
    const kolcsonzesService: KolcsonzesService = services.get(KolcsonzesService);
    const [data, setData] = useState<KolcsonzesReadDto[] | null>(null);

    async function load() {
        console.log("Loading...");
        const data = await kolcsonzesService.get();
        setData(data);
    }

    useEffect(() => {
        load();
    }, [])

    return(
        <>
            <div className={styles.root}>
                <table className={styles.maintable}>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>userid</th>
                        <th>peldanyid</th>
                        <th>isactive</th>
                        <th>date</th>
                        <th>expirationdate</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(data && data.length > 0)?
                        data.map(x=>
                            <tr key={x.id}>
                                <td>{x.userId}</td>
                                <td>{x.peldanyId}</td>
                                <td>{x.isActive.toString()}</td>
                                <td>{x.date.toString()}</td>
                                <td>{x.expirationDate.toString()}</td>
                            </tr>
                        )
                        : <tr></tr> }
                    </tbody>
                </table>
            </div>
        </>
    )
}