import styles from "./DataGrid.module.scss"
import {type JSX} from "react";
import {Pager} from "./Pager.tsx";

type DataGridProps<T extends object> = {
    caption: string,
    data: T[],
    clickEvent?: (id: string) => void,
    pageNumber?: number,
    setPageNumber?: (pageNumber: number) => void,
    maxPageNumber?: number

    showColums?: boolean[],
}

export function DataGrid<T extends object>({ data, caption, clickEvent,showColums,pageNumber=1,setPageNumber=()=>{},maxPageNumber=1}: DataGridProps<T>): JSX.Element {



    if (pageNumber > maxPageNumber) {
        setPageNumber(maxPageNumber);
    }

    if (data.length === 0) {
        return (<></>);
    }

    //showColums = [false, true, true, false, true, false];

    if (showColums == null) {
        showColums = new Array<boolean>(Object.keys(data[0]).length);
        showColums = showColums.map(() => true);
        showColums.fill(true);
    } else if (showColums.length < Object.keys(data[0]).length) {
        let newArray = new Array<boolean>(Object.keys(data[0]).length - showColums.length);
        newArray.fill(true);
        showColums = showColums.concat(newArray);
    }



    return (
        <div className={styles.root}>
            <h1>{caption}</h1>
        <div className={styles.wrapper}>
        <table>
            <thead>
            <tr>
                {
                    Object.keys(data[0]).map((key,index) => (<th hidden={!(showColums[index])}>{key}</th>))
                }

            </tr>
            </thead>
            <tbody>

            {(data && data.length > 0)?
                data.map(x=>
                    <tr onClick={() => {
                        if (clickEvent) {
                            clickEvent(Object.values(x)[0])
                        }}}>

                        {Object.values(x).map((v,index) =>
                        <td hidden={!(showColums[index])}>{String(v)}</td>
                        )}

                    </tr>
                )
                : <tr></tr> }
            </tbody>
        </table>
        </div>
            {(maxPageNumber > 1)?<Pager pageNumber={pageNumber} setPageNumber={setPageNumber} maxPageNumber={maxPageNumber}/>:<></>}
        </div>
    );
}