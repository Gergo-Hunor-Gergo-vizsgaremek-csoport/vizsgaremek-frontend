import {Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import type {TypeReadDto} from "../dtos/TypeReadDto.ts";
import {Container} from "inversify";
import {useContainer} from "../services/ServiceContext.tsx";
import {TypeService} from "../services/TypeService.ts";
import styles from "./TypePage.module.scss";

export function TypePage()
{
    const {typeId} = useParams();

    const [item,setItem] = useState<TypeReadDto>();
    const navigate = useNavigate();


    const services: Container = useContainer();
    const typeService: TypeService = services.get(TypeService);

    useEffect(() => {
        Load();
    }, []);

    async function Load()
    {
        if (!typeId)
        {
            return;
        }

        let result = await typeService.get(typeId);

        if (result)
        {
            setItem(result);
        }
    }

    return (
        <div className={styles.root}>
            <Link className={styles.backLink} to={`/`}><button className={styles.backButton}>Vissza</button></Link>
            <div className={styles.mainDiv}>
                <h1>{item?.name}</h1>
                <img alt="image" src={item?.icon ?? "https://placehold.co/150"}/>
                <p>{item?.description}</p>
                <div className={styles.buttonDiv}>
                    <button className={styles.deleteButton} onClick={async () => {
                        if (!item?.id) throw new TypeError("Nincs ilyen típus!");
                        await typeService.delete(item?.id)
                        console.log(`kitörölve: ${item?.id}`);
                        navigate("/");
                    }}>Törlés</button>
                    <button className={styles.orderButton} onClick={async () => {
                        if (!item?.id) throw new TypeError("Nincs ilyen típus!");
                        await typeService.delete(item?.id)
                        console.log(`kitörölve: ${item?.id}`);
                        navigate("/");
                    }}>Rendelés</button>
                </div>
            </div>
        </div>
    )
}