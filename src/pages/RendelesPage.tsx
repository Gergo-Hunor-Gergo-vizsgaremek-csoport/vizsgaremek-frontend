import {useParams} from "react-router";
import {useState, useEffect, useRef} from "react";
import type {RendelesReadDto} from "../dtos/RendelesReadDto.ts";
import {useContainer} from "../services/ServiceContext.tsx";
import {RendelesService} from "../services/RendelesService.ts";
import {TypeService} from "../services/TypeService.ts";
import type {TypeReadDto} from "../dtos/TypeReadDto.ts";
import styles from "../pages/RendelesPage.module.scss"
import type {PeldanyReadDto} from "../dtos/PeldanyReadDto.ts";

export function RendelesPage() {
    const services = useContainer();
    const rendelesService = services.get(RendelesService);
    const typeService = services.get(TypeService);
    const {rendelesId} = useParams();
    const [rendeles,setRendeles] = useState<RendelesReadDto>();
    const [peldanys,setPeldanys] = useState<PeldanyReadDto[]>();
    const [typeName,setTypeName] = useState<string>("");

    const [selectedPeldanys,setSelectedPeldanys] = useState<PeldanyReadDto[]>([])

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dialogRef = useRef<HTMLDialogElement>(null);

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

        let resultPeldanys = await typeService.getPeldanyok("e58aadd2-6682-4c54-8d02-a09e730d3d32");
        console.log(resultPeldanys);
        setPeldanys(resultPeldanys);
    }

    useEffect(() => {
        Load();
    }, []);

    useEffect(() => {
        if (dialogRef.current) {
            if (isOpen) {
                dialogRef.current.showModal();
            } else {
                dialogRef.current.close();
            }
        }
    }, [isOpen]);


    return (
        <div className={styles.root}>
        <p>ID: {rendeles?.id}</p>
        <p>USERID: {rendeles?.userId}</p>
        <p>Típus: {typeName}</p>
        <p>DATE: {rendeles?.date.toString()}</p>
        <p>Teljesített: {rendeles?.completedQuantity}/{rendeles?.quantity}</p>
        <button onClick={() => {
            setIsOpen(true);
        }}>Hozzárendelés</button>
        <dialog className={styles.hozzarendelosDialog} ref={dialogRef} onClose={() =>setIsOpen(false)}>
            {peldanys?.map(x=>
                <div data-peldanyId={x.id} key={x.id} className={styles.peldanyDiv}
                     onClick={(e) =>{
                         e.currentTarget.dataset.peldanyId=x.id;
                         setSelectedPeldanys([...peldanys,x])
                     }}


                >
                    <p>{x.id}</p>
                </div>
            )}
            <div className={styles.buttonDiv}>
                <button className={styles.cancelButton} onClick={() =>setIsOpen(false)}>Mégse</button>
                <button className={styles.okButton} onClick={() =>setIsOpen(false)}>Megerősítés</button>
                <button className={styles.okButton} onClick={() => console.log(selectedPeldanys)}>asd</button>
            </div>
        </dialog>
        </div>
    )
}