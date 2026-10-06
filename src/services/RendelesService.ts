import {inject, injectable} from "inversify";
import {ApiService} from "./ApiService.ts";
import type {RendelesReadDto} from "../dtos/RendelesReadDto.ts";

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
}