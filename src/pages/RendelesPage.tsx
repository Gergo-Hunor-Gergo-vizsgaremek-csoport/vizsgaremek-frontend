import {useParams} from "react-router";
import {useState, useEffect} from "react";
import type {RendelesReadDto} from "../dtos/RendelesReadDto.ts";
import {useContainer} from "../services/ServiceContext.tsx";
import {RendelesService} from "../services/RendelesService.ts";
import {TypeService} from "../services/TypeService.ts";
import type {TypeReadDto} from "../dtos/TypeReadDto.ts";
import styles from "../pages/RendelesPage.module.scss"
import {RendelesHozzarendelDialog} from "../components/RendelesHozzarendelDialog.tsx";

export function RendelesPage() {
    const services = useContainer();
    const rendelesService = services.get(RendelesService);
    const typeService = services.get(TypeService);
    const {rendelesId} = useParams();
    const [rendeles,setRendeles] = useState<RendelesReadDto>();
    const [typeName,setTypeName] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    async function Load() {
        console.log("Load Rendeles");
        if (!rendelesId)
        {
            return;
        }
        let resultRendeles:RendelesReadDto = await rendelesService.get(rendelesId);
        console.log(resultRendeles.typeId);
        setRendeles(resultRendeles);
        let resultType:TypeReadDto = await typeService.get(resultRendeles.typeId);
        setTypeName(resultType.name);
    }

    useEffect(() => {
        Load();
    }, []);

    return (
        <div className={styles.root}>
        <p>ID: {rendeles?.id}</p>
        <p>USERID: {rendeles?.userId}</p>
        <p>Típus: {typeName}</p>
        <p>DATE: {rendeles?.date.toString()}</p>
        <p>Hozzárendelt: {rendeles?.completedQuantity}/{rendeles?.quantity}</p>

        <button onClick={() => {
            setIsOpen(true);
        }}>Hozzárendelés</button>
            {
                (rendeles?.typeId)?
                <RendelesHozzarendelDialog isOpen={isOpen} setIsOpen={setIsOpen} typeId={rendeles?.typeId}/>
                    :<p>Nincs ilyen rendelés</p>
            }
        </div>
    )
}