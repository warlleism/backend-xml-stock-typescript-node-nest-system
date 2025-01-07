import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { UserRepository } from '../modules/user/user.repository';
import { DbModule } from '../db/db.module';

@Module({
    imports: [DbModule],
    providers: [UserRepository],
})
export class LoggerMiddlewareModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(
                { path: 'product/create', method: RequestMethod.POST },
                { path: 'product/get', method: RequestMethod.GET },
                { path: 'product/update', method: RequestMethod.PATCH },
                { path: 'product/getOne', method: RequestMethod.GET },
                { path: 'product/delete', method: RequestMethod.DELETE }
            );
    }
}
