import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import type {PeldanyReadDto} from "../dtos/PeldanyReadDto.ts";
import {Container} from "inversify";
import {useContainer} from "../services/ServiceContext.tsx";
import {SingleService} from "../services/SingleService.ts";
import {RendelesService} from "../services/RendelesService.ts";
//import styles from "./SinglePeldanyPage.module.scss";
//import {NavBar} from "../components/NavBar.tsx";

export function SinglePeldanyPage() {
    const services: Container = useContainer();
    const peldanyService: SingleService = services.get(SingleService);
    const rendelesService: RendelesService = services.get(RendelesService);
    const {peldanyId} = useParams();
    const [peldany,setPeldany] = useState<PeldanyReadDto>();
    const [quantity,setQuantity] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        Load();
    }, []);

    async function Load()
    {
        if (!peldanyId) return;

        try {
            let result = await peldanyService.get(peldanyId);
            setPeldany(result);
        } catch (error) {
            console.log("Baj van!");
        }
    }

    if (!peldany || !peldany.id)
    {
        return (<></>)
    }
}
