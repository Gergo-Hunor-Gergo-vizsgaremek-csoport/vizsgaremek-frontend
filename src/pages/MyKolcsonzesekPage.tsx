import {useEffect, useState} from "react";
import {DataGrid} from "../components/DataGrid.tsx";
import {useContainer} from "../services/ServiceContext.tsx";
import {UserService} from "../services/UserService.ts";
import type {KolcsonzesReadDto} from "../dtos/KolcsonzesReadDto.ts";
import {NavBar} from "../components/NavBar.tsx";


export function MyKolcsonzesekPage()
{
    const services = useContainer();
    const userservice = services.get(UserService)

    const [kolcsonzesek,setkolcsonzesek] = useState<KolcsonzesReadDto[]>([]);
    async function Load()
    {
        let data = await userservice.getMyKolcsonzesek();
        setkolcsonzesek(data);
    }
    useEffect(() => {
        Load();
    }, []);

    return(
        <>
            <NavBar/>
            <DataGrid caption={"Kölcsönzéseim"} data={kolcsonzesek}>
            </DataGrid>
        </>
    )
}