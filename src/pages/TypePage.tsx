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
            <Link to={`/`}>Back</Link>
            <h1>{item?.name}</h1>
            <img alt="image" src={item?.icon ?? "https://placehold.co/150"}/>
            <p>{item?.description}</p>
            <div>
                <button onClick={async () => {
                    if (!item?.id) throw new TypeError("Type not found!");
                    console.log(`deleting ${item.id}`);
                    await typeService.delete(item?.id)
                    console.log(`deleted ${item?.id}`);
                    navigate("/");
                }}>Delete</button>
            </div>
        </div>
    )
}