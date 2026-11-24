import {Container} from "inversify";
import {useContainer} from "../services/ServiceContext.tsx";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
//import {NavBar} from "../components/NavBar.tsx";
import type {TypeReadDto} from "../dtos/TypeReadDto.ts";
import type {PeldanyReadDto} from "../dtos/PeldanyReadDto.ts";
import {PeldanyService} from "../services/PeldanyService.ts";
import {TypeService} from "../services/TypeService.ts";
import styles from "./SinglePeldanyPage.module.scss";

export function SinglePeldanyPage()
{
    const services: Container = useContainer();
    const {peldanyId} = useParams();
    const navigate = useNavigate();
    const [peldany,setPeldany] = useState<PeldanyReadDto>();
    const [peldanyType, setType] = useState<TypeReadDto>();
    const [peldanyList, setPeldanyList] = useState<PeldanyReadDto[]>([]);
    const peldanyService: PeldanyService = services.get(PeldanyService);
    const typeService: TypeService = services.get(TypeService);

    useEffect(() => {
        console.log("Alagút az éjszaka, fut a vonat!");
        Load();
    }, [useParams()]);


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

            let type = await typeService.get(result.typeId);
            setType(type);

            let count = await peldanyService.peldanyCounter(result.typeId);
            console.log(`Íme a counter eredménye: ${count}`);

            let list = await peldanyService.getByTypeId(result.typeId,count,0);
            setPeldanyList(list);
            console.log(`Példány lista tartalmának száma: ${peldanyList.length}`);
            console.log(`Tartalom: ${list}`);
            console.log(`Mutatott példány helye a listában? ${list.map(x=>x.id).indexOf(result.id)}`);
            console.log(`Mutatott példány helye a listában? ${list.indexOf(result)}`);
            console.log(`Ugrani akarok ide: ${list.map(x=>x.id).indexOf(result.id) + 1}`);

        }
    }

    function PageTurner()
    {
        if(peldany)
        {
            let place = peldanyList.map(x => x.id).indexOf(peldany.id);
            console.log(`Ez az aktuális oldal id-je: ${place}`);
            navigate(`/single/${peldanyList[place + 1].id}`, {replace: true});
            console.log(`Ez ide mutat: ${peldanyList[place + 1].id}`);
        }
    }

    function PageBackTurner()
    {
        if(peldany)
        {
            let place = peldanyList.map(x => x.id).indexOf(peldany.id);
            console.log(`Ez az aktuális oldal id-je: ${place}`);
            navigate(`/single/${peldanyList[place - 1].id}`, {replace: true});
            console.log(`Ez ide vissza mutat: ${peldanyList[place + 1].id}`);
        }
    }

    function ShowParentPeldany()
    {
        if(peldany)
        {
            navigate(`/single/${peldany.parentId}`, {replace: true});
        }
    }

    if (!peldany || !peldany.id || !peldanyType || !peldanyType.id)
    {
        return (<></>)
    }

    return(
        <div className={styles.root}>
            <div className={styles.topNavigation}>
                <button onClick={PageBackTurner}>&laquo;</button>
                <button onClick={PageTurner}>&raquo;</button>
            </div>
            {peldany.parentId != null && (
                <div>
                    <button onClick={ShowParentPeldany}>Parent megtekintése</button>
                    <p>Ez a példány egy kollekció része!</p>
                </div>
            )}
            <h1>{peldanyType.name}</h1>
            <div className={styles.mainDiv}>
                <img alt="image" src={peldanyType.icon ?? "https://placehold.co/150"}/>
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
                        <td>{peldany.id}</td>
                    </tr>

                    <tr>
                        <th>Serialnumber</th>
                        {
                            (peldany.serialNumber === "string")
                                ? <td>Ismeretlen</td>
                                : <td>{peldany.serialNumber}</td>
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