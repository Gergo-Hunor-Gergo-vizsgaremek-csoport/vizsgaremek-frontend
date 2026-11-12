import {Container} from "inversify";
import {useContainer} from "../services/ServiceContext.tsx";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
//import {NavBar} from "../components/NavBar.tsx";
import type {PeldanyReadDto} from "../dtos/PeldanyReadDto.ts";
import {PeldanyService} from "../services/PeldanyService.ts";
import styles from "./SinglePeldanyPage.module.scss";

export function SinglePeldanyPage()
{
    const services: Container = useContainer();
    const {peldanyId} = useParams();
    const [peldany,setPeldany] = useState<PeldanyReadDto>();
    const peldanyService: PeldanyService = services.get(PeldanyService);

    useEffect(() => {
        console.log("Alagút az éjszaka, fut a vonat!");
        Load();
    }, []);

    async function Load()
    {
        if (!peldanyId)
        {
            return;
            console.log("Say that again!");
        }

        let result = await peldanyService.get(peldanyId);

        if (result)
        {
            setPeldany(result);
            console.log(peldany);
        }
    }

    if (!peldany || !peldany.id)
    {
        return (<></>)
    }

    return(
        <div className={styles.root}>
            <h1>{peldany.id}</h1>
            <div className={styles.mainDiv}>
                <img alt="image" src={"https://placehold.co/150"}/>
                <table>
                    <caption><h2>Description</h2></caption>
                    <thead>
                    <tr>
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <th>Type</th>
                        <td>{peldany.typeId}</td>
                    </tr>

                    <tr>
                        <th>Serialnumber</th>
                        {
                            (peldany.serialNumber === "string")
                                ?<td>Ismeretlen</td>
                                :<td>{peldany.serialNumber}</td>
                        }
                    </tr>
                    </tbody>
                </table>
                <div className={styles.descText}>
                    <p>{peldany.description}</p>
                </div>
            </div>
        </div>
    )
}