import {NavBar} from "../components/NavBar.tsx";
import {useContainer} from "../services/ServiceContext.tsx";
import {Container} from "inversify";
import type {TypeReadDto} from "../dtos/TypeReadDto.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {TypeService} from "../services/TypeService.ts";
import {DataGrid} from "../components/DataGrid.tsx";

export function TypeSearchPage() {
    const services: Container = useContainer();
    const typeService: TypeService = services.get(TypeService);
    const navigate = useNavigate();

    const [data,setdata] = useState<TypeReadDto[]>([]);
    const [pagenum,setPagenum] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    const [searchquery, setSearchquery] = useState("");

    const LIMIT = 2;

    async function Load()
    {
        let count = await typeService.searchCount(searchquery);
        setMaxPage(Math.ceil(count / LIMIT));

        let result = await typeService.search(searchquery,LIMIT,LIMIT*(pagenum-1));
        setdata(result);
    }

    useEffect(() => {
        Load();
    }, [searchquery,pagenum]);



    function ClickedType(id:string)
    {
        navigate(`/type/${id}`);
    }

    return (
        <>
            <NavBar onSearchQueryChange={setSearchquery} />
                {
                    (data)?
                        <DataGrid caption={"Típusok"} data={data} clickEvent={ClickedType} pageNumber={pagenum} maxPageNumber={maxPage} setPageNumber={setPagenum} showColums={[false,true,true]}/>
                        :
                        <p>Betöltés...</p>
                }
        </>
    )
}