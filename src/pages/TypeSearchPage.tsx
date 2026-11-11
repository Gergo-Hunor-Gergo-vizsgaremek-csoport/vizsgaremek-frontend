import {NavBar} from "../components/NavBar.tsx";
import {useContainer} from "../services/ServiceContext.tsx";
import {Container} from "inversify";
import type {TypeReadDto} from "../dtos/TypeReadDto.ts";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router";
import {TypeService} from "../services/TypeService.ts";
import {DataGrid} from "../components/DataGrid.tsx";
import type {PagedDto} from "../dtos/PagedDto.ts";

export function TypeSearchPage() {
    const services: Container = useContainer();
    const typeService: TypeService = services.get(TypeService);
    const navigate = useNavigate();

    const [data,setdata] = useState<PagedDto<TypeReadDto> | null>();
    const [pagenum,setPagenum] = useState(1);
    let maxpage = useRef(1);

    const [searchquery, setSearchquery] = useState("");

    const LIMIT = 2;

    async function Load()
    {
        maxpage.current = (await (typeService.search(searchquery, LIMIT, 0))).pageCount;

        let newPagenum = Math.max(1,Math.min(pagenum, maxpage.current));
        setPagenum(newPagenum);

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
                    (data && pagenum > 0)?
                        <DataGrid caption={"Típusok"} data={data.items} clickEvent={ClickedType} pageNumber={pagenum} maxPageNumber={maxpage.current} setPageNumber={setPagenum} showColums={[false,true,true]}/>
                        :
                        <p>Betöltés...</p>
                }
        </>
    )
}