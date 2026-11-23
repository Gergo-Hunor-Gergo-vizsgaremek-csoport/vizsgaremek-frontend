import styles from "../components/RendelesHozzarendelDialog.module.scss"
import {useEffect, useRef, useState} from "react";
import type {PeldanyReadDto} from "../dtos/PeldanyReadDto.ts";
import {TypeService} from "../services/TypeService.ts";
import {useContainer} from "../services/ServiceContext.tsx";
import type {RendelesReadDto} from "../dtos/RendelesReadDto.ts";
import type {KolcsonzesWriteDto} from "../dtos/KolcsonzesWriteDto.ts";
import {RendelesService} from "../services/RendelesService.ts";
import type {RendelesWriteDto} from "../dtos/RendelesWriteDto.ts";


interface RendelesHozzarendelDialogProps {
    isOpen: boolean;
    setIsOpen: (newValue :boolean) => void;
    rendeles: RendelesReadDto;
}

export function RendelesHozzarendelDialog({isOpen, setIsOpen, rendeles}: RendelesHozzarendelDialogProps) {

    const services = useContainer();
    const typeService = services.get(TypeService);
    const rendelesService = services.get(RendelesService);

    const dialogRef = useRef<HTMLDialogElement>(null);
    const okButtonRef = useRef<HTMLButtonElement>(null);

    const [selectedPeldanys,setSelectedPeldanys] = useState<PeldanyReadDto[]>([]);
    const [peldanys,setPeldanys] = useState<PeldanyReadDto[]>();


    async function Load()
    {
        let resultPeldanys = await typeService.getPeldanyok(rendeles.typeId);
        console.log(resultPeldanys);
        setPeldanys(resultPeldanys);
    }

    async function CreateKolcsonzesek()
    {
        let kolcsonzesek: KolcsonzesWriteDto[] = [];
        for (let i = 0; i< selectedPeldanys.length; i++)
        {
            let expirationDate = new Date();
            // 1 hónap múlva jár le
            expirationDate.setMonth(expirationDate.getMonth() + 1);

            let kolcsonzesWriteDto: KolcsonzesWriteDto = {
                peldanyId: selectedPeldanys[i].id,
                userId: rendeles.userId,
                date: new Date().toJSON(),
                expirationDate: expirationDate.toJSON(),
            }
            kolcsonzesek[i] = kolcsonzesWriteDto;
        }
        await rendelesService.assignKolcsonzesek(rendeles.id,kolcsonzesek);

        let rendelesWriteDto: RendelesWriteDto = {
            typeId: rendeles.typeId,
            userId: rendeles.userId,
            date: rendeles.date,
            quantity: rendeles.quantity,
            completedQuantity: rendeles.completedQuantity + selectedPeldanys.length
        }
        await rendelesService.put(rendeles.id, rendelesWriteDto);
        setIsOpen(false);
        ResetSelectedPeldanys();
        await Load();
    }

    function ResetSelectedPeldanys(){
        //a divek visszaszínezése szürkére és a lista kiürítése
        selectedPeldanys.map(y=>
            document.getElementById("selectDiv_"+y.id)).map(x=> x?x.classList.remove(styles.activepeldanyDiv):"");
        setSelectedPeldanys([]);
    }


    useEffect(() => {
        console.log(selectedPeldanys);
    }, [selectedPeldanys]);

    useEffect(() => {
        if (dialogRef.current) {
            if (isOpen) {
                dialogRef.current.showModal();
                Load();
            } else {
                dialogRef.current.close();
            }
        }
    }, [isOpen]);

    useEffect(() => {
        if (!okButtonRef.current) return;


        if (selectedPeldanys.length === 0)
            okButtonRef.current.disabled = true;

        else
            okButtonRef.current.disabled = false;
    }, [selectedPeldanys]);


    return (
        <dialog className={styles.root} ref={dialogRef} onClose={() =>setIsOpen(false)}>
            <p className={styles.hozzaRendeltP}>Hozzárendelt: {selectedPeldanys.length+rendeles.completedQuantity}/{rendeles.quantity}</p>
            {
                (!peldanys || peldanys.length === 0)?
                    <div><h1 className={styles.noPeldanyh1}>Nincs hozzáadható példány!</h1></div>
                :
                peldanys?.map(x=>
                <div key={x.id} id={"selectDiv_"+x.id} className={styles.peldanyDiv}
                     onClick={(e) =>{
                         if (selectedPeldanys.map(y=>y.id).includes(x.id))
                         {
                             //listából kivétel
                             setSelectedPeldanys(prev => prev.filter(y=>y.id !== x.id));
                             e.currentTarget.classList.remove(styles.activepeldanyDiv);
                         }
                         else if (rendeles.quantity == selectedPeldanys.length+rendeles.completedQuantity) {
                             alert("Rendelési mennyiség elérve! Nem adhatsz többet hozzá!")
                             return;
                         }
                         else
                         {
                             //hozzáadás
                             setSelectedPeldanys([...selectedPeldanys,x]);
                             e.currentTarget.classList.add(styles.activepeldanyDiv);
                         }
                     }}
                >
                    <p>{x.id}</p>
                </div>
            )}
            <div className={styles.buttonDiv}>
                <button className={styles.cancelButton} onClick={() =>{
                    setIsOpen(false);
                    ResetSelectedPeldanys();
                }}>Mégse</button>

                <button ref={okButtonRef} className={styles.okButton} onClick={CreateKolcsonzesek}>Megerősítés</button>
            </div>
        </dialog>

    )
}