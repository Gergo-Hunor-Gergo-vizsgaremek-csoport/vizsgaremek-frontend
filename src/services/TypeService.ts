import {inject, injectable} from "inversify";
import { ApiService } from "./ApiService";
import type {TypeReadDto} from "../dtos/TypeReadDto.ts";

@injectable()
export class TypeService {
    constructor(
        @inject(ApiService)
        private readonly api: ApiService)
    {}
    async search(
        q?: string,
        limit?: number,
        offset?: number
    ): Promise<TypeReadDto[]> {

        return this.api.get<TypeReadDto[]>(`/Type?q=${q}&limit=${limit}&offset=${offset}`);
    }

    async get(
        id:string
    ): Promise<TypeReadDto> {
        return this.api.get<TypeReadDto>(`/Type/${id}`);
    }
}