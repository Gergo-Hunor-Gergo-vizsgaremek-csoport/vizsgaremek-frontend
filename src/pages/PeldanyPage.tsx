import {useEffect, useState} from "react";
import {Container} from "inversify";
import {useContainer} from "../services/ServiceContext.tsx";
import {PeldanyService} from "../services/PeldanyService.ts";
//import styles from "./PeldanyPage.module.scss";
//import {DataGrid} from "../components/DataGrid.tsx";
import type {PeldanyReadDto} from "../dtos/PeldanyReadDto.ts";
import styles from "./PeldanyPage.module.scss";
import {useParams} from "react-router";

export function PeldanyPage()
{
    const services: Container = useContainer();
    const peldanyService: PeldanyService = services.get(PeldanyService);
    const {peldanyTypeId} = useParams();
    const [data, setData] = useState<PeldanyReadDto | null>(null);

    useEffect(() => {
        load();
    }, [peldanyTypeId])

    async function load() {
        /*if(!peldanyTypeId)
        {
            return;
        }

        let data = await peldanyService.get(peldanyTypeId);
        if (data.typeId === "37e33fde-b5ba-4c2a-9735-b6da49070c97")
        {
            setData(data);
        }*/

        console.log("Kapott paraméter az URL-ből:", peldanyTypeId);
        if (!peldanyTypeId) return;

        try {
            let result = await peldanyService.get(peldanyTypeId);
            console.log("API válasz:", result);
            setData(result);
        } catch (error) {
            console.error("Hiba a lekérés során:", error);
        }
    }

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
                            <tr key={data.typeId.toString()}>
                                <td>{data.typeId.toString()}</td>
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