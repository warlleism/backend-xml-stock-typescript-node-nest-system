import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../db/prisma.service";

@Injectable()
export class UserRepository {
    constructor(private prismaService: PrismaService) { }

    async createUser(data: any) {
        const result = await this.prismaService.user.create({ data });
        return result;
    }

    async userLogin(data: any) {
        const user = await this.prismaService.user.findUnique({ where: { email: data.email, password: data.password } });
        return user;
    }

    async getOneById(id: number) {
        return this.prismaService.user.findUnique({
            where: {
                id,
            },
        });
    }

}