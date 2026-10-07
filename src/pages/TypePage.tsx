import {Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import type {TypeReadDto} from "../dtos/TypeReadDto.ts";
import {Container} from "inversify";
import {useContainer} from "../services/ServiceContext.tsx";
import {TypeService} from "../services/TypeService.ts";
import {RendelesService} from "../services/RendelesService.ts";
import styles from "./TypePage.module.scss";

export function TypePage()
{
    const {typeId} = useParams();

    const [item,setItem] = useState<TypeReadDto>();
    const [quantity,setQuantity] = useState(0);
    const navigate = useNavigate();


    const services: Container = useContainer();
    const typeService: TypeService = services.get(TypeService);
    const rendelesService: RendelesService = services.get(RendelesService);

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

    if (!item || !item.id)
    {
        return (<></>)
    }
    return (
        <div className={styles.root}>
            <Link className={styles.backLink} to={`/`}><button className={styles.backButton}>Vissza</button></Link>
            <div className={styles.mainDiv}>
                <h1>{item.name}</h1>
                <img alt="image" src={item.icon ?? "https://placehold.co/150"}/>
                <p>{item.description}</p>
                <div className={styles.buttonDiv}>
                    <button className={styles.deleteButton} onClick={async () => {
                        await typeService.delete(item.id)
                        console.log(`kitörölve: ${item.id}`);
                        navigate("/");
                    }}>Törlés</button>

                    <input type={"number"} onChange={(e) => setQuantity(e.target.valueAsNumber)} />
                    <button className={styles.orderButton} onClick={async () => {
                        await rendelesService.post(
                            {
                                typeId : item.id,
                                userId : "d2587282-1005-4015-af61-ee59fb4547b3",
                                date : new Date(),
                                quantity : quantity,
                                completedQuantity : 0
                            }
                        )

                        console.log({                                typeId : item.id,
                            userId : "e69f3176-7ad1-4811-9bd6-5f1791b82012",
                            date : new Date(),
                            quantity : quantity,
                            completedQuantity : 0})

                        navigate("/");
                    }}>Rendelés</button>
                </div>
            </div>
        </div>
    )
}