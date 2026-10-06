export interface PeldanyUpdateCreateDto {
    typeId: string;
    parentId: string | null;
    locationId: string;
    felelosId: string;
    description: string | null;
    date: string;
    manufacturingDate: string;
    isselejtes: boolean;
    isselejtsugg: boolean;
    ishibas: boolean;
    selejtDate: string | null;
}