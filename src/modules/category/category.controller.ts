import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoryRepository } from './category.repository';
import { parseStringPromise } from 'xml2js';

@Controller('category')
export class CategoryController {
    constructor(private repository: CategoryRepository) { }

    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    async createCategory(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
        try {

            if (body) {
                const data = await this.repository.createCategory(body);
                return {
                    message: 'Category created successfully',
                    data: data,
                    status: HttpStatus.CREATED
                }
            }

            if (file.mimetype !== 'text/xml' && file.mimetype !== 'application/xml') {
                throw new BadRequestException('Invalid file type. Only XML files are allowed.');
            }

            const xmlString = file.buffer.toString('utf-8');
            const jsonResult = await parseStringPromise(xmlString, { explicitArray: false });

            if (!jsonResult.categories.category || !Array.isArray(jsonResult.categories.category)) {
                throw new BadRequestException('Invalid XML structure. Expected "stock" with an array of products.');
            }

            const categories = jsonResult.categories.category;

            const createdCategories = await Promise.all(
                categories.map(async (category: any) => {
                    return await this.repository.createCategory(category);
                })
            );

            return {
                message: 'Categories created successfully',
                data: createdCategories,
                status: HttpStatus.CREATED
            }

        } catch (error) {
            return {
                message: 'Error creating category',
                error: error.message,
                status: HttpStatus.INTERNAL_SERVER_ERROR
            }
        }
    }

    @Get('get')
    async getCategories() {
        try {
            const result = await this.repository.getCategories();
            return {
                data: result,
                message: 'Categories found successfully',
                status: HttpStatus.OK
            }
        } catch (error) {
            return {
                message: 'Error getting Actives',
                error: error.message,
                status: HttpStatus.BAD_REQUEST
            }
        }
    }
}
