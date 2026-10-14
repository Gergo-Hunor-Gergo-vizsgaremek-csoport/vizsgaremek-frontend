import styles from "./DataGrid.module.scss"
import  {type JSX} from "react";

type DataGridProps<T extends object> = {
    caption: string,
    data: T[],
    clickEvent: (id: string) => void,

    showColums?: boolean[],
}

export function DataGrid<T extends object>({ data, caption, clickEvent,showColums }: DataGridProps<T>): JSX.Element {

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
        <table>
            <caption><h2>{caption}</h2></caption>
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
                    <tr onClick={() => clickEvent(Object.values(x)[0]) }>{Object.values(x).map((v,index) =>
                        <td hidden={!(showColums[index])}>{String(v)}</td>
                    )}</tr>
                )
                : <tr></tr> }
            </tbody>
        </table>
        </div>
    );
}