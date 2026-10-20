import {useEffect, useState} from "react";
import {Container} from "inversify";
import {useContainer} from "../services/ServiceContext.tsx";
import {PeldanyService} from "../services/PeldanyService.ts";
//import styles from "./PeldanyPage.module.scss";
//import {DataGrid} from "../components/DataGrid.tsx";
import type {PeldanyReadDto} from "../dtos/PeldanyReadDto.ts";
import styles from "./PeldanyPage.module.scss";

export function PeldanyPage()
{
    const services: Container = useContainer();
    const peldanyService: PeldanyService = services.get(PeldanyService);
    const [data, setData] = useState<PeldanyReadDto | null>(null);

    async function load() {
        const data = await peldanyService.get("7ee7a148-60b8-44ca-8d11-85c03d142e59");
        setData(data);
    }

    useEffect(() => {
        load();
    }, [])



    return (
        <>
            <div className={styles.root}>
                <table className={styles.maintable}>
                    <thead>
                    <tr>
                    </tr>
                    </thead>
                    <tbody>
                    {(data)?
                            <tr key={data.id.toString()}>
                                <td>{data.id.toString()}</td>
                                <td>{data.description.toString()}</td>
                                <td>{data.addDate.toString()}</td>
                            </tr>:
                        <tr> </tr>}
                    </tbody>
                </table>
            </div>
        </>
    )
}