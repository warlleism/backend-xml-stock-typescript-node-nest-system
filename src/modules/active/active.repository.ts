import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../db/prisma.service";

@Injectable()
export class ActiveRepository {
    constructor(private prismaService: PrismaService) { }

    async createActive(data: any) {
        const result = await this.prismaService.principleActive.upsert({
            where: { name: data.name },
            create: data,
            update: {
                name: data.name,
                bula: data.bula,
                updatedAt: new Date()
            }
        })
        return result;
    }
}
