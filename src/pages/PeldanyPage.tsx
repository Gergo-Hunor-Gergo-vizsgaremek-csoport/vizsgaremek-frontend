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
    const peldanyService: PeldanyService = services.get(PeldanyService);
    const {peldanyTypeId} = useParams();
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
            let result = await peldanyService.get(peldanyTypeId);
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
                (data)?
                    <DataGrid caption={"Típusok"} data={data} clickEvent={ClickedOnSingle} showColums={[false,true,true]}/>
                    :
                    <p>Betöltés...</p>
            }
        </>
    )
}