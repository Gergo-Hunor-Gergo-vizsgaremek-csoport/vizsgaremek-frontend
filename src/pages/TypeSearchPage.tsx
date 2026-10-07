import {NavBar} from "../components/NavBar.tsx";
import {useContainer} from "../services/ServiceContext.tsx";
import {Container} from "inversify";
import styles from "./TypeSearchPage.module.scss";
import type {TypeReadDto} from "../dtos/TypeReadDto.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {TypeService} from "../services/TypeService.ts";
import {HighlightElements} from "../Highligher.ts";
import {PeldanySzuroModalPage} from "../components/PeldanySzuroModalPage.tsx";

export function TypeSearchPage() {
    const services: Container = useContainer();
    const typeService: TypeService = services.get(TypeService);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const [data,setdata] = useState<TypeReadDto[] | null>();

    const [searchquery, setSearchquery] = useState("");

    async function Load()
    {
        let result = await typeService.search(searchquery,10,0);
        setdata(result);
    }

    useEffect(() => {
        Load();

    }, [searchquery]);


    useEffect(() => {
        let mezok = Array.from(document.querySelectorAll("td"));
        HighlightElements(mezok,searchquery);
    }, [data,searchquery]);



    function ClickedType(id:string)
    {
        console.log(id);
        navigate(`/type/${id}`);
    }

    return (
        <>
            <NavBar onSearchQueryChange={setSearchquery}/>
            <div className={styles.root}>
                <table className={styles.maintable}>
                    <colgroup>
                        <col width={'25%'}/>
                        <col width={'25%'}/>
                        <col width={'25%'}/>
                        <col width={'25%'}/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>description</th>
                        <th>icon</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(data && data.length > 0)?
                        data.map(x=>
                            <tr key={x.id} id={x.id} onClick={e=>ClickedType(e.currentTarget.id)}>
                                <td>{x.id}</td>
                                <td data-text={x.name}>{x.name}</td>
                                <td>{x.description}</td>
                                <td>{x.icon}</td>
                            </tr>
                        )
                        : <tr></tr> }
                    </tbody>
                </table>
                <button onClick={() => setIsOpen(true)}>Modal Megnyitása</button>

                <PeldanySzuroModalPage
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Példány Szűrő"
                >
                    <p>SZŐKECIGAAAAAAAAAAAAAAAAAAAANY OÁOÁOÁ</p>
                </PeldanySzuroModalPage>
            </div>
        </>
    )
}