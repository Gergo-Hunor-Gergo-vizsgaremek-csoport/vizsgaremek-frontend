import type {PeldanyReadDto} from "../dtos/PeldanyReadDto.ts";
import {ApiService} from "./ApiService.ts";
import {inject, injectable} from "inversify";

@injectable()
export class PeldanyService {
    constructor(
        @inject(ApiService)
        private readonly api:ApiService,
    ) {
    }
    async get(
        id:string
    ): Promise<PeldanyReadDto> {
        return this.api.get(`/Peldany/${id}`)
    }
}