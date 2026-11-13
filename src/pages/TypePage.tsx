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

    async function Order()
    {
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
    }

    if (!item || !item.id)
    {
        return (<></>)
    }
    return (
        <>
        <NavBar/>
        <div className={styles.root}>
        <div className={styles.productContainer}>
            <div className={styles.imageWrapper}>
                <span className={styles.imagePlaceholder}>kép helye</span>
            </div>

            <div className={styles.productDetails}>
                <h1 className={styles.productTitle}>{item.name}</h1>
                <p className={styles.productDescription}>
                    {item.description}
                </p>

                <div className={styles.purchaseBox}>
                    <div>
                        <label htmlFor="quantity" className={styles.quantityLabel}>Mennyiség</label>
                        <input type="number" id="quantity" className={styles.quantityInput} value={quantity} onChange={e =>setQuantity(e.target.valueAsNumber)} min="1"/>
                    </div>
                    <button className={styles.orderBtn} onClick={Order}>Rendelés</button>
                </div>
            </div>
        </div>
        </div>
    </>
    )};