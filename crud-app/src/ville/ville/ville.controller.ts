import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { ville } from '../ville.entity';
import { VilleService } from '../ville.service';

@Controller('ville')
export class VilleController {
    constructor(private villeService: VilleService){}

    @Get()
    find(@Query() query) {
      if(query.id == undefined){
        return this.villeService.findAll();
      }
      return this.villeService.findById(query.id);
    }

    @Post(':add')
    async create(@Body() villeData: ville): Promise<any> {
      return this.villeService.create(villeData);
    }  
}
