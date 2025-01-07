import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../db/prisma.service";
import { ProductEntity } from "./product.entity";

@Injectable()
export class ProductRepository {
    constructor(private prismaService: PrismaService) { }

    async createProduct(data: ProductEntity) {
        const result = await this.prismaService.product.create({ data });
        return result;
    }

    async updateProduct(data: ProductEntity) {
        const result = await this.prismaService.product.update({
            where: {
                id: data.id
            },
            data
        })

        return result
    }

    async getOneProduct(id: number) {
        const result = await this.prismaService.product.findUnique({
            where: {
                id
            }
        });
        return result
    }

    async getSearch(name: string) {
        const result = await this.prismaService.product.findMany({
            where: {
                name: {
                    contains: name
                }
            },
            take: 5,
            orderBy: {
                name: 'asc'
            }
        });
        return result
    }

    async deleteProduct(id: number) {
        const result = await this.prismaService.product.delete({
            where: {
                id
            },
        })

        return result

    }

    async getAllCategory() {
        const result = await this.prismaService.$queryRaw<any>`
        SELECT 
            "category"
        FROM "Product"
        GROUP BY "category";
        `


        const data = result.map((item: { category: string }) => item.category)
        return data

    }

    async getProducts(page: number, pageSize: number) {

        const skip = (page - 1) * pageSize;

        const take = +pageSize;
        const total = await this.prismaService.product.count();
        const result = await this.prismaService.product.findMany({ skip, take });

        return {
            result,
            pagination: {
                total,
                page,
                totalPages: Math.ceil(total / pageSize)
            }
        }
    }

}