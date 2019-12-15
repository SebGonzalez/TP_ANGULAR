import { Controller, Get, Post, Body } from '@nestjs/common';
import { Departement } from '../departement.entity';
import { DepartementService } from '../departement.service';

@Controller('departement')
export class DepartementController {
    constructor(private departementService: DepartementService){}

    
    @Get()
    index(): Promise<Departement[]> {
      return this.departementService.findAll();
    }    

    // @Post(':add')
    // async create(@Body() villeData: Departement): Promise<any> {
    //   return this.departementService.create(villeData);
    // }  
    
}
