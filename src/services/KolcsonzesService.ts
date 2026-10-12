import {inject, injectable} from "inversify";
import { ApiService } from "./ApiService";
import type {KolcsonzesReadDto} from "../dtos/KolcsonzesReadDto.ts";
import type {KolcsonzesWriteDto} from "../dtos/KolcsonzesWriteDto.ts";

@injectable()
export class KolcsonzesService {
    constructor(
        @inject(ApiService)
        private readonly api: ApiService)
    {}

    async get(): Promise<KolcsonzesReadDto[]> {
        return this.api.get<KolcsonzesReadDto[]>("/Kolcsonzes");
    }

    async post(
        kolcsonzesWriteDto: KolcsonzesWriteDto,
    ) {
        return this.api.post<KolcsonzesReadDto>("/Kolcsonzes", kolcsonzesWriteDto);
    }
}