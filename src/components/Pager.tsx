import {useEffect, useRef} from "react";
import styles from "./Pager.module.scss"

type PagerProps = {
    pageNumber: number;
    setPageNumber: (pageNumber: number) => void;
    maxPageNumber: number;
}

export function Pager({pageNumber,setPageNumber, maxPageNumber}:PagerProps)
{
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    function PageNumChange(p: number)
    {
        if (!setPageNumber || !prevRef.current || !nextRef.current) return;

        setPageNumber(p);
        if (maxPageNumber === 1)
        {
            nextRef.current.disabled = true;
            prevRef.current.disabled = true;
        }
        else if (p === maxPageNumber)
        {
            nextRef.current.disabled = true;
            prevRef.current.disabled = false;
        }
        else if (p === 1)
        {
            prevRef.current.disabled = true;
            nextRef.current.disabled = false;
        }
        else
        {
            prevRef.current.disabled = false;
            nextRef.current.disabled = false;
        }
    }

    useEffect(() => {
        PageNumChange(pageNumber);
    },[pageNumber,maxPageNumber]);

    return(
        <div className={styles.root}>
            <button className={styles.pagerButton} ref={prevRef} onClick={() => PageNumChange(pageNumber-1)}><i className={`material-icons ${styles.pagerIcon}`}>arrow_back_ios</i></button>
            <span className={styles.pagerDisplay}>{pageNumber}</span>
            <button className={styles.pagerButton} ref={nextRef} onClick={()=> PageNumChange(pageNumber+1)}><i className={`material-icons ${styles.pagerIcon}`}>arrow_forward_ios</i></button>
        </div>
    )
}