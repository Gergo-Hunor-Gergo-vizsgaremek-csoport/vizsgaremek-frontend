import styles from "./DataGrid.module.scss"
import  {type JSX} from "react";

type DataGridProps<T extends object> = {
    data: T[],
}

export function DataGrid<T extends object>({ data }: DataGridProps<T>): JSX.Element {
    return (
        <table className={styles.root}>
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
                    <tr>{Object.values(x).map(v => <td>{String(v)}</td>)}</tr>
                )
                : <tr></tr> }
            </tbody>
        </table>
    );
}