import styles from "./AddTypeDialog.module.scss";
import {useRef, useState} from "react";
import {useContainer} from "../services/ServiceContext.tsx";
import {TypeService} from "../services/TypeService.ts";
import type {TypeWriteDto} from "../dtos/TypeWriteDto.ts"

interface AddTypeDialogProps {
    isOpen: boolean;
    setIsOpen: (newvalue:boolean) => void;
}

export function AddTypeDialog({isOpen,setIsOpen}: AddTypeDialogProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const services = useContainer();
    const typeservice = services.get(TypeService);

    const [name,setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [icon, setIcon] = useState<string>("");

    async function AddType()
    {
        let dto: TypeWriteDto = {
            name:name,
            description:description,
            icon:icon
        }
        await typeservice.post(dto);
        setIsOpen(false);
    }

    return (
        <dialog open={isOpen} className={styles.root} ref={dialogRef} onClose={() =>setIsOpen(false)} closedby={"any"}>
            <h1>Új típus hozzáadása</h1>
            <div className={styles.addTypeDiv}>
                <input value={name} onChange={e => setName(e.currentTarget.value)} placeholder={"Név"}/><br/>
                <input value={description} onChange={e => setDescription(e.currentTarget.value)} placeholder={"Leírás"}/><br/>
                <input value={icon} onChange={e => setIcon(e.currentTarget.value)} placeholder={"Ikon"}/><br/>
                <button onClick={AddType} className={styles.submitButton}>Hozzáadás</button>
            </div>
        </dialog>
    )
}