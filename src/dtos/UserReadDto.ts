export interface UserReadDto {
    id: string;
    name: string;
    email: string;
    isSysAdmin: boolean;
    isDeviceAdmin: boolean;
    isUserAdmin: boolean;
}