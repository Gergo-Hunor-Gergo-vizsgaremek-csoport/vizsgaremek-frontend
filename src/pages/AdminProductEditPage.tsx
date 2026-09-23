import {Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {type ProductReadDto, ProductService} from "../services/ProductService.ts";
import {Container} from "inversify";
import {useContainer} from "../services/ServiceContext.tsx";
import styles from "./AdminProductEditPage.module.scss";


export function AdminProductEditPage() {
    const services: Container = useContainer();
    const productService: ProductService = services.get(ProductService);

    const navigate = useNavigate();

    const {productId: productId} = useParams();

    const [product, setProduct] = useState<ProductReadDto | null>(null);

    async function load() {
        if (!productId) throw new TypeError("productId must not be null")
        let product: ProductReadDto = await productService.get(productId)

        setProduct(product)
    }

    useEffect(() => {
        load();
    }, [])


    return (
        <div className={styles.root}>
            <Link to={`/product/`}>Back</Link>
            <h1>{product?.name}</h1>
            <img alt="image" src={product?.image ?? "https://placehold.co/150"}/>
            <p>{product?.description}</p>

            <h2>{product?.price} Ft</h2>
            <h4>{product?.quantity} in stock</h4>

            <div>
                <button onClick={async () => {
                    if (!product?.id) throw new TypeError("Product not found!");
                    console.log(`deleting ${product.id}`);
                    await productService.delete(product?.id)
                    console.log(`deleted ${product?.id}`);
                    navigate("/product");
                }}>Delete</button>
            </div>
        </div>
    )
}