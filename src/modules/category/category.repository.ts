import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../db/prisma.service";
import { ICategory } from "./category.entity";

@Injectable()
export class CategoryRepository {
    constructor(private prismaService: PrismaService) { }

    async createCategory(data: ICategory) {
        const result = await this.prismaService.category.upsert({
            where: { name: data.name },
            create: data,
            update: {
                name: data.name,
                description: data.description,
                updatedAt: new Date()
            }
        })
        return result;
    }

    async getCategories() {
        const result = await this.prismaService.category.findMany();
        return result;
    }
}
