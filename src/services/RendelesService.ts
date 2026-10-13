import {inject, injectable} from "inversify";
import {ApiService} from "./ApiService.ts";
import type {RendelesReadDto} from "../dtos/RendelesReadDto.ts";
import type {RendelesWriteDto} from "../dtos/RendelesWriteDto.ts";
import type {KolcsonzesWriteDto} from "../dtos/KolcsonzesWriteDto.ts";
import type {KolcsonzesReadDto} from "../dtos/KolcsonzesReadDto.ts";

@injectable()
export class RendelesService {
    constructor(
        @inject(ApiService)
        private readonly api: ApiService
    )
    {}
    async get(
        id: string
    ): Promise<RendelesReadDto>
    {
        return this.api.get<RendelesReadDto>(`/Rendeles/${id}`);
    }
    async post(
        rendelesWriteDto: RendelesWriteDto,
    )
    {
        return this.api.post<RendelesWriteDto>(`/Rendeles`, rendelesWriteDto);
    }

    async put(
        id:string,
        rendelesWriteDto: RendelesWriteDto,
    )
    {
        return this.api.put<RendelesReadDto>(`/Rendeles/${id}`, rendelesWriteDto);
    }

    async assignKolcsonzesek(
        id: string,
        kolcsonzesWriteDtos: KolcsonzesWriteDto[],
    )
    {
        return this.api.post<KolcsonzesReadDto[]>(`/Rendeles/${id}/assign`, kolcsonzesWriteDtos);
    }
}