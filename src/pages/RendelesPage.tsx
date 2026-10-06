import {useParams} from "react-router";
import {useEffect, useState} from "react";
import type {RendelesReadDto} from "../dtos/RendelesReadDto.ts";
import {useContainer} from "../services/ServiceContext.tsx";
import {RendelesService} from "../services/RendelesService.ts";

export function RendelesPage() {
    const services = useContainer();
    const rendelesService = services.get(RendelesService);
    const {rendelesId} = useParams();
    const [rendeles,setRendeles] = useState<RendelesReadDto>();

    async function Load() {
        if (!rendelesId)
        {
            return;
        }
        let result = await rendelesService.get(rendelesId);
        console.log(result);
        setRendeles(result);
    }

    useEffect(() => {
       Load();
    }, []);

    return (
        <>
        <p>ID: {rendeles?.id}</p>
        <p>USERID: {rendeles?.userId}</p>
        <p>TYPEID: {rendeles?.typeId}</p>
        <p>DATE: {rendeles?.date.toString()}</p>
        <p>QUANTITY: {rendeles?.quantity}</p>
        <p>COMPLETEDQUANTITY: {rendeles?.completedQuantity}</p>
        </>
    )
}