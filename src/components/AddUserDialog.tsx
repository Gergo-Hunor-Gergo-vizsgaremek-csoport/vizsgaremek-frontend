import styles from "./AddUserDialog.module.scss";
import {useEffect, useRef, useState} from "react";
import {useContainer} from "../services/ServiceContext.tsx";
import type {UserWriteDto} from "../dtos/UserWriteDto.ts";
import {UserService} from "../services/UserService.ts";

interface AddTypeDialogProps {
    isOpen: boolean;
    setIsOpen: (newvalue:boolean) => void;
}

export function AddUserDialog({isOpen,setIsOpen}: AddTypeDialogProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const services = useContainer();
    const userservice= services.get(UserService);

    const [username,setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);


    async function AddUser()
    {
        if (!Validtions())
        {
            return;
        }

        let dto: UserWriteDto = {
            username:username,
            email:email,
            password:password
        }
        await userservice.post(dto);
        setIsOpen(false);
    }

    function Validtions()
    {

        let valid = true;

        //Felhasználónév
        const usernameRegex = /^(?!\.)(?!.*\.$)[a-zA-Z0-9.]+$/;
        if (username.length === 0)
        {
            setUsernameError("Felhasználónév megadása kötelező!");
            valid = false;
        }
        else if (username.length > 50)
        {
            setUsernameError("A felhasználónév túl hosszú!");
            valid = false;
        }
        else if (!usernameRegex.test(username))
        {
            setUsernameError("Felhasználónév nem tartalmazhat ékezetes/speciális karaktereket és szóközt, nem kezdődhet és nem végződhet ponttal!");
            valid = false;
        }
        else{
            setUsernameError(null);
        }

        //Email
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (email.length === 0)
        {
            setEmailError("Email cím kitöltése kötelező!");
            valid = false;
        }
        else if (!emailRegex.test(email))
        {
            setEmailError("Hibás email cím!");
            valid = false;
        }
        else
        {
            setEmailError(null);
        }

        //Jelszó
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s])\S{8,}$/
        if (password.length === 0)
        {
            setPasswordError("Jelszó mező kitöltése kötelező!");
            valid = false;
        }
        else if (!passwordRegex.test(password))
        {
            setPasswordError("A jelszónak minimum 8 karakter hosszúnak kell lenni és tartalmazni kell kisbetűt,nagybetűt számot és speciális karaktert is!");
            valid = false;
        }
        else
        {
            setPasswordError(null);
        }

        return valid;
    }

    return (
        <dialog open={isOpen} className={styles.root} ref={dialogRef} onClose={() =>setIsOpen(false)} closedby={"any"}>
            <h1>Új felhasználó hozzáadása</h1>
            <div className={styles.addUserDiv}>
                <input value={username} onChange={e => setUsername(e.currentTarget.value)} placeholder={"Felhasználónév"}/><br/>
                <p className={styles.errorP}>{usernameError}</p>
                <input value={email} type={"email"} onChange={e => setEmail(e.currentTarget.value)} placeholder={"Email cím"}/><br/>
                <p className={styles.errorP}>{emailError}</p>
                <input value={password} type={"password"} onChange={e => setPassword(e.currentTarget.value)} placeholder={"Jelszó"}/><br/>
                <p className={styles.errorP}>{passwordError}</p>
                <button onClick={AddUser} className={styles.submitButton}>Hozzáadás</button>
            </div>
        </dialog>
    )
}