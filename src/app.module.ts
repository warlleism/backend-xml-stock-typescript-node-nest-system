import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { LoggerMiddlewareModule } from './middlewares/logger.middleware.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { ActiveModule } from './modules/active/active.module';

@Module({
  imports: [UserModule, ProductModule, LoggerMiddlewareModule, CategoryModule, ActiveModule]
})
export class AppModule { }
