import {useNavigate, useParams} from "react-router";
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
    const navigate = useNavigate();

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

    function KolcsonzesClick()
    {
        navigate("/kolcsonzes/");
    }
    function RendelesClick(id: string)
    {
        console.log(id);
        navigate(`/rendeles/${id}`);
    }
    function FelelossegClick()
    {
        navigate("/kolcsonzes/");
    }


    return (
        <div className={styles.root}>
            <NavBar onSearchQueryChange={() => {}}></NavBar>
            <h1>{user?.username}</h1>
            <h2>{user?.email}</h2>
            <DataGrid data={kolcsonzesek} caption={"Kölcsönzések"} clickEvent={KolcsonzesClick}></DataGrid>
            <DataGrid data={rendelesek} caption={"Rendelések"} clickEvent={RendelesClick}></DataGrid>
            <DataGrid data={felelossegek} caption={"Felelősségek"} clickEvent={FelelossegClick}></DataGrid>
        </div>
    )
}