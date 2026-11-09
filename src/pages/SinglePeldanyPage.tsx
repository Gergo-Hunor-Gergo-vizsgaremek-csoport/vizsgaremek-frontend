import {Container} from "inversify";
import {useContainer} from "../services/ServiceContext.tsx";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
//import {NavBar} from "../components/NavBar.tsx";
import type {PeldanyReadDto} from "../dtos/PeldanyReadDto.ts";
import {PeldanyService} from "../services/PeldanyService.ts";
//import {RendelesService} from "../services/RendelesService.ts";
//import styles from "./TypePage.module.scss";

export function SinglePeldanyPage()
{
    const services: Container = useContainer();
    const {peldanyId} = useParams();
    const [peldany,setPeldany] = useState<PeldanyReadDto>();
    const peldanyService: PeldanyService = services.get(PeldanyService);
    //const rendelesService: RendelesService = services.get(RendelesService);

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
        <>
            <p>{peldany.id}</p>
            <p></p>
        </>
    )
}