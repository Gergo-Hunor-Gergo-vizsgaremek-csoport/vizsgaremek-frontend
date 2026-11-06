import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {Container} from "inversify";
import {useContainer} from "../services/ServiceContext.tsx";
import type {PeldanyReadDto} from "../dtos/PeldanyReadDto.ts";
import {SingleService} from "../services/SingleService.ts";
import styles from "./SinglePeldanyPage.module.scss";
import {NavBar} from "../components/NavBar.tsx";
//import {NavBar} from "../components/NavBar.tsx";
//import {RendelesService} from "../services/RendelesService.ts";

export function SinglePeldanyPage() {
    const services: Container = useContainer();
    const singleService: SingleService = services.get(SingleService);
    const {peldanyId} = useParams();
    const [peldany,setPeldany] = useState<PeldanyReadDto>();
    /*const rendelesService: RendelesService = services.get(RendelesService);
    const [quantity,setQuantity] = useState(0);*/
    const navigate = useNavigate();

    useEffect(() => {
        Load();
    }, []);

    async function Load()
    {
        if (!peldanyId) return;

        try {
            let result = await singleService.get(peldanyId);
            setPeldany(result);
        } catch (error) {
            console.log("Baj van!");
        }
    }

    if (!peldany || !peldany.id)
    {
        return (alert("A kiválasztott példány nem található!"));
    }
    return (
        <div className={styles.root}>
            <NavBar onSearchQueryChange={()=>{}}/>
            <div>
                <div className={styles.mainDiv}>
                    <div className={styles.buttonDiv}>
                        <button className={styles.deleteButton} onClick={async () => {
                            await singleService.delete(peldany.id)
                            navigate("/")
                        }}>Törlés</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
