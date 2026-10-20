export interface PeldanyWriteDto {
    description: string;
    addDate: Date;
    manufacturingDate?: Date;
    isHibas: boolean;
    isSelejt: boolean;
    isSelejtSugg: boolean;
    selectedDate: Date;
}