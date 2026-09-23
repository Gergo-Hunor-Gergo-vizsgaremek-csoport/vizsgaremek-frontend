import styles from "./ProductCard.module.scss"
import type {JSX} from "react";
import {Link} from "react-router";
import type {ProductReadDto} from "../dtos/ProductReadDto.ts";

type ProductCardProps = {
    product: ProductReadDto;
}

export function ProductCard({ product }: ProductCardProps): JSX.Element {
    return (
        <Link to={`/product/${product.id}`}
              style={{
                  color: "inherit",
                  textDecoration: "none"
              }}>
            <div className={styles.root}>
                <img src={product.image ?? "https://placehold.co/150"} alt="image"/>
                <h1>{product.name}</h1>
                <p className={styles.clamp}>{product.description}</p>
                <h3>{product.price} Ft</h3>
            </div>
        </Link>
    );
}