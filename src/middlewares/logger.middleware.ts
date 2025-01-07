import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserRepository } from '../modules/user/user.repository';

type JwtPayLoad = {
    id: number;
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    constructor(private repo: UserRepository) { }

    async use(req: Request, res: Response, next: NextFunction) {

        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const token = authorization.split(' ')[1];

        try {
            const { id } = jwt.verify(token, process.env.JWT_SECRET ?? '') as JwtPayLoad;
            const user = await this.repo.getOneById(+id);

            if (!user) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            const { password: _, ...loggedUser } = user;
            req.user = loggedUser;

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
}