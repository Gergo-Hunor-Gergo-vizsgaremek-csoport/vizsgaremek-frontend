import styles from "./AddTypeDialog.module.scss";
import {useRef, useState} from "react";

export function AddTypeDialog() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <dialog className={styles.root} ref={dialogRef} onClose={() =>setIsOpen(false)}>

        </dialog>
    )
}