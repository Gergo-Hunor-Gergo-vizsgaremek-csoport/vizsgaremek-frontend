import { ApiService } from "./ApiService";
import {inject, injectable} from "inversify";
import type {ProductReadDto} from "../dtos/ProductReadDto.ts";
import type {ProductCreateDto} from "../dtos/ProductCreateDto.ts";



@injectable()
export class ProductService {

    constructor(
        @inject(ApiService)
        private readonly api: ApiService
    ) {}

    /**
     * GET /Product/{id}
     */
    async get(id: string): Promise<ProductReadDto> {
        return this.api.get<ProductReadDto>(`/Product/${id}`);
    }

    /**
     * GET /Product
     */
    async search(
        q?: string,
        limit?: number,
        offset?: number
    ): Promise<ProductReadDto[]> {
        const params = new URLSearchParams();

        if (q !== undefined) params.set("q", q);
        if (limit !== undefined) params.set("limit", limit.toString());
        if (offset !== undefined) params.set("offset", offset.toString());

        const query = params.toString();

        let promise = this.api.get<ProductReadDto[]>(
            `/Product${query ? `?${query}` : ""}`
        );
        return promise;
    }

    /**
     * POST /Product
     */
    async create(product: ProductCreateDto): Promise<ProductReadDto> {
        return this.api.post<ProductReadDto>("/Product", product);
    }

    /**
     * PUT /Product/{id}
     */
    async update(
        id: string,
        product: ProductCreateDto
    ): Promise<ProductReadDto> {
        return this.api.put<ProductReadDto>(`/Product/${id}`, product);
    }

    /**
     * DELETE /Product/{id}
     */
    async delete(id: string): Promise<void> {
        await this.api.delete(`/Product/${id}`);
    }
}