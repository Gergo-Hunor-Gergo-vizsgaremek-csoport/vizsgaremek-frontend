import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import type {TypeReadDto} from "../dtos/TypeReadDto.ts";
import {Container} from "inversify";
import {useContainer} from "../services/ServiceContext.tsx";
import {TypeService} from "../services/TypeService.ts";
import {RendelesService} from "../services/RendelesService.ts";
import styles from "./TypePage.module.scss";
import {NavBar} from "../components/NavBar.tsx";
import {useLogin} from "../services/LoginContext.tsx";

export function TypePage()
{
    const {typeId} = useParams();

    const [item,setItem] = useState<TypeReadDto>();
    const [quantity,setQuantity] = useState(1);
    const navigate = useNavigate();


    const services: Container = useContainer();
    const typeService: TypeService = services.get(TypeService);
    const rendelesService: RendelesService = services.get(RendelesService);
    const {user} = useLogin();

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
            <NavBar onSearchQueryChange={()=>{}}/>
            <div>
                <div className={styles.mainDiv}>
                    <h1>{item.name}</h1>
                    <img alt="image" src={item.icon ?? "https://placehold.co/150"}/>
                    <p>{item.description}</p>
                    <div className={styles.buttonDiv}>
                        <p></p>
                        <input type={"number"} step={1} min={1} value={quantity} className={styles.quantityInput} onChange={(e) => setQuantity(e.target.valueAsNumber)}/>
                        <button className={styles.deleteButton} onClick={async () => {
                            await typeService.delete(item.id)
                            console.log(`kitörölve: ${item.id}`);
                            navigate("/");
                        }}>Törlés</button>

                        <button className={styles.orderButton} onClick={async () => {
                            if (!user || !user.id){
                                navigate("/login");
                                return;
                            }
                            await rendelesService.post(
                                {
                                    typeId : item.id,
                                    userId : user.id,
                                    date : new Date(),
                                    quantity : quantity,
                                    completedQuantity : 0
                                }
                            )
                            navigate("/");
                        }}>Rendelés</button>

                        <button className={styles.peldanyButton}
                                onClick={() => {
                                    navigate(`/peldany/by-type/${item.id}`);
                        }}>Példányok</button>

                    </div>
                </div>
            </div>
        </div>
    )
}