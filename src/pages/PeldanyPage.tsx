import {useEffect, useState} from "react";
import {Container} from "inversify";
import {useContainer} from "../services/ServiceContext.tsx";
import {PeldanyService} from "../services/PeldanyService.ts";
import type {PeldanyReadDto} from "../dtos/PeldanyReadDto.ts";
//import styles from "./PeldanyPage.module.scss";
import {useParams} from "react-router";
import {NavBar} from "../components/NavBar.tsx";
import {DataGrid} from "../components/DataGrid.tsx";

export function PeldanyPage()
{
    const services: Container = useContainer();
    const peldanyService: PeldanyService = services.get(PeldanyService);
    const {peldanyTypeId} = useParams();
    const [data, setData] = useState<PeldanyReadDto[] | null>([]);

    useEffect(() => {
        console.log("Fut a cuccos!");
        load();
    }, [peldanyTypeId])

    async function load() {
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
        /*<>
            <div className={styles.root}>
                <table className={styles.maintable}>
                    <thead>
                    <tr>
                    </tr>
                    </thead>
                    <tbody>
                    {(data && data.length > 0)?
                        data.map(item =>
                            <tr key={item.typeId.toString()}>
                                <td>{item.typeId.toString()}</td>
                                <td>{item.description.toString()}</td>
                                <td>{item.addDate.toString()}</td>
                            </tr>):
                        <tr> </tr>}
                    </tbody>
                </table>
            </div>
        </>*/

        <>
            <NavBar onSearchQueryChange={setSearchquery} />
            {
                (data)?
                    <DataGrid caption={"Típusok"} data={data} clickEvent={ClickedType} showColums={[false,true,true]}/>
                    :
                    <p>Betöltés...</p>
            }
        </>
    )
}