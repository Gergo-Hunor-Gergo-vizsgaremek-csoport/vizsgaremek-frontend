import {ProductCardPresenter} from "../components/ProductCardPresenter.tsx";
import {useContainer} from "../services/ServiceContext.tsx";
import {Container} from "inversify";
import {ProductService} from "../services/ProductService.ts";
import {useEffect, useRef, useState} from "react";
import type {ProductReadDto} from "../dtos/ProductReadDto.ts";
import type {ProductCreateDto} from "../dtos/ProductCreateDto.ts";


export function AdminProductPage() {

    const services: Container = useContainer();
    const productService: ProductService = services.get(ProductService);

    const dialogRef = useRef<HTMLDialogElement>(null);

    const [data, setData] = useState<ProductReadDto[] | null>(null);

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(0);

    async function load() {
        console.log("Loading...");
        const data = await productService.search();
        setData(data);
    }

    useEffect(() => {
        load();
    }, [])

    return (
        <>
            <div>
                <button onClick={async () => {
                    dialogRef.current?.showModal();

                }}>Add</button>
            </div>
            <div>
                {data ?
                    <ProductCardPresenter products={data}/>
                    : "loading..." }
            </div>
            <dialog ref={dialogRef}>
                <h1>Create product</h1>

                <form method="dialog" onSubmit={async (event) => {

                    const action = (event.nativeEvent as SubmitEvent)
                        .submitter as HTMLButtonElement;

                    if (action.value === "cancel") {
                        return;
                    }


                    let product: ProductCreateDto = {
                        name: name,
                        description: description,
                        image: image == "" ? null : image,
                        price: price,
                        quantity: quantity
                    }

                    await productService.create(product);


                    load();
                }}>
                    <input type={"text"}
                           name={"name"}
                           placeholder={"Name"}
                           value={name}
                           onChange={(e) => setName(e.target.value)}/>
                    <br/>
                    <input type={"text"}
                           name={"desc"}
                           placeholder={"Description"}
                           value={description}
                           onChange={(e) => setDescription(e.target.value)}/>
                    <br/>
                    <input type={"url"}
                           name={"img"}
                           placeholder={"Image"}
                           value={image}
                           onChange={(e) => setImage(e.target.value)}/>
                    <br/>
                    <input type={"number"}
                           name={"price"}
                           placeholder={"Price"}
                           value={price}
                           onChange={(e) => setPrice(e.target.valueAsNumber)}/>
                    <br/>
                    <input type={"number"}
                           name={"quantity"}
                           placeholder={"Quantity"}
                           value={quantity}
                           onChange={(e) => setQuantity(e.target.valueAsNumber)}/>
                    <br/>

                    <button value="cancel">Cancel</button>
                    <button value="ok">Ok</button>

                </form>

            </dialog>
        </>
    )
}