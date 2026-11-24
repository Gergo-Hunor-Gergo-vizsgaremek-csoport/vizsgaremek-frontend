export interface PeldanyReadDto {
    id: string;
    typeId: string;
    description: string;
    addDate: Date;
    manufacturingDate?: Date;
    serialNumber?: string;
    isHibas: boolean;
    isSelejt: boolean;
    isSelejtSugg: boolean;
    parentId: string;
    children: PeldanyReadDto[];
    selectedDate: Date;
}