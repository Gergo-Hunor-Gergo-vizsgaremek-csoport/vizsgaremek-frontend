import {inject, injectable} from "inversify";
import { ApiService } from "./ApiService";
import type {PeldanyReadDto} from "../dtos/PeldanyReadDto.ts";
import type {PeldanyWriteDto} from "../dtos/PeldanyWriteDto.ts";
//import type {PeldanyUpdateDto} from "../dtos/PeldanyUpdateDto.ts";

@injectable()
export class PeldanyService {
    constructor(
        @inject(ApiService)
        private readonly api: ApiService)
    {}

    async get(
        typeId:string
    ): Promise<PeldanyReadDto[]> {
        return this.api.get<PeldanyReadDto[]>(`/Peldany/${typeId}`);
    }

    /*async update(
        id: string,
        peldany: PeldanyUpdateDto
    ): Promise<PeldanyReadDto> {
        return this.api.put<PeldanyReadDto>(`/Peldany/${id}`, peldany);
    }*/

    async create(peldany: PeldanyWriteDto): Promise<PeldanyReadDto> {
        return this.api.post<PeldanyReadDto>(`/Peldany`, peldany);
    }

    async delete(
        id: string
    ): Promise<void> {
        return this.api.delete(`/Peldany/${id}`);
    }
}