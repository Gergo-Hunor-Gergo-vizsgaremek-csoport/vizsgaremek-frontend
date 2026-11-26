import {Container} from "inversify";
import {useContainer} from "../services/ServiceContext.tsx";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import type {TypeReadDto} from "../dtos/TypeReadDto.ts";
import type {PeldanyReadDto} from "../dtos/PeldanyReadDto.ts";
import {PeldanyService} from "../services/PeldanyService.ts";
import {TypeService} from "../services/TypeService.ts";
import styles from "./SinglePeldanyPage.module.scss";
import {DataGrid} from "../components/DataGrid.tsx";

export function SinglePeldanyPage()
{
    const services: Container = useContainer();
    const peldanyService: PeldanyService = services.get(PeldanyService);
    const typeService: TypeService = services.get(TypeService);
    const {peldanyId} = useParams();
    const navigate = useNavigate();
    const [peldany,setPeldany] = useState<PeldanyReadDto>();
    const [peldanyType, setType] = useState<TypeReadDto>();
    const [peldanyList, setPeldanyList] = useState<PeldanyReadDto[]>([]);
    const [children, setChildren] = useState<PeldanyReadDto[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [maxPage, setMaxPage] =useState(1);
    const childLimit:number = 10;

    useEffect(() => {
        console.log("Alagút az éjszaka, fut a vonat!");
        Load();
    }, [useParams(), pageNumber]);


    async function Load()
    {
        if (!peldanyId)
        {
            return;
            console.log("Say that again!");
        }

        let result = await peldanyService.get(peldanyId);

        if (result)
        {
            setPeldany(result);

            let type = await typeService.get(result.typeId);
            setType(type);

            let count = await peldanyService.peldanyCounter(result.typeId);

            let list = await peldanyService.getByTypeId(result.typeId,count,0);
            setPeldanyList(list);

            let childList = await peldanyService.getChildren(result.id, childLimit, childLimit * (pageNumber - 1));
            setChildren(childList);
            console.log(`Neki ezek a gyermekei vannak: ${childList.map(c=>c.id)}`);

            let childrenCount = await peldanyService.childrenCounter(result.id);
            setMaxPage(Math.ceil(childrenCount / childLimit));
            console.log(`Na itten van az aktuális childList hosszúsága, ebből kéne kiszámolni, hogy mennyi oldal lehet összesen: `);


        }
    }

    function PageTurner()
    {
        if(peldany)
        {
            let place = peldanyList.map(x => x.id).indexOf(peldany.id);
            navigate(`/single/${peldanyList[place + 1].id}`, {replace: true});
        }
    }

    function PageBackTurner()
    {
        if(peldany)
        {
            let place = peldanyList.map(x => x.id).indexOf(peldany.id);
            navigate(`/single/${peldanyList[place - 1].id}`, {replace: true});
        }
    }

    function ShowParentPeldany()
    {
        if(peldany)
        {
            navigate(`/single/${peldany.parentId}`, {replace: true});
        }
    }

    function NavigetToChild(id:string)
    {
        if(peldany)
        {
            navigate(`/single/${id}`, {replace: true});
        }
    }

    if (!peldany || !peldany.id || !peldanyType || !peldanyType.id)
    {
        return (<></>)
    }

    return(
        <div className={styles.root}>
            <div className={styles.topNavigation}>
                <button onClick={PageBackTurner}>&laquo;</button>
                <button onClick={PageTurner}>&raquo;</button>
            </div>
            {peldany.parentId != null && (
                <div>
                    <button onClick={ShowParentPeldany}>Parent megtekintése</button>
                    <p>Ez a példány egy kollekció része!</p>
                </div>
            )}
            <h1>{peldanyType.name}</h1>
            <div className={styles.mainDiv}>
                <img alt="image" src={peldanyType.icon ?? "https://placehold.co/150"}/>
                <table>
                    <caption><h2>Description</h2></caption>
                    <thead>
                    <tr>
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <th>Type</th>
                        <td>{peldany.id}</td>
                    </tr>

                    <tr>
                        <th>Serialnumber</th>
                        {
                            (peldany.serialNumber === "string")
                                ? <td>Ismeretlen</td>
                                : <td>{peldany.serialNumber}</td>
                        }
                    </tr>
                    </tbody>
                </table>
                {children !== null &&(
                    (children)?
                        <DataGrid caption={"Kollekció"} data={children} clickEvent={NavigetToChild} pageNumber={pageNumber} maxPageNumber={maxPage} setPageNumber={setPageNumber} showColums={[true,false,true, true, false, false, false, false, false, false, false, false, false, false]}/>
                        :
                        <p>Betöltés...</p>
                )}
                <div className={styles.descText}>
                    <p>{peldany.description}</p>
                </div>
            </div>
        </div>
    )
}