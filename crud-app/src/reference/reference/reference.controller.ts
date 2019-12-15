import { Controller, Get, Query } from '@nestjs/common';
import { Post,Put, Delete, Body, Param } from  '@nestjs/common';
import { Reference } from '../reference.entity';
import { ReferenceService } from '../reference.service';


@Controller('reference')
export class ReferenceController {
    constructor(private referenceService: ReferenceService){}

    @Get()
    find(@Query() query) {
      if(query.id == undefined){
        return this.referenceService.findAll();
      }
      return this.referenceService.findByid(query.id);
    }
    @Post()
    async create(@Body() userData: Reference): Promise<any> {
      return this.referenceService.create(userData);
    }  

    @Put(':id')
    async update(@Param('id') id, @Body() userData: Reference): Promise<any> {
        userData.id = Number(id);
        console.log('Update #' + userData.id)
        return this.referenceService.update(userData);
    } 

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
      return this.referenceService.delete(id);
    } 

}
