import {Link} from "react-router";


export function MainPage() {
    return (
        <>
            <Link to={"/dev"}>dev</Link>
            <Link to={"/product"}>product</Link>
        </>
    )
}