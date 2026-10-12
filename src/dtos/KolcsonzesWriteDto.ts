export interface KolcsonzesWriteDto {
    peldanyId: string;
    userId: string;
    date: Date | string;
    expirationDate?: Date | string;
}