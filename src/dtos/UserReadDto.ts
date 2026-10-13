export interface UserReadDto {
    id: string;
    username: string;
    email: string;
    isSysAdmin: boolean;
    isDeviceAdmin: boolean;
    isUserAdmin: boolean;
}