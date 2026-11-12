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
    selectedDate: Date;
}