import {useEffect, useState} from "react";
import {Container} from "inversify";
import {useContainer} from "../services/ServiceContext.tsx";
import {PeldanyService} from "../services/PeldanyService.ts";
import type {PeldanyReadDto} from "../dtos/PeldanyReadDto.ts";
import {useParams, useNavigate} from "react-router";
import {NavBar} from "../components/NavBar.tsx";
import {DataGrid} from "../components/DataGrid.tsx";

export function PeldanyPage()
{
    const services: Container = useContainer();
    const {peldanyTypeId} = useParams();
    const peldanyService = services.get(PeldanyService);
    const [data, setData] = useState<PeldanyReadDto[] | null>();
    //const [searchquery, setSearchquery] = useState("");
    const navigate = useNavigate();
    const [pageNumber, setPageNumber] = useState(1);
    const [maxPage, setMaxPage] =useState(1);
    const limit:number = 24;

    useEffect(() => {
        console.log("Fut a cuccos!");
        load();
    }, [pageNumber]);

    async function load() {
        console.log("Kapott paraméter az URL-ből:", peldanyTypeId);
        if (!peldanyTypeId) return;

        try {
            let result = await peldanyService.getByTypeId(peldanyTypeId, limit, limit * (pageNumber - 1));
            console.log("API válasz:", result);
            setData(result);
            setMaxPage(Math.ceil(result.length / limit));
            console.log(`Az összes oldal száma: ${maxPage}`);
        } catch (error) {
            console.error("Hiba a lekérés során:", error);
        }
    }

    function ClickedOnSingle(id:string)
    {
        console.log(id);
        navigate(`/single/${id}`);
    }

    return (
        <>
            <NavBar onSearchQueryChange={()=>{}} />
            {
                (data && data !== null)?
                    <DataGrid caption={"Single példány"} data={data} pageNumber={pageNumber} maxPageNumber={maxPage} setPageNumber={setPageNumber} clickEvent={ClickedOnSingle} showColums={[true,false,true, true, false, false, false, false, false, false, false, false, false, false]}/>
                    :
                    <p>Betöltés...</p>
            }
        </>
    )
}