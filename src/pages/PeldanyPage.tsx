import {useEffect, useState} from "react";
import {Container} from "inversify";
import {useContainer} from "../services/ServiceContext.tsx";
import {PeldanyService} from "../services/PeldanyService.ts";
import type {PeldanyReadDto} from "../dtos/PeldanyReadDto.ts";
//import styles from "./PeldanyPage.module.scss";
import {useParams, useNavigate} from "react-router";
import {NavBar} from "../components/NavBar.tsx";
import {DataGrid} from "../components/DataGrid.tsx";

export function PeldanyPage()
{
    const services: Container = useContainer();
    const {peldanyTypeId} = useParams();
    const peldanyService = services.get(PeldanyService);
    const [data, setData] = useState<PeldanyReadDto[] | null>();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Fut a cuccos!");
        load();
    }, [])

    async function load() {
        console.log("Kapott paraméter az URL-ből:", peldanyTypeId);
        if (!peldanyTypeId) return;

        try {
            let result = await peldanyService.getByTypeId(peldanyTypeId);
            console.log("API válasz:", result);
            setData(result);
        } catch (error) {
            console.error("Hiba a lekérés során:", error);
        }
    }

    function ClickedOnSingle(id:string)
    {
        console.log(id);
        navigate(`/`);
    }

    return (
        <>
            <NavBar onSearchQueryChange={()=>{}} />
            {
                (data && data !== null)?
                    <DataGrid caption={"Single példány"} data={data} clickEvent={ClickedOnSingle} showColums={[true,true,true, true, false, false, false, false, false, false, false, false, false, false]}/>
                    :
                    <p>Betöltés...</p>
            }
        </>
    )
}