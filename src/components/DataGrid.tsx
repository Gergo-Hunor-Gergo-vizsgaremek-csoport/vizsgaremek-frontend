import styles from "./DataGrid.module.scss"
import  {type JSX} from "react";

type DataGridProps<T extends object> = {
    caption: string,
    data: T[],
    clickEvent: (id: string) => void,
}

export function DataGrid<T extends object>({ data, caption, clickEvent }: DataGridProps<T>): JSX.Element {

    if (data.length === 0) {
        return (<></>);
    }
    return (
        <div className={styles.root}>
        <table>
            <caption><h2>{caption}</h2></caption>
            <thead>
            <tr>
                {
                    Object.keys(data[0]).map(key => (<th>{key}</th>))
                }

            </tr>
            </thead>
            <tbody>
            {(data && data.length > 0)?
                data.map(x=>
                    <tr onClick={() => clickEvent(Object.values(x)[0]) }>{Object.values(x).map(v => <td>{String(v)}</td>)}</tr>
                )
                : <tr></tr> }
            </tbody>
        </table>
        </div>
    );
}