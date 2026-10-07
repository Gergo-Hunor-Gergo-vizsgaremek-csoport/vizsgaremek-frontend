import {inject, injectable} from "inversify";
import { ApiService } from "./ApiService";
import type {UserReadDto} from "../dtos/UserReadDto.ts";
import type {KolcsonzesReadDto} from "../dtos/KolcsonzesReadDto.ts";
import type {RendelesReadDto} from "../dtos/RendelesReadDto.ts";
import type {PeldanyReadDto} from "../dtos/PeldanyReadDto.ts";

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

        async getKolcsonzesek(
            id:string,
        ): Promise<KolcsonzesReadDto[]> {
            return this.api.get<KolcsonzesReadDto[]>(`/User/${id}/kolcsonzesek`);
        }

        async getRendelesek(
            id:string,
        ): Promise<RendelesReadDto[]> {
            return this.api.get<RendelesReadDto[]>(`/User/${id}/rendelesek`);
        }

        async getFelelossegek(
            id:string,
        ): Promise<PeldanyReadDto[]> {
            return this.api.get<PeldanyReadDto[]>(`/User/${id}/felelossegek`);
        }

}