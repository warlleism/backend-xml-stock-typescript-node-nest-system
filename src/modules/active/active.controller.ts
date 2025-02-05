import { BadRequestException, Body, Controller, Get, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ActiveRepository } from './active.repository';
import { parseStringPromise } from 'xml2js';

@Controller('active')
export class ActiveController {
    constructor(private repository: ActiveRepository) { }

    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    async createActive(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
        try {

            if (body) {
                const data = await this.repository.createActive(body);
                return {
                    message: 'Active created successfully',
                    data: data,
                    status: HttpStatus.CREATED
                }
            }

            if (file.mimetype !== 'text/xml' && file.mimetype !== 'application/xml') {
                throw new BadRequestException('Invalid file type. Only XML files are allowed.');
            }

            const xmlString = file.buffer.toString('utf-8');
            const jsonResult = await parseStringPromise(xmlString, { explicitArray: false });

            if (!jsonResult.activeIngredients.activeIngredient || !Array.isArray(jsonResult.activeIngredients.activeIngredient)) {
                throw new BadRequestException('Invalid XML structure. Expected "actives" with an array of actives.');
            }

            const actives = jsonResult.activeIngredients.activeIngredient;

            const createdActives = await Promise.all(
                actives.map(async (active: any) => {
                    return await this.repository.createActive(active);
                })
            );

            return {
                message: 'Actives created successfully',
                data: createdActives,
                status: HttpStatus.CREATED
            }

        } catch (error) {
            return {
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            }
        }

    }

    @Get('get')
    async getAllActives() {
        try {
            const result = await this.repository.getAllActives();
            return {
                data: result,
                message: 'Actives found successfully',
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
