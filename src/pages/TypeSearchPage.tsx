import {NavBar} from "../components/NavBar.tsx";
import {useContainer} from "../services/ServiceContext.tsx";
import {Container} from "inversify";
import type {TypeReadDto} from "../dtos/TypeReadDto.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {TypeService} from "../services/TypeService.ts";
import {DataGrid} from "../components/DataGrid.tsx";
import styles from "./TypeSearchPage.module.scss";
import {AddTypeDialog} from "../components/AddTypeDialog.tsx";

export function TypeSearchPage() {
    const services: Container = useContainer();
    const typeService: TypeService = services.get(TypeService);
    const navigate = useNavigate();

    const [data,setdata] = useState<TypeReadDto[]>([]);
    const [pagenum,setPagenum] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    const [isOpen, setIsOpen] = useState(false);    //add type dialog

    const [searchquery, setSearchquery] = useState("");

    const LIMIT = 10;

    async function Load()
    {
        let count = await typeService.searchCount(searchquery);
        let newmax = Math.ceil(count / LIMIT);
        setMaxPage(newmax);
        if (count === 0)
        {
            return;
        }
        if (pagenum > newmax) {
            setPagenum(newmax);
        }

        let result = await typeService.search(searchquery,LIMIT,LIMIT*(pagenum-1));
        setdata(result);
    }

    useEffect(() => {
        if (!isOpen)
        {
            Load();
        }
    }, [searchquery,pagenum,isOpen]);



    function ClickedType(id:string)
    {
        navigate(`/type/${id}`);
    }

    return (
        <>
            <NavBar onSearchQueryChange={setSearchquery} />
                {
                    (data && maxPage > 0)?
                        <DataGrid caption={"Típusok"} data={data} clickEvent={ClickedType} pageNumber={pagenum} maxPageNumber={maxPage} setPageNumber={setPagenum} showColums={[false,true,true]}/>
                        :
                        <></>
                }
                <div className={styles.buttonDiv}>
                    <button className={styles.addTypeButton} onClick={() => setIsOpen(true)}>Típus hozzáadása</button>
                </div>
            <AddTypeDialog isOpen={isOpen} setIsOpen={setIsOpen}></AddTypeDialog>
        </>
    )
}