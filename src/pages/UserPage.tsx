import {useParams} from "react-router";
import {useEffect, useState} from "react";
import type {UserReadDto} from "../dtos/UserReadDto.ts";
import {Container} from "inversify";
import {useContainer} from "../services/ServiceContext.tsx";
import {UserService} from "../services/UserService.ts";
import styles from "./TypePage.module.scss";

export function UserPage()
{
    const {userId} = useParams();

    const [user,setUser] = useState<UserReadDto>();

    const services: Container = useContainer();
    const userService: UserService = services.get(UserService);

    useEffect(() => {
        Load();
    }, []);

    async function Load()
    {
        if (!userId)
        {
            return;
        }

        let result = await userService.get(userId);

        if (result)
        {
            setUser(result);
        }
    }

    return (
        <div className={styles.root}>
                <h1>{user?.name}</h1>
                <h2>{user?.email}</h2>
        </div>
    )
}