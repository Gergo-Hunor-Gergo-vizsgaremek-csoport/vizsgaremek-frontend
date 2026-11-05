import {useEffect, useState} from "react";
import {DataGrid} from "../components/DataGrid.tsx";
import {useContainer} from "../services/ServiceContext.tsx";
import {UserService} from "../services/UserService.ts";
import type {RendelesReadDto} from "../dtos/RendelesReadDto.ts";
import {NavBar} from "../components/NavBar.tsx";


export function MyRendelesekPage()
{
    const services = useContainer();
    const userservice = services.get(UserService)

    const [rendelesek,setRendelesek] = useState<RendelesReadDto[]>([]);
    async function Load()
    {
        let data = await userservice.getMyRendelesek();
        setRendelesek(data);
    }
    useEffect(() => {
        Load();
    }, []);

    return(
        <>
            <NavBar/>
            <DataGrid caption={"Rendeléseim"} data={rendelesek}>
            </DataGrid>
        </>
    )
}