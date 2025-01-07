import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { LoggerMiddlewareModule } from './middlewares/logger.middleware.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [UserModule, ProductModule, LoggerMiddlewareModule]
})
export class AppModule { }
