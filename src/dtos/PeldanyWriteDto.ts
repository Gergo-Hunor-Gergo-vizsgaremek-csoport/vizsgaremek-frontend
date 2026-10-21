export interface PeldanyWriteDto {
    typeId: string;
    description: string;
    addDate: Date;
    manufacturingDate?: Date;
    isHibas: boolean;
    isSelejt: boolean;
    isSelejtSugg: boolean;
    selectedDate: Date;
}