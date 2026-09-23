export interface ProductCreateDto {
    name: string;
    description: string | null;
    image: string | null;
    price: number;
    quantity: number;
}
