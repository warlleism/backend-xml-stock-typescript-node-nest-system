import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { FileInterceptor } from '@nestjs/platform-express';
import { parseStringPromise } from 'xml2js';
import { ProductEntity } from './product.entity';

@Controller('product')
export class ProductController {
    constructor(private repository: ProductRepository) { }

    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    async createProduct(@UploadedFile() file: Express.Multer.File, @Body() body: ProductEntity) {

        try {

            if (file.mimetype !== 'text/xml' && file.mimetype !== 'application/xml') {
                throw new BadRequestException('Invalid file type. Only XML files are allowed.');
            }

            const xmlString = file.buffer.toString('utf-8');
            const jsonResult = await parseStringPromise(xmlString, { explicitArray: false });

            if (!jsonResult.stock.product || !Array.isArray(jsonResult.stock.product)) {
                throw new BadRequestException('Invalid XML structure. Expected "stock" with an array of products.');
            }

            const products = jsonResult.stock.product;

            const createdProducts = await Promise.all(
                products.map(async (product: any) => {
                    product.quantity = parseInt(product.quantity);
                    product.price = parseFloat(product.price);
                    return await this.repository.createProduct(product);
                })
            );

            return {
                message: 'Product created successfully',
                data: createdProducts,
                status: HttpStatus.CREATED
            };

        } catch (error) {
            return {
                message: 'Error creating Product',
                error: error.message,
                status: HttpStatus.BAD_REQUEST
            };
        }
    }

    @Patch('update')
    async updateProduct(@Body() body: any) {
        try {
            const result = this.repository.updateProduct(body);
            return result
        } catch (error) {
            return {
                message: 'Error updating Product',
                error: error.message,
                status: HttpStatus.BAD_REQUEST
            };
        }
    }

    @Get('getOne')
    async getOneProduct(@Query('id') id: number) {
        try {
            const result = this.repository.getOneProduct(+id);
            return {
                data: result,
                message: 'Product found successfully',
                status: HttpStatus.OK
            }
        } catch (error) {
            return {
                message: 'Error getting Product',
                error: error.message,
                status: HttpStatus.BAD_REQUEST
            };
        }
    }

    @Get('getSearch')
    async getSearchProduct(@Query('name') name: string) {
        try {
            const result = await this.repository.getSearch(name);
            return {
                data: result,
                message: 'Product found successfully',
                status: HttpStatus.OK
            }
        } catch (error) {
            return {
                message: 'Error getting Product',
                error: error.message,
                status: HttpStatus.BAD_REQUEST
            };
        }
    }

    @Delete('delete')
    async deleteProduct(@Query('id') id: number) {
        try {
            const result = await this.repository.deleteProduct(+id);
            return {
                data: result,
                message: 'Product deleted successfully',
                status: HttpStatus.OK
            }

        } catch (error) {
            return {
                message: 'Error deleting Product',
                error: error.message,
                status: HttpStatus.BAD_REQUEST
            }
        }
    }

    @Get('get')
    async getAllProducts(@Query('page') page: number = 1, @Query('pagesize') pageSize: number = 5) {
        try {
            const result = await this.repository.getProducts(+page, +pageSize);
            return {
                data: result,
                message: 'Products found successfully',
                status: HttpStatus.OK
            }
        } catch (error) {
            return {
                message: 'Error getting Product',
                error: error.message,
                status: HttpStatus.BAD_REQUEST
            };
        }
    }

    @Get('getCategory')
    async getAllCategory() {
        try {
            const result = await this.repository.getAllCategory();
            return {
                data: result,
                message: 'Products found successfully',
                status: HttpStatus.OK
            }
        } catch (error) {
            return {
                message: 'Error getting Product',
                error: error.message,
                status: HttpStatus.BAD_REQUEST
            };
        }
    }
}
