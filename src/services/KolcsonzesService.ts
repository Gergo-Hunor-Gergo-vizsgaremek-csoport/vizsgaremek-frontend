import {inject, injectable} from "inversify";
import { ApiService } from "./ApiService";
import type {KolcsonzesReadDto} from "../dtos/KolcsonzesReadDto.ts";

@injectable()
export class KolcsonzesService {
    constructor(
        @inject(ApiService)
        private readonly api: ApiService)
    {}

    async get(
        id:string
    ): Promise<KolcsonzesReadDto> {
        return this.api.get<KolcsonzesReadDto>(`/Kolcsonzes/${id}`);
    }
}