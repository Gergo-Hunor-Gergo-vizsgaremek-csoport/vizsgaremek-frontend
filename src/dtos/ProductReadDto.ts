export interface ProductReadDto {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
    price: number;
    quantity: number;
}
