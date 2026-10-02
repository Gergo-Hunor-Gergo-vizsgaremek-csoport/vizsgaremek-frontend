import {ProductCardPresenter} from "../components/ProductCardPresenter.tsx";
import {Lorem} from "../Constants.ts";
import type {ProductReadDto} from "../dtos/ProductReadDto.ts";
import {DataGrid} from "../components/DataGrid.tsx";

let data: ProductReadDto[] = [
    {
        id: "",
        name: "test",
        description: Lorem,
        image: "https://placehold.co/150",
        quantity: 20,
        price: 5,
    },
    {
        id: "",
        name: "test2",
        description: Lorem,
        image: "https://placehold.co/150",
        quantity: 10,
        price: 5,
    },
    {
        id: "",
        name: "test3",
        description: Lorem,
        image: "https://placehold.co/150",
        quantity: 200,
        price: 2,
    },
    {
        id: "",
        name: "test4",
        description: Lorem,
        image: "https://placehold.co/150",
        quantity: 2,
        price: 50,
    },
    {
        id: "",
        name: "test5",
        description: Lorem,
        image: "https://placehold.co/150",
        quantity: 20,
        price: 8,
    },
]


export async function Alerter(promise: any){
    let response = await promise;
    alert(response);
    console.log(response);

}

export function DevPage() {
    return (
        <DataGrid data={data}></DataGrid>
    )
}