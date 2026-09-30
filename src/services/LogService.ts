import {inject, injectable} from "inversify";
import { ApiService } from "./ApiService";
import type {LogReadDto} from "../dtos/LogReadDto.ts";

@injectable()
export class LogService {
    constructor(
        @inject(ApiService)
        private readonly api: ApiService) {
    }

    async search(
        q?: string,
        limit?: number,
        offset?: number
    ): Promise<LogReadDto[]> {

        return this.api.get<LogReadDto[]>(`/Log?q=${q}&limit=${limit}&offset=${offset}`);
    }

    async get(
        id: string
    ): Promise<LogReadDto> {
        return this.api.get<LogReadDto>(`/Log/${id}`);
    }
}