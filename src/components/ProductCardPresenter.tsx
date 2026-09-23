import styles from "./ProductCardPresenter.module.scss";
import {ProductCard} from "./ProductCard.tsx";
import type {ProductReadDto} from "../dtos/ProductReadDto.ts";


type ProductCardPresenterProps = {
    products: ProductReadDto[];
}

export function ProductCardPresenter({ products }: ProductCardPresenterProps) {
    return <div className={styles.root}>
        {products.map((product: ProductReadDto) => <ProductCard product={product}/>)}
    </div>
}