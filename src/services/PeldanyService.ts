import {inject, injectable} from "inversify";
import { ApiService } from "./ApiService";
import type {PeldanyUpdateCreateDto} from "../dtos/PeldanyUpdateCreateDto.ts";
import type {PeldanyReadDto} from "../dtos/PeldanyReadDto.ts";

@injectable()
export class PeldanyService {
    constructor(
        @inject(ApiService)
    private readonly api: ApiService)
    {}
        async search(
            q?: string,
            limit?: number,
            offset?: number
        ): Promise<PeldanyReadDto[]> {

        return this.api.get<PeldanyReadDto[]>(`/Peldany?q=${q}&limit=${limit}&offset=${offset}`);
        }

        async get(
            id:string
        ): Promise<PeldanyReadDto> {
        return this.api.get<PeldanyReadDto>(`/Peldany/${id}`);
        }

        async update(
            id: string,
            peldany: PeldanyUpdateCreateDto
        ): Promise<PeldanyReadDto> {
            return this.api.put<PeldanyReadDto>(`/Peldany/${id}`, peldany);
        }

        async create(peldany: PeldanyUpdateCreateDto): Promise<PeldanyReadDto> {
            return this.api.post<PeldanyReadDto>("/pedlany", peldany);
        }

        async delete(
            id: string
        ): Promise<void> {
            return this.api.delete(`/Peldany/${id}`);
        }
}