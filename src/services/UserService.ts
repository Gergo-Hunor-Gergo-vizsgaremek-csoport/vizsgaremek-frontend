import {inject, injectable} from "inversify";
import { ApiService } from "./ApiService";
import type {UserReadDto} from "../dtos/UserReadDto.ts";

@injectable()
export class UserService {
    constructor(
        @inject(ApiService)
    private readonly api: ApiService)
    {}
        async search(
            q?: string,
            limit?: number,
            offset?: number
        ): Promise<UserReadDto[]> {

        return this.api.get<UserReadDto[]>(`/User?q=${q}&limit=${limit}&offset=${offset}`);
        }

        async get(
            id:string
        ): Promise<UserReadDto> {
        return this.api.get<UserReadDto>(`/User/${id}`);
        }

        async delete(
            id: string
        ): Promise<void> {
            return this.api.delete(`/User/${id}`);
        }
}