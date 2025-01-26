import { BadRequestException, Controller, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ActiveRepository } from './active.repository';
import { parseStringPromise } from 'xml2js';

@Controller('active')
export class ActiveController {
    constructor(private repository: ActiveRepository) { }

    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    async createActive(@UploadedFile() file: Express.Multer.File) {
        try {

            if (file.mimetype !== 'text/xml' && file.mimetype !== 'application/xml') {
                throw new BadRequestException('Invalid file type. Only XML files are allowed.');
            }

            const xmlString = file.buffer.toString('utf-8');
            const jsonResult = await parseStringPromise(xmlString, { explicitArray: false });

            if (!jsonResult.activeIngredients.activeIngredient || !Array.isArray(jsonResult.activeIngredients.activeIngredient)) {
                throw new BadRequestException('Invalid XML structure. Expected "actives" with an array of actives.');
            }

            const actives = jsonResult.activeIngredients.activeIngredient;
            console.log(actives);

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


}
