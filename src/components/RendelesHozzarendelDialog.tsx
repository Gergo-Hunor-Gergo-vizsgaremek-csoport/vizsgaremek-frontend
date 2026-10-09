import styles from "../components/RendelesHozzarendelDialog.module.scss"
import {useEffect, useRef, useState} from "react";
import type {PeldanyReadDto} from "../dtos/PeldanyReadDto.ts";
import {TypeService} from "../services/TypeService.ts";
import {useContainer} from "../services/ServiceContext.tsx";


interface RendelesHozzarendelDialogProps {
    isOpen: boolean;
    setIsOpen: (newValue :boolean) => void;
    typeId: string;
    quantity: number;
}

export function RendelesHozzarendelDialog({isOpen, setIsOpen, typeId, quantity}: RendelesHozzarendelDialogProps) {

    const services = useContainer();
    const typeService = services.get(TypeService);

    const dialogRef = useRef<HTMLDialogElement>(null);
    const [selectedPeldanys,setSelectedPeldanys] = useState<PeldanyReadDto[]>([]);
    const [peldanys,setPeldanys] = useState<PeldanyReadDto[]>();


    async function Load()
    {
        let resultPeldanys = await typeService.getPeldanyok(typeId);
        console.log(resultPeldanys);
        setPeldanys(resultPeldanys);
    }

    useEffect(() => {
        Load();
    }, []);

    useEffect(() => {
        console.log(selectedPeldanys);
    }, [selectedPeldanys]);

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
        <dialog className={styles.root} ref={dialogRef} onClose={() =>setIsOpen(false)}>
            <p>Hozzárendelt: {selectedPeldanys.length}/{quantity}</p>

            {peldanys?.map(x=>
                <div key={x.id} className={styles.peldanyDiv}
                     onClick={(e) =>{
                         if (selectedPeldanys.map(y=>y.id).includes(x.id))
                         {
                             //listából kivétel
                             setSelectedPeldanys(prev => prev.filter(y=>y.id !== x.id));
                             e.currentTarget.style.backgroundColor="lightgray"
                         }
                         else if (quantity == selectedPeldanys.length) {
                             alert("Rendelési mennyiség elérve! Nem adhatsz többet hozzá!")
                             return;
                         }
                         else
                         {
                             //hozzáadás
                             setSelectedPeldanys([...selectedPeldanys,x]);
                             e.currentTarget.style.backgroundColor="green"
                         }
                     }}
                >
                    <p>{x.id}</p>
                </div>
            )}
            <div className={styles.buttonDiv}>
                <button className={styles.cancelButton} onClick={() =>setIsOpen(false)}>Mégse</button>

                <button className={styles.okButton}>Példánygenerálás</button>

                <button className={styles.okButton} onClick={() =>setIsOpen(false)}>Megerősítés</button>
            </div>
        </dialog>

    )
}