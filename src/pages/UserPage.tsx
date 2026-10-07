import {useParams} from "react-router";
import {useEffect, useState} from "react";
import type {UserReadDto} from "../dtos/UserReadDto.ts";
import {Container} from "inversify";
import {useContainer} from "../services/ServiceContext.tsx";
import {UserService} from "../services/UserService.ts";
import styles from "./UserPage.module.scss";
import type {KolcsonzesReadDto} from "../dtos/KolcsonzesReadDto.ts";
import {DataGrid} from "../components/DataGrid.tsx";
import type {RendelesReadDto} from "../dtos/RendelesReadDto.ts";
import type {PeldanyReadDto} from "../dtos/PeldanyReadDto.ts";
import {NavBar} from "../components/NavBar.tsx";

export function UserPage()
{
    const {userId} = useParams();

    const [user,setUser] = useState<UserReadDto | null>();

    const services: Container = useContainer();
    const userService: UserService = services.get(UserService);
    const [kolcsonzesek,setKolcsonzesek] = useState<KolcsonzesReadDto[]>([]);
    const [rendelesek,setRendelesek] = useState<RendelesReadDto[]>([]);
    const [felelossegek,setFelelossegek] = useState<PeldanyReadDto[]>([]);

    useEffect(() => {
        Load();
    }, []);

    async function Load()
    {
        if (!userId)
        {
            return;
        }

        let resultUser = await userService.get(userId);
        if (!resultUser)
        {
            return;
        }
        setUser(resultUser);

        setKolcsonzesek( await userService.getKolcsonzesek(userId));
        setRendelesek( await userService.getRendelesek(userId));
        setFelelossegek( await userService.getFelelossegek(userId));

    }

    return (
        <div className={styles.root}>
            <NavBar onSearchQueryChange={() => {}}></NavBar>
            <h1>{user?.name}</h1>
            <h2>{user?.email}</h2>
            <DataGrid data={kolcsonzesek} caption={"Kölcsönzések"}></DataGrid>
            <DataGrid data={rendelesek} caption={"Rendelések"}></DataGrid>
            <DataGrid data={felelossegek} caption={"Felelősségek"}></DataGrid>
        </div>
    )
}