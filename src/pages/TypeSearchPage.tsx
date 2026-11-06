import {NavBar} from "../components/NavBar.tsx";
import {useContainer} from "../services/ServiceContext.tsx";
import {Container} from "inversify";
import type {TypeReadDto} from "../dtos/TypeReadDto.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {TypeService} from "../services/TypeService.ts";
import {HighlightElements} from "../Highligher.ts";
import {DataGrid} from "../components/DataGrid.tsx";
import type {PagedDto} from "../dtos/PagedDto.ts";

export function TypeSearchPage() {
    const services: Container = useContainer();
    const typeService: TypeService = services.get(TypeService);
    const navigate = useNavigate();

    const [data,setdata] = useState<PagedDto<TypeReadDto> | null>();

    const [searchquery, setSearchquery] = useState("");

    async function Load()
    {
        let result = await typeService.search(searchquery,1,0);
        setdata(result);
    }

    useEffect(() => {
        Load();

    }, [searchquery]);



    function ClickedType(id:string)
    {
        console.log(id);
        navigate(`/type/${id}`);
    }

    return (
        <>
            <NavBar onSearchQueryChange={setSearchquery} />
                {
                    (data)?
                        <DataGrid caption={"Típusok"} data={data.items} clickEvent={ClickedType} showColums={[false,true,true]}/>
                        :
                        <p>Betöltés...</p>
                }
        </>
    )
}