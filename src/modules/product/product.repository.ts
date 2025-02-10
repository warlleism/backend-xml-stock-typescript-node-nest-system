import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../../db/prisma.service";
import { IProduct } from "./product.entity";

@Injectable()
export class ProductRepository {
    constructor(private prismaService: PrismaService) { }

    async createProduct(data: IProduct) {

        const result = await this.prismaService.product.upsert({
            where: { name: data.name },
            create: data,
            update: {
                quantity: { increment: data.quantity },
                price: data.price,
                categoryid: +data.categoryid,
                description: data.description,
                principleactiveid: +data.principleactiveid,
                dosage: data.dosage,
                laboratory: data.laboratory,
                requiresPrescription: data.requiresPrescription,
                updatedAt: new Date(),
            },
        });
        return result;
    }

    async updateProduct(data: IProduct) {
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
                    contains: name.toLowerCase()
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
        SELECT "category"
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
        const newResult = (await this.prismaService.product.findMany({ skip, take }))


        return {
            data: newResult,
            pagination: {
                total,
                page,
                totalPages: Math.ceil(total / pageSize)
            }
        }
    }

}